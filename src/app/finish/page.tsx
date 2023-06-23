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
    <main className='flex min-h-screen items-center justify-center text-black dark:text-white'>
      <section className=''>
        <div className='flex flex-col items-center gap-10'>
          <p className='text-6xl uppercase font-bespoke'>
            Gracias por participar
          </p>
          <Link className={buttonVariants({ variant: 'outline' })} href={'/'}>
            Regresar
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Page
