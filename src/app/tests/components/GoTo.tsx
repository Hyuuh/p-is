'use client'

import { useNumberTestStore } from '@/lib/stores'
import { buttonVariants } from '@/components/ui/button'

import Link from 'next/link'

function GoTo() {
  const numberTest = useNumberTestStore()
  let URL = '/tests/numbers'
  if (numberTest.count === 3) URL = '/tests/letters'
  return (
    <Link href={URL} className={buttonVariants({
      size: "lg"
    })}>
      Ir a la prueba &rarr;
    </Link>
  )
}

export default GoTo
