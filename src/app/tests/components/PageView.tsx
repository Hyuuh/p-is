'use client'

import { useNumberTestStore } from '@/lib/stores'
import clsx from 'clsx'

export default function PageView() {
  const numberTest = useNumberTestStore()
  const testText = [
    [
      'Memoriza la secuencia de números, e introduce en el orden que se muestra.'
    ],
    ['Memoriza la secuencia de números, e introduce en el orden inverso.'],
    [
      `Memoriza la secuencia de números y letras, tendrás que introducir los números de menor a mayor, y las letras en orden alfabético.`,
      'Ejemplo: 123ABC'
    ]
  ]
  return (
    <div>
      <h1 className='text-6xl uppercase tracking-widest font-bespoke text-center'>
        Prueba actual{' '}
        <span className='font-black font-sans text-info'>
          {numberTest.count}
        </span>
      </h1>
      <p className='text-2xl text-center md:text-3xl'>
        {testText[numberTest.count - 1].map((t, i) => {
          return (
            <span
              key={t}
              className={clsx('block', {
                'text-primary font-black tracking-widest':
                  numberTest.count == 3 && i == 1
              })}>
              {t}
            </span>
          )
        })}
      </p>
    </div>
  )
}
