import LayoutProvider from '@/components/providers/LayoutProvider'
import '../styles/globals.css'

import localFont from 'next/font/local'
import { Toast, ToastProvider } from '@/components/ui/toast'

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
      className={`${bespokeFont.variable} ${supremeFont.variable} select-none font-supreme`}>
      <body id='bg__body'>
        <ToastProvider swipeDirection='right'>
          <Toast />
        </ToastProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
