"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">{isRTL ? "تعلم الإيطالية" : "Impara Italiano"}</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.learning}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/grammar" className="hover:text-foreground transition-colors">
                  {t.nav.grammar}
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="hover:text-foreground transition-colors">
                  {t.nav.vocabulary}
                </Link>
              </li>
              <li>
                <Link href="/listening" className="hover:text-foreground transition-colors">
                  {t.nav.listening}
                </Link>
              </li>
              <li>
                <Link href="/reading" className="hover:text-foreground transition-colors">
                  {t.nav.reading}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.practice}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/use-of-english" className="hover:text-foreground transition-colors">
                  {t.nav.useOfEnglish}
                </Link>
              </li>
              <li>
                <Link href="/writing" className="hover:text-foreground transition-colors">
                  {t.nav.writing}
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-foreground transition-colors">
                  {t.nav.exams}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.support}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.footer.helpCenter}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
