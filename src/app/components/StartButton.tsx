'use client'
import { ArrowCircleRight } from '@phosphor-icons/react'
import Link from 'next/link'

function StartButton() {
  return (
    <Link href='/user' className={'btn btn-primary join-item'}>
      <ArrowCircleRight className='w-6 h-6' />
      Comenzar
    </Link>
  )
}

export default StartButton
