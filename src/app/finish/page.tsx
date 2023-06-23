'use client'

import { testAtom, testsAtom } from '@/lib/atoms'
import { buttonVariants } from '@/components/ui/button'
import { useAtom, useAtomValue } from 'jotai'
import Link from 'next/link'
import { useEffect } from 'react'

function Page() {
  const currentTest = useAtomValue(testAtom)
  const [, setTests] = useAtom(testsAtom)
  useEffect(() => {
    if (!currentTest) return () => {}
    const stringToGet = localStorage.getItem('tests')
    const tests = stringToGet ? JSON.parse(stringToGet) : []
    if (tests.length === 0) {
      const response = [currentTest!.toJSON()]
      localStorage.setItem('tests', JSON.stringify(response))
      setTests(response)
      return () => {}
    }
    setTests(() => {
      const response = [...tests, currentTest!.toJSON()]
      const stringToPut = JSON.stringify(response)
      localStorage.setItem('tests', stringToPut)
      return response
    })
    return () => {}
  }, [currentTest, setTests])
  return (
    <main className='flex min-h-screen items-center justify-center text-black dark:text-white'>
      <section className=''>
        <div className='flex flex-col items-center gap-10'>
          <p className='text-6xl uppercase font-bespoke'>
            Gracias por participar
          </p>
          <Link className={buttonVariants({ variant: 'outline'})} href={'/'}>
            Regresar
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Page
