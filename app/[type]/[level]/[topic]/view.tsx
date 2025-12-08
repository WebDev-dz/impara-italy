"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getTopic, typeNames, levelNames, topicNames, type LevelKey, type TypeKey } from "@/lib/data/course-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Target, Play, CheckCircle2, Lock } from "lucide-react"
import { GoogleAd } from "@/components/google-ad"

export function TopicPageContent({ type, level, topic }: { type: string; level: string; topic: string }) {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const topicData = getTopic(type, level, topic)

  if (!topicData) {
    notFound()
  }

  const typeName = typeNames[type as TypeKey]
  const levelInfo = levelNames[level as LevelKey]
  const topicInfo = topicNames[topic] || { en: topic, ar: topic, description: { en: "", ar: "" } }

  // Generate mock lessons
  const lessons = Array.from({ length: topicData.lessons }, (_, i) => ({
    id: i + 1,
    title: language === "ar" ? `الدرس ${i + 1}: ${topicInfo.ar}` : `Lesson ${i + 1}: ${topicInfo.en}`,
    duration: `${Math.floor(Math.random() * 15) + 10} ${language === "ar" ? "دقيقة" : "min"}`,
    completed: i < 3,
    locked: i > 5,
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className={resolvedTheme === "dark" ? "bg-gradient-to-b from-primary/20 to-background py-12" : "bg-gradient-to-b from-primary/10 to-background py-12"}>
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: typeName?.[language] || type, href: `/${type}` },
              { label: levelInfo?.[language] || level, href: `/${type}/${level}` },
              { label: topicInfo[language] },
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{level.toUpperCase()}</Badge>
                <Badge variant="outline">{typeName?.[language]}</Badge>
                <Badge variant="outline">{language === "ar" ? (resolvedTheme === "dark" ? "داكن" : "فاتح") : resolvedTheme === "dark" ? "Dark" : "Light"}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{topicInfo[language]}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{topicInfo.description[language]}</p>
            </div>

            {/* Stats */}
            <Card className="md:min-w-[280px]">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>
                      {topicData.lessons} {language === "ar" ? "دروس" : "Lessons"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>
                      ~{topicData.lessons * 15} {language === "ar" ? "دقيقة" : "minutes"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary" />
                    <span>{levelInfo?.[language]}</span>
                  </div>
                  <Button className="w-full mt-2">
                    <Play className="h-4 w-4 me-2" />
                    {language === "ar" ? "ابدأ التعلم" : "Start Learning"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Ad Section */}
          <div className="mb-8">
            <GoogleAd slot="9876543210" className="w-full" />
          </div>

          <h2 className="text-2xl font-semibold mb-6">{language === "ar" ? "محتوى الدروس" : "Lesson Content"}</h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`transition-all ${lesson.locked ? "opacity-60" : "hover:shadow-md cursor-pointer"}`}
              >
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : lesson.locked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Play className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <CardTitle className="text-base">{lesson.title}</CardTitle>
                        <CardDescription>{lesson.duration}</CardDescription>
                      </div>
                    </div>
                    {!lesson.locked && (
                      <Button variant={lesson.completed ? "outline" : "default"} size="sm">
                        {lesson.completed
                          ? language === "ar"
                            ? "مراجعة"
                            : "Review"
                          : language === "ar"
                            ? "ابدأ"
                            : "Start"}
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
