'use client'

import { testAtom, testsAtom } from '@/atoms'
import { TestJSON } from '@/lib/Tests'
import { Moon, Sun } from '@phosphor-icons/react'
import { useAtom, useAtomValue } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const test = useAtomValue(testAtom)
  const [tests, setTests] = useAtom(testsAtom)
  const [theme, setTheme] = useState('light')
  const onChangeTheme = () => {
    const body = document.getElementById('bg__body')
    if (!body) return
    setTheme(body.classList.contains('dark') ? 'light' : 'dark')
    body.classList.toggle('dark')
  }
  useEffect(() => {
    if (['/user', '/finish'].includes(pathname) || pathname == '/')
      return () => {}
    if (!test || test?.user.id == '') {
      const testsString = localStorage.getItem('tests')
      if (testsString) {
        const testsParsed: TestJSON[] = JSON.parse(testsString)
        setTests((r) => [...r, ...testsParsed])
      } else {
        setTests([])
      }
      return router.push('/user')
    }
  }, [test, router, pathname, setTests])
  return (
    <div className=''>
      <button
        className='fixed top-5 right-5 bg-black rounded-full text-white p-2 dark:bg-white dark:text-black'
        onClick={onChangeTheme}>
        {theme == 'light' ? <Moon size={34} /> : <Sun size={34} />}
      </button>
      {children}
    </div>
  )
}

export default LayoutProvider
