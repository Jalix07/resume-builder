import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resume Builder - Create Professional CV in Minutes | Free Templates',
  description: 'Build your professional resume with our free online CV builder. Choose from 50+ premium templates, customize easily, and export to PDF. No sign-up required!',
  keywords: 'resume builder, cv generator, resume templates, free cv maker, professional resume, job application, pdf export',
  openGraph: {
    title: 'Resume Builder - Create Professional CV in Minutes',
    description: 'Build professional resumes with 50+ free templates. Export to PDF instantly!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
