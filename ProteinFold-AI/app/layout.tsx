import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Lato } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-lato' })

export const metadata: Metadata = {
  title: 'ProteinFold AI',
  description: 'AI-driven protein structure prediction and drug interaction analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${lato.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}

