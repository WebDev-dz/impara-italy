"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { topicNames } from "@/lib/data/course-data"

interface TopicCardProps {
  topicSlug: string
  href: string
  lessons: number
}

export function TopicCard({ topicSlug, href, lessons }: TopicCardProps) {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const topicData = topicNames[topicSlug] || {
    en: topicSlug,
    ar: topicSlug,
    description: { en: "", ar: "" },
  }

  const Arrow = isRTL ? ChevronLeft : ChevronRight

  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <BookOpen className="h-5 w-5" />
            </div>
            <Arrow className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-lg">{topicData[language]}</CardTitle>
          <CardDescription>{topicData.description[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {lessons} {language === "ar" ? "دروس" : "lessons"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
