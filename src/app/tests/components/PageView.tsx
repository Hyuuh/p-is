'use client'

import { currentNumberTestAtom } from '@/atoms'
import { useAtomValue } from 'jotai'

export default function PageView() {
  const currentTest = useAtomValue(currentNumberTestAtom)
  const testText = [
    'En esta sección se le presentarán una serie de instrucciones que deberá seguir para completar el test.',
    'En esta sección se le presentarán una serie de instrucciones que deberá seguir para completar el test.',
    'En esta sección se le presentarán una serie de instrucciones que deberá seguir para completar el test.'
  ]
  return (
    <main className='flex flex-col items-center justify-center gap-10 text-black dark:text-white'>
      <div className=''>
        <p className='text-6xl uppercase tracking-widest font-bespoke '>
          Prueba actual{' '}
          <span className='font-black font-sans text-emerald-500'>
            {currentTest}
          </span>
        </p>
      </div>
      <div className=''>
        <p className='text-xl'>{testText[currentTest - 1]}</p>
      </div>
    </main>
  )
}
