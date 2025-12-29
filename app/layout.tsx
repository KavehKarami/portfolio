import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AnimatedCursor } from '@/app/components/AnimatedCursor'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'Kaveh Karami Portfolio',
  description: 'Kaveh Karami Portfolio',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <AnimatedCursor />
        {children}
      </body>
    </html>
  )
}
