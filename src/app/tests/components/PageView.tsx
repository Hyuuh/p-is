'use client'

import { useNumberTestStore } from '@/lib/stores'

export default function PageView() {
  const numberTest = useNumberTestStore()
  const testText = [
    'Memoriza la secuencia de números, e introduce en el orden que se muestra.',
    'Memoriza la secuencia de números, e introduce en el orden inverso.',
    'Memoriza la secuencia de números y letras, tendrás que introducir los números de menor a mayor, y las letras en orden alfabético.\nEjemplo: 123ABC'
  ]
  return (
    <section className='flex flex-col items-center justify-center gap-10 text-black dark:text-white'>
      <div className=''>
        <p className='text-6xl uppercase tracking-widest font-bespoke text-center'>
          Prueba actual{' '}
          <span className='font-black font-sans text-emerald-500'>
            {numberTest.count}
          </span>
        </p>
      </div>
      <div className='w-60 md:w-72 lg:w-full'>
        <p className='text-2xl text-center md:text-3xl'>
          {testText[numberTest.count - 1]}
        </p>
      </div>
    </section>
  )
}
