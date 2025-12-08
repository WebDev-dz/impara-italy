"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TopicCard } from "@/components/topic-card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getLevel, typeNames, levelNames, type LevelKey, type TypeKey } from "@/lib/data/course-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { Badge } from "@/components/ui/badge"

const levelColors: Record<string, string> = {
  a1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  a2: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  b1: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  b2: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  c1: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  c2: "bg-primary/10 text-primary",
}

export function LevelPageContent({ type, level }: { type: string; level: string }) {
  const { language } = useLanguage()
  const levelData = getLevel(type, level)

  if (!levelData) {
    notFound()
  }

  const typeName = typeNames[type as TypeKey]
  const levelInfo = levelNames[level as LevelKey]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: typeName?.[language] || type, href: `/${type}` },
              { label: levelInfo?.[language] || level },
            ]}
          />

          <div className="flex items-center gap-4 mb-4">
            <Badge className={`text-lg px-4 py-1 ${levelColors[level] || ""}`}>{level.toUpperCase()}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-balance">
              {typeName?.[language]} - {levelInfo?.[language]}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">{levelInfo?.description[language]}</p>
        </div>
      </section>

      {/* Topics Grid */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">{language === "ar" ? "اختر موضوعاً" : "Choose a Topic"}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {levelData.topics.map((topic) => (
              <TopicCard
                key={topic.slug}
                topicSlug={topic.slug}
                href={`/${type}/${level}/${topic.slug}`}
                lessons={topic.lessons}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
