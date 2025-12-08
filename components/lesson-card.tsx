"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface LessonCardProps {
  title: string
  description: string
  icon: LucideIcon
  level: "Beginner" | "Intermediate" | "Advanced"
  href: string
  lessons: number
}

export function LessonCard({ title, description, icon: Icon, level, href, lessons }: LessonCardProps) {
  const { t } = useLanguage()

  const levelColors = {
    Beginner: "bg-accent text-accent-foreground",
    Intermediate: "bg-chart-4 text-foreground",
    Advanced: "bg-primary text-primary-foreground",
  }

  const levelTranslations = {
    Beginner: t.levels.beginner,
    Intermediate: t.levels.intermediate,
    Advanced: t.levels.advanced,
  }

  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <Badge className={levelColors[level]}>{levelTranslations[level]}</Badge>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {lessons} {t.common.lessonsAvailable}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
