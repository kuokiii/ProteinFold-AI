import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Montserrat, Lato } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-lato" })

export const metadata: Metadata = {
  title: "ProteinFold AI",
  description: "AI-driven protein structure prediction and drug interaction analysis",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} ${lato.variable} font-sans`}>{children}</body>
    </html>
  )
}



import './globals.css'