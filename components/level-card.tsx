"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { LevelKey } from "@/lib/data/course-data"
import { levelNames } from "@/lib/data/course-data"

interface LevelCardProps {
  level: LevelKey
  href: string
  topicsCount: number
}

export function LevelCard({ level, href, topicsCount }: LevelCardProps) {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const levelData = levelNames[level]

  const levelColors: Record<LevelKey, string> = {
    a1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    a2: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    b1: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    b2: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    c1: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    c2: "bg-primary/10 text-primary",
  }

  const Arrow = isRTL ? ChevronLeft : ChevronRight

  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={levelColors[level]}>{level.toUpperCase()}</Badge>
            <Arrow className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-xl">{levelData[language]}</CardTitle>
          <CardDescription>{levelData.description[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {topicsCount} {language === "ar" ? "موضوعات" : "topics"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
