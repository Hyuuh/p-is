'use client'

import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { currentNumberTestAtom, testAtom } from '@/atoms'
import { TestData } from '@/lib/Tests'
import { ordenarString } from '@/lib/array'

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
import { Button } from '@/components/ui/button'
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
  const router = useRouter()
  const [errors, setErrors] = useState<number>(0)
  const [sections, setSections] = useState<number>(1)
  const [incisions, setIncisions] = useState<number>(1)
  const [currentQuestions, setQuestions] = useState<number[]>([])
  const [raw, setRaw] = useState<string[]>([
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0',
    '|',
    '0',
    '-',
    '0',
    '-',
    '0'
  ])
  const [numberText, setNumberText] = useState<string>('')
  const [resetEffect, setResetEffect] = useState<boolean>(false)
  const [canResponse, setCanResponse] = useState<boolean>(false)
  const [submitTimeout, setSubmitTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const [test, setTest] = useAtom(testAtom)
  const [currentTest, setCurrentTest] = useState<TestData | null>(null)
  const [currentNumberTest] = useAtom(currentNumberTestAtom)
  useEffect(() => {
    let currentIndex = 0
    let currentInterval: NodeJS.Timeout | null = null
    setCanResponse(false)
    const displayNextQuestion = () => {
      const currentTest = test?.tests.find((t) => t.id === currentNumberTest)!
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
            }, 15000)
          )
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
    clearTimeout(submitTimeout!)
    let correctAnswer: string = ordenarString([...currentQuestions].join(''))
    if (values.userResponse!.toUpperCase() == correctAnswer.toUpperCase()) {
      setRaw((r) => {
        const index = (sections - 1) * 2 * 2 + (incisions - 1) * 2
        r[index] = '1'
        return r
      })
      if (sections == 10 && incisions == 3) {
        currentTest!.raw = raw.join('')
        currentTest!.errors = errors
        const indexTest = test?.tests.findIndex(
          (t) => t.id === currentNumberTest
        )!
        setTest((t) => {
          t!.tests[indexTest] = currentTest!
          return t
        })
        router.push('/finish')
        return
      }
      if (incisions == 3) {
        setIncisions(1)
      } else setIncisions(incisions + 1)
      setSections(sections + 1)
      setResetEffect(!resetEffect)
    } else {
      if (errors == 1) {
        currentTest!.raw = raw.join('')
        currentTest!.errors = errors + 1
        const indexTest = test?.tests.findIndex(
          (t) => t.id === currentNumberTest
        )!
        setTest((t) => {
          t!.tests[indexTest] = currentTest!
          return t
        })
        return router.push('/finish')
      } else {
        setErrors((e) => e + 1)
        if (sections == 10 && incisions == 3) {
          currentTest!.raw = raw.join('')
          currentTest!.errors = errors
          const indexTest = test?.tests.findIndex(
            (t) => t.id === currentNumberTest
          )!
          setTest((t) => {
            t!.tests[indexTest] = currentTest!
            return t
          })
          router.push('/finish')
          return
        }
        if (incisions == 3) {
          setIncisions(1)
        } else setIncisions(incisions + 1)
        setSections(sections + 1)
        setResetEffect(!resetEffect)
      }
    }
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10'>
      <Card className='w-[400px]'>
        <CardHeader>
          <p className='uppercase text-8xl font-black text-center'>
            {numberText}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-8'>
              <FormField
                control={form.control}
                name='userResponse'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Respuesta</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!canResponse}
                        className='placeholder:text-center'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={canResponse || numberText != ''}>
                <FastForward size={24} className='mr-2' />
                Saltar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}