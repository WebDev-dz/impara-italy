import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Noto_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { LanguageProvider } from "@/lib/i18n/language-context"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _inter = Inter({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })
const _notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"] })

const PUBLISHER_ID = process.env.NEXT_PUBLIC_PUBLISHER_ID

export const metadata: Metadata = {
  title: "Impara Italiano | Learn Italian Online | تعلم الإيطالية",
  description:
    "Master Italian with comprehensive lessons in grammar, vocabulary, listening, reading, writing, and exam preparation. أتقن اللغة الإيطالية مع دروس شاملة.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta name="google-adsense-account" content="ca-pub-7793603986832708"></meta>
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider  attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
