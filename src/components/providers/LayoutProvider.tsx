'use client'

import { Moon, Sun } from '@phosphor-icons/react'
import { useState } from 'react'

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')
  const onChangeTheme = () => {
    const body = document.getElementById('bg__body')
    if (!body) return
    setTheme(theme == 'dark' ? 'light' : 'dark')
    body.classList.toggle('dark')
  }

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
