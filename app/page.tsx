"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  BookOpen,
  Languages,
  Headphones,
  BookText,
  PenTool,
  FileText,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { GoogleAd } from "@/components/google-ad"

export default function HomePage() {
  const { t, isRTL } = useLanguage()

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const learningPaths = [
    {
      title: t.paths.grammar.title,
      description: t.paths.grammar.description,
      icon: BookOpen,
      href: "/grammar",
      color: "bg-chart-1",
    },
    {
      title: t.paths.vocabulary.title,
      description: t.paths.vocabulary.description,
      icon: Languages,
      href: "/vocabulary",
      color: "bg-chart-2",
    },
    {
      title: t.paths.listening.title,
      description: t.paths.listening.description,
      icon: Headphones,
      href: "/listening",
      color: "bg-chart-3",
    },
    {
      title: t.paths.reading.title,
      description: t.paths.reading.description,
      icon: BookText,
      href: "/reading",
      color: "bg-chart-4",
    },
    {
      title: t.paths.useOfEnglish.title,
      description: t.paths.useOfEnglish.description,
      icon: PenTool,
      href: "/use-of-english",
      color: "bg-chart-5",
    },
    {
      title: t.paths.writing.title,
      description: t.paths.writing.description,
      icon: FileText,
      href: "/writing",
      color: "bg-primary",
    },
    {
      title: t.paths.exams.title,
      description: t.paths.exams.description,
      icon: GraduationCap,
      href: "/exams",
      color: "bg-accent",
    },
  ]

  const features = [
    { text: t.features.interactive, icon: CheckCircle },
    { text: t.features.nativeSpeaker, icon: CheckCircle },
    { text: t.features.progressTracking, icon: CheckCircle },
    { text: t.features.practiceExercises, icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                  {t.home.heroTitle} <span className="text-primary">{t.home.heroTitleHighlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">{t.home.heroDescription}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/grammar">
                      {t.home.startLearning} <ArrowIcon className={`${isRTL ? "mr-2" : "ml-2"} h-4 w-4`} />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/exams">{t.home.viewExamPrep}</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{t.home.students}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{t.home.lessons}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/beautiful-italian-coastal-town-amalfi-with-colorfu.jpg"
                    alt="Beautiful Italian coastal scenery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-6 ${isRTL ? "-right-6" : "-left-6"} bg-card p-4 rounded-xl shadow-lg border border-border`}
                >
                  <p className="font-serif text-lg italic text-foreground">{t.home.ciao}</p>
                  <p className="text-sm text-muted-foreground">{t.home.ciaoTranslation}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Section */}
        <div className="container mx-auto px-4 py-8">
          <GoogleAd slot="1234567890" className="w-full" />
        </div>

        {/* Learning Paths Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{t.home.featuresTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.home.featuresDescription}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {learningPaths.map((path) => (
                <Link key={path.href} href={path.href}>
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl ${path.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                      >
                        <path.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t.home.exploreLessons} <ArrowIcon className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{t.home.ctaTitle}</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{t.home.ctaDescription}</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/grammar">{t.home.beginLearning}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
