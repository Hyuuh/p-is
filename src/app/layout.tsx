import LayoutProvider from '@/components/providers/LayoutProvider'
import '../styles/globals.css'

import localFont from 'next/font/local'

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

export const metadata = {
  title: 'P-IS',
  description: 'P-IS'
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
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
