'use client'
import { currentNumberTestAtom } from '@/atoms'
import { buttonVariants } from '@/components/ui/button'
import { useAtomValue } from 'jotai'
import Link from 'next/link'

function GoTo() {
  const currentTest = useAtomValue(currentNumberTestAtom)
  let URL = '/tests/numbers'
  if (currentTest === 3) URL = '/tests/letters'
  return (
    <Link href={URL} className={buttonVariants({})}>
      Ir a la prueba &rarr;
    </Link>
  )
}

export default GoTo
