'use client'

import { useTestStore, useTestsStore } from '@/lib/stores'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
function Page() {
  const router = useRouter()
  const testStore = useTestStore()
  const testsStore = useTestsStore()
  useEffect(() => {
    if (!testStore.test)
      return () => {
        router.push('/')
      }
    testsStore.addTest(testStore.test.toJSON())
    testStore.resetTest()
    return () => {}
  }, [router, testStore, testsStore])
  return (
    <main className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-none prose'>
          <h1 className='text-5xl lg:text-7xl font-bold font-bespoke uppercase'>
            Gracias por participar
          </h1>
          <div className=''>
            <Link className={'btn btn-success'} href={'/'}>
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
