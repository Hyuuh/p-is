'use client'
import { buttonVariants } from '@/components/ui/button'
import { ArrowCircleRight } from '@phosphor-icons/react'
import Link from 'next/link'

function StartButton() {
  return (
    <Link href='/user' className={buttonVariants()}>
      <ArrowCircleRight size={24} className='mr-2'/>
      Comenzar
    </Link>
  )
}

export default StartButton
