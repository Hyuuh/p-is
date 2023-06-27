'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNumberTestStore, useTestStore, useTestsStore } from '@/lib/stores'
import { TestData } from '@/lib/Tests'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { FastForward } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  userResponse: z.string().optional()
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userResponse: ''
    }
  })
  const [numberText, setNumberText] = useState<string>('')
  const [resetEffect, setResetEffect] = useState<boolean>(false)
  const [canResponse, setCanResponse] = useState<boolean>(false)
  const [submitTimeout, setSubmitTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const testStore = useTestStore()
  const numberTest = useNumberTestStore()
  const [currentTest, setCurrentTest] = useState<TestData | null>(null)
  const router = useRouter()
  const [errors, setErrors] = useState<number>(0)
  const [sections, setSections] = useState<number>(1)
  const [incisions, setIncisions] = useState<number>(1)
  const [currentQuestions, setQuestions] = useState<number[]>([])
  const [raw, setRaw] = useState<string[]>([
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0'
  ])
  useEffect(() => {
    if (!testStore.test) return router.push('/user')
    let currentIndex = 0
    let currentInterval: NodeJS.Timeout | null = null
    setCanResponse(false)
    const displayNextQuestion = () => {
      const currentTest = testStore.test?.tests.find(
        (t) => t.id === numberTest.count
      )!
      if (!currentTest) return router.push('/user')
      setCurrentTest(currentTest)
      const questions = currentTest.questions.find(
        (q) => q.incision == incisions && q.section == sections
      )!.questions
      setQuestions(questions as number[])
      currentInterval = setInterval(() => {
        if (currentIndex == questions.length) {
          setNumberText('')
          setCanResponse(true)
          setSubmitTimeout(
            setTimeout(() => {
              setCanResponse(false)
              clearTimeout(submitTimeout!)
              form.clearErrors()
            }, 3000)
          )
          setTimeout(() => {
            form.setFocus('userResponse')
          }, 50)
          return clearInterval(currentInterval!)
        }
        setNumberText(questions[currentIndex].toString() || '')
        currentIndex++
      }, 1000)
    }
    displayNextQuestion()
    return () => clearTimeout(currentInterval!)
  }, [resetEffect])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCanResponse(false)
    form.reset({ userResponse: '' })
    clearTimeout(submitTimeout!)
    let correctAnswer: number[] | string = [...currentQuestions]
    if (numberTest.count == 2) correctAnswer = correctAnswer.reverse()
    correctAnswer = correctAnswer.join('')
    if (values.userResponse == correctAnswer) {
      setRaw((r) => {
        const index = (sections - 1) * 2 * 2 + (incisions - 1) * 2
        r[index] = '1'
        return r
      })

      if (sections == 8 && incisions == 2) {
        currentTest!.raw = raw.join('')
        currentTest!.errors = errors
        const indexTest = testStore.test?.tests.findIndex(
          (t) => t.id === numberTest.count
        )!
        testStore.editTest(currentTest!, indexTest)
        numberTest.inc()
        router.push('/tests')
        return
      }

      if (incisions == 2) {
        setIncisions(1)
        setErrors(0)
        setSections(sections + 1)
      } else setIncisions(2)
      setResetEffect(!resetEffect)
      return
    } else {
      if (errors == 1) {
        currentTest!.raw = raw.join('')
        currentTest!.errors = errors
        const indexTest = testStore.test?.tests.findIndex(
          (t) => t.id === numberTest.count
        )!
        testStore.editTest(currentTest!, indexTest)
        numberTest.inc()
        return router.push('/tests')
      } else {
        setErrors((e) => e + 1)
        if (sections == 8 && incisions == 2) {
          currentTest!.raw = raw.join('')
          currentTest!.errors = errors
          const indexTest = testStore.test?.tests.findIndex(
            (t) => t.id === numberTest.count
          )!
          testStore.editTest(currentTest!, indexTest)
          numberTest.inc()
          router.push('/tests')
          return
        }
        if (incisions == 2) {
          setIncisions(1)
          setSections(sections + 1)
        } else setIncisions(2)
        setResetEffect(!resetEffect)
        return
      }
    }
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10'>
      <article className='card card-compact w-[400px] bg-base-200 shadow-xl'>
        <section className='card-body items-center text-center'>
          <h2 className='card-title uppercase text-8xl font-black text-center'>
            {numberText}
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='card-actions flex flex-col gap-8 items-center'>
              <FormField
                control={form.control}
                name='userResponse'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Respuesta</FormLabel>
                    <FormControl>
                      <input
                        autoFocus
                        disabled={!canResponse}
                        className='input input-primary input-bordered placeholder:text-center disabled:border-error'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type='submit'
                className='btn btn-primary group transition'
                hidden={canResponse || numberText != ''}>
                <FastForward className='w-6 h-6 group-hover:translate-x-1 ease-linear transition' />
                Enviar
              </button>
            </form>
          </Form>
        </section>
      </article>
    </main>
  )
}
