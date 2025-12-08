"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getTopic, typeNames, levelNames, topicNames, type LevelKey, type TypeKey, type Exercise } from "@/lib/data/course-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, HelpCircle, ArrowLeft, Volume2, BookOpen, PenTool } from "lucide-react"
import { GoogleAd } from "@/components/google-ad"

export function LessonPageContent({ type, level, topic, lesson }: { type: string; level: string; topic: string; lesson: string }) {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const topicData = getTopic(type, level, topic)


  
  if (!topicData) {
    notFound()
  }

  const typeName = typeNames[type as TypeKey]
  const levelInfo = levelNames[level as LevelKey]
  const topicInfo = topicNames[topic] || { en: topic, ar: topic, description: { en: "", ar: "" } }

  // State for exercises
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [exerciseCompleted, setExerciseCompleted] = useState(false)
  
  // Matching game state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [selectedMatchItem, setSelectedMatchItem] = useState<string | null>(null)

  const exercises = topicData.exercises || []
  const currentExercise = exercises[currentExerciseIndex]

  const handleCheckAnswer = () => {
    if (!currentExercise) return

    let correct = false
    
    if (currentExercise.type === "multiple-choice" || currentExercise.type === "fill-in-blank" || currentExercise.type === "translation") {
      const answer = Array.isArray(selectedAnswer) ? selectedAnswer[0] : selectedAnswer
      const correctAnswer = Array.isArray(currentExercise.correctAnswer) ? currentExercise.correctAnswer[0] : currentExercise.correctAnswer
      
      if (typeof answer === "string" && typeof correctAnswer === "string") {
        correct = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      }
    } else if (currentExercise.type === "matching") {
       // Logic handled inside the matching component part usually, but here we check completion
       correct = matchedPairs.length === (Array.isArray(currentExercise.correctAnswer) ? currentExercise.correctAnswer.length * 2 : 0)
    }

    setIsCorrect(correct)
    setShowFeedback(true)
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setSelectedAnswer("")
      setShowFeedback(false)
      setIsCorrect(false)
      setMatchedPairs([])
      setSelectedMatchItem(null)
    } else {
      setExerciseCompleted(true)
    }
  }

  const handleMatchingClick = (item: string) => {
    if (matchedPairs.includes(item)) return
    
    if (!selectedMatchItem) {
      setSelectedMatchItem(item)
    } else {
      if (selectedMatchItem === item) {
        setSelectedMatchItem(null)
        return
      }
      
      // Check if pair is correct
      const correctPairs = (currentExercise.correctAnswer as string[]).map(pair => pair.split(':'))
      const isPair = correctPairs.some(pair => 
        (pair[0] === selectedMatchItem && pair[1] === item) || 
        (pair[1] === selectedMatchItem && pair[0] === item)
      )

      if (isPair) {
        setMatchedPairs([...matchedPairs, selectedMatchItem, item])
        
        // Check if all matched
        if (matchedPairs.length + 2 >= (currentExercise.correctAnswer as string[]).length * 2) {
           setIsCorrect(true)
           setShowFeedback(true)
        }
      }
      
      setSelectedMatchItem(null)
    }
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'it-IT'
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className={resolvedTheme === "dark" ? "bg-gradient-to-b from-primary/20 to-background py-8" : "bg-gradient-to-b from-primary/10 to-background py-8"}>
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: typeName?.[language] || type, href: `/${type}` },
              { label: levelInfo?.[language] || level, href: `/${type}/${level}` },
              { label: topicInfo[language], href: `/${type}/${level}/${topic}` },
              { label: language === "ar" ? `الدرس ${lesson}` : `Lesson ${lesson}` },
            ]}
          />
          
          <div className="mt-6">
             <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{level.toUpperCase()}</Badge>
                <Badge variant="outline">{typeName?.[language]}</Badge>
             </div>
             <h1 className="text-3xl font-bold mb-2">
               {language === "ar" ? `الدرس ${lesson}: ${topicInfo.ar}` : `Lesson ${lesson}: ${topicInfo.en}`}
             </h1>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* Ad Section */}
        <div className="mb-8">
          <GoogleAd slot="1122334455" className="w-full" />
        </div>

        {/* Explanations Section */}
        {topicData.explanations && topicData.explanations.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{language === "ar" ? "الشرح" : "Explanation"}</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topicData.explanations.map((exp, idx) => (
                <Card key={idx} className="h-full">
                  <CardHeader>
                    <CardTitle>{exp.title[language]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{exp.content[language]}</p>
                    {exp.examples && (
                      <div className="bg-muted p-3 rounded-md text-sm space-y-2">
                        {exp.examples.map((ex, i) => (
                          <div key={i} className="flex justify-between items-center border-b last:border-0 pb-1 last:pb-0 border-muted-foreground/20 cursor-pointer hover:bg-muted-foreground/5 rounded px-1 transition-colors" onClick={() => speak(ex.it)}>
                            <div className="flex items-center gap-2">
                               <Volume2 className="h-3 w-3 text-muted-foreground" />
                               <span className="font-semibold text-primary">{ex.it}</span>
                            </div>
                            <span className="text-muted-foreground">{ex[language]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Vocabulary Section */}
        {topicData.vocabularies && topicData.vocabularies.length > 0 && (
          <section className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <Volume2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{language === "ar" ? "المفردات" : "Vocabulary"}</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {topicData.vocabularies.map((vocab, idx) => (
                <Card key={idx} className="text-center hover:shadow-md transition-shadow cursor-pointer group" onClick={() => speak(vocab.it)}>
                  <CardContent className="p-4 flex flex-col items-center justify-center aspect-square relative">
                    <Volume2 className="h-4 w-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    <span className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">{vocab.it}</span>
                    <span className="text-sm text-muted-foreground">{vocab[language === "ar" ? "ar" : "en"] || vocab.en}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Exercises Section */}
        {exercises.length > 0 && (
          <section className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <PenTool className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{language === "ar" ? "تمارين" : "Exercises"}</h2>
            </div>

            {!exerciseCompleted ? (
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                   <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline">
                        {language === "ar" ? `تمرين ${currentExerciseIndex + 1} من ${exercises.length}` : `Exercise ${currentExerciseIndex + 1} of ${exercises.length}`}
                      </Badge>
                   </div>
                   <CardTitle className="text-xl">{currentExercise.question[language]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   {/* Multiple Choice */}
                   {currentExercise.type === "multiple-choice" && currentExercise.options && (
                     <div className="grid gap-3">
                       {currentExercise.options.map((option, idx) => (
                         <Button
                           key={idx}
                           variant={selectedAnswer === option ? "default" : "outline"}
                           className={`justify-start h-auto py-3 px-4 text-lg ${showFeedback && option === currentExercise.correctAnswer ? "bg-green-100 dark:bg-green-900/30 border-green-500" : ""} ${showFeedback && selectedAnswer === option && selectedAnswer !== currentExercise.correctAnswer ? "bg-red-100 dark:bg-red-900/30 border-red-500" : ""}`}
                           onClick={() => !showFeedback && setSelectedAnswer(option)}
                           disabled={showFeedback}
                         >
                           {option}
                         </Button>
                       ))}
                     </div>
                   )}

                   {/* Fill in Blank / Translation */}
                   {(currentExercise.type === "fill-in-blank" || currentExercise.type === "translation") && (
                     <div className="space-y-4">
                       <input
                         type="text"
                         value={selectedAnswer as string}
                         onChange={(e) => !showFeedback && setSelectedAnswer(e.target.value)}
                         className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                         placeholder={language === "ar" ? "اكتب إجابتك هنا..." : "Type your answer here..."}
                         disabled={showFeedback}
                       />
                     </div>
                   )}

                   {/* Matching */}
                   {currentExercise.type === "matching" && Array.isArray(currentExercise.correctAnswer) && (
                     <div className="grid grid-cols-2 gap-4">
                        {(() => {
                          const pairs = (currentExercise.correctAnswer as string[]).map(s => s.split(':'));
                          // Flatten and shuffle (simple shuffle for now, or just list)
                          // For simplicity in this implementation, we just list left and right columns shuffled or static
                          const leftItems = pairs.map(p => p[0]);
                          const rightItems = pairs.map(p => p[1]);
                          const allItems = [...leftItems, ...rightItems].sort(); // simple sort to mix

                          return allItems.map((item, idx) => {
                             const isMatched = matchedPairs.includes(item);
                             const isSelected = selectedMatchItem === item;
                             return (
                               <Button
                                 key={idx}
                                 variant={isMatched ? "secondary" : isSelected ? "default" : "outline"}
                                 className={`h-auto py-3 ${isMatched ? "opacity-50" : ""}`}
                                 onClick={() => !isMatched && handleMatchingClick(item)}
                                 disabled={isMatched || showFeedback}
                               >
                                 {item}
                               </Button>
                             )
                          })
                        })()}
                     </div>
                   )}

                   {/* Feedback Area */}
                   {showFeedback && (
                     <div className={`p-4 rounded-lg flex items-start gap-3 ${isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                        {isCorrect ? <CheckCircle2 className="h-5 w-5 mt-0.5" /> : <XCircle className="h-5 w-5 mt-0.5" />}
                        <div>
                          <p className="font-semibold">{isCorrect ? (language === "ar" ? "إجابة صحيحة!" : "Correct Answer!") : (language === "ar" ? "إجابة خاطئة" : "Incorrect")}</p>
                          {!isCorrect && currentExercise.type !== "matching" && (
                             <p className="mt-1">
                               {language === "ar" ? "الإجابة الصحيحة هي:" : "The correct answer is:"} <span className="font-bold">{Array.isArray(currentExercise.correctAnswer) ? currentExercise.correctAnswer.join(", ") : currentExercise.correctAnswer}</span>
                             </p>
                          )}
                          {currentExercise.explanation && (
                             <p className="mt-2 text-sm opacity-90">{currentExercise.explanation[language]}</p>
                          )}
                        </div>
                     </div>
                   )}
                </CardContent>
                <CardFooter className="flex justify-between">
                   {!showFeedback ? (
                     <Button onClick={handleCheckAnswer} disabled={!selectedAnswer && currentExercise.type !== "matching"} className="w-full sm:w-auto">
                       {language === "ar" ? "تحقق" : "Check Answer"}
                     </Button>
                   ) : (
                     <Button onClick={handleNextExercise} className="w-full sm:w-auto ml-auto">
                       {currentExerciseIndex < exercises.length - 1 ? (language === "ar" ? "التالي" : "Next Exercise") : (language === "ar" ? "إنهاء" : "Finish")}
                       {language === "ar" ? <ArrowLeft className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
                     </Button>
                   )}
                </CardFooter>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto text-center py-12">
                 <CardContent className="space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                       <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{language === "ar" ? "أحسنت!" : "Great Job!"}</h3>
                      <p className="text-muted-foreground">{language === "ar" ? "لقد أكملت جميع تمارين هذا الدرس." : "You have completed all exercises for this lesson."}</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                       <Button variant="outline" onClick={() => {
                         setCurrentExerciseIndex(0)
                         setExerciseCompleted(false)
                         setShowFeedback(false)
                         setIsCorrect(false)
                         setSelectedAnswer("")
                         setMatchedPairs([])
                       }}>
                         <RefreshCw className="h-4 w-4 mr-2" />
                         {language === "ar" ? "إعادة التمارين" : "Restart Exercises"}
                       </Button>
                       <Button onClick={() => window.history.back()}>
                         {language === "ar" ? "العودة للدرس" : "Back to Lesson"}
                       </Button>
                    </div>
                 </CardContent>
              </Card>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
