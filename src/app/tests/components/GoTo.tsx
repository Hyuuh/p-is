'use client'

import { useNumberTestStore } from '@/lib/stores'
import { ArrowRight } from '@phosphor-icons/react'

import Link from 'next/link'

function GoTo() {
  const numberTest = useNumberTestStore()
  let URL = '/tests/numbers'
  if (numberTest.count === 3) URL = '/tests/letters'
  return (
    <Link href={URL} className={'btn btn-secondary group'}>
      Ir a la prueba 
      <ArrowRight className='w-6 h-6 group-hover:translate-x-1 animate-in transition' />
    </Link>
  )
}

export default GoTo
