import LayoutProvider from '@/components/providers/LayoutProvider'
import '../styles/globals.css'

import localFont from 'next/font/local'
import Image from 'next/image'
import { Metadata } from 'next'

const bespokeFont = localFont({
  display: 'swap',
  variable: '--font-bespoke',
  src: './BespokeStencil.otf'
})
const supremeFont = localFont({
  display: 'swap',
  variable: '--font-supreme',
  src: './Supreme-Regular.otf'
})

export const metadata: Metadata = {
  title: 'P-IS',
  description: 'P-IS',
  icons: '/icon.png'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${bespokeFont.variable} ${supremeFont.variable} select-none font-supreme min-h-screen overflow-hidden`}>
      <body id='bg__body'>
        <header className='flex w-full fixed top-0 left-0'>
          <nav className='p-4 flex items-center gap-4'>
            <div className='w-24'>
              <Image
                src={'/escudo.png'}
                alt='escudo uabc'
                width={1024}
                height={1024}
              />
            </div>
            <div className='w-36'>
              <Image
                src={'/isotipo.png'}
                alt='isotipo uabc'
                width={1024}
                height={1024}
              />
            </div>
          </nav>
        </header>

        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
