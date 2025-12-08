"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LevelCard } from "@/components/level-card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getCourseType, typeNames, type LevelKey } from "@/lib/data/course-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { BookOpen, BookText, Headphones, FileText, PenTool, GraduationCap, Languages } from "lucide-react"

const typeIcons: Record<string, typeof BookOpen> = {
  grammar: BookOpen,
  vocabulary: BookText,
  listening: Headphones,
  reading: FileText,
  "use-of-english": Languages,
  writing: PenTool,
  exams: GraduationCap,
}

export function TypePageContent({ type }: { type: string }) {
  const { language } = useLanguage()
  const courseType = getCourseType(type)

  if (!courseType) {
   return  notFound()
  }

  const typeName = typeNames[type as keyof typeof typeNames]
  const Icon = typeIcons[type] || BookOpen

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <BreadcrumbNav items={[{ label: typeName?.[language] || type }]} />

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary text-primary-foreground">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance">{typeName?.[language] || type}</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === "ar" ? "اختر مستواك للبدء في التعلم" : "Choose your level to start learning"}
          </p>
        </div>
      </section>

      {/* Levels Grid */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseType.levels.map((level) => (
              <LevelCard
                key={level.slug}
                level={level.slug as LevelKey}
                href={`/${type}/${level.slug}`}
                topicsCount={level.topics.length}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
