export type LevelKey = "a1" | "a2" | "b1" | "b2" | "c1" | "c2"
export type TypeKey = "grammar" | "vocabulary" | "listening" | "reading" | "use-of-english" | "writing" | "exams"

export interface Lesson {
  slug: string
  title: string
}

export interface Vocabulary {
  it: string
  en?: string
  ar?: string
}

export interface Explanation {
  title: { en: string; ar: string }
  content: { en: string; ar: string }
  examples?: { it: string; en: string; ar: string }[]
}

export interface Exercise {
  type: "multiple-choice" | "fill-in-blank" | "matching" | "translation" | "listening" | "writing"
  question: { en: string; ar: string }
  options?: string[]
  correctAnswer: string | string[]
  explanation?: { en: string; ar: string }
}

export interface Topic {
  slug: string
  lessons: number
  vocabularies?: Vocabulary[]
  lessonItems?: Lesson[]
  explanations?: Explanation[]
  exercises?: Exercise[]
}

export interface Level {
  slug: LevelKey
  topics: Topic[]
}

export interface CourseType {
  slug: TypeKey
  levels: Level[]
}

// Italian Alphabet Vocabularies
const italianAlphabetVocabularies: Vocabulary[] = [
  { it: "A", en: "A", ar: "A" },
  { it: "B", en: "B", ar: "B" },
  { it: "C", en: "C", ar: "C" },
  { it: "D", en: "D", ar: "D" },
  { it: "E", en: "E", ar: "E" },
  { it: "F", en: "F", ar: "F" },
  { it: "G", en: "G", ar: "G" },
  { it: "H", en: "H", ar: "H" },
  { it: "I", en: "I", ar: "I" },
  { it: "L", en: "L", ar: "L" },
  { it: "M", en: "M", ar: "M" },
  { it: "N", en: "N", ar: "N" },
  { it: "O", en: "O", ar: "O" },
  { it: "P", en: "P", ar: "P" },
  { it: "Q", en: "Q", ar: "Q" },
  { it: "R", en: "R", ar: "R" },
  { it: "S", en: "S", ar: "S" },
  { it: "T", en: "T", ar: "T" },
  { it: "U", en: "U", ar: "U" },
  { it: "V", en: "V", ar: "V" },
  { it: "Z", en: "Z", ar: "Z" },
]

// Letter Explanations
const letterExplanations: Explanation[] = [
  {
    title: { 
      en: "Italian Alphabet Overview", 
      ar: "نظرة عامة على الأبجدية الإيطالية" 
    },
    content: { 
      en: "The Italian alphabet has 21 letters. Five additional letters (J, K, W, X, Y) are used only in foreign words.", 
      ar: "تحتوي الأبجدية الإيطالية على 21 حرفاً. وتُستخدم خمسة أحرف إضافية (J, K, W, X, Y) فقط في الكلمات الأجنبية." 
    },
    examples: [
      { it: "pizza", en: "pizza", ar: "بيتزا" },
      { it: "gelato", en: "ice cream", ar: "آيس كريم" },
      { it: "ciao", en: "hello/bye", ar: "مرحباً/وداعاً" }
    ]
  },
  {
    title: { 
      en: "Vowel Pronunciation", 
      ar: "نطق حروف العلة" 
    },
    content: { 
      en: "Italian has 5 vowels: A, E, I, O, U. They are always pronounced clearly and never silent.", 
      ar: "تحتوي الإيطالية على 5 حروف علة: A, E, I, O, U. وتُنطق دائماً بوضوح ولا تكون صامتة أبداً." 
    },
    examples: [
      { it: "casa", en: "house", ar: "منزل" },
      { it: "vino", en: "wine", ar: "نبيذ" },
      { it: "amore", en: "love", ar: "حب" }
    ]
  },
  {
    title: { 
      en: "Special Letter Combinations", 
      ar: "تركيبات الحروف الخاصة" 
    },
    content: { 
      en: "Certain letter combinations create unique sounds: CH (k), GH (hard g), GLI (ly), GN (ny), SC (sh before e/i).", 
      ar: "تُنتج بعض تركيبات الحروف أصواتاً فريدة: CH (ك), GH (غ صلبة), GLI (لي), GN (ني), SC (ش قبل e/i)." 
    },
    examples: [
      { it: "chiesa", en: "church", ar: "كنيسة" },
      { it: "spaghetti", en: "spaghetti", ar: "سباغيتي" },
      { it: "figlio", en: "son", ar: "ابن" },
      { it: "gnocchi", en: "gnocchi", ar: "نيوكي" },
      { it: "pesce", en: "fish", ar: "سمك" }
    ]
  }
]

// Letter Exercises
const letterExercises: Exercise[] = [
  {
    type: "multiple-choice",
    question: { 
      en: "How many letters are in the Italian alphabet?", 
      ar: "كم عدد الحروف في الأبجدية الإيطالية؟" 
    },
    options: ["16", "21", "26", "30"],
    correctAnswer: "21",
    explanation: { 
      en: "The Italian alphabet has 21 letters, not including J, K, W, X, Y which are used only for foreign words.", 
      ar: "تحتوي الأبجدية الإيطالية على 21 حرفاً، غير شاملة J, K, W, X, Y التي تُستخدم فقط للكلمات الأجنبية." 
    }
  },
  {
    type: "multiple-choice",
    question: { 
      en: "Which letter combination makes a 'k' sound?", 
      ar: "أي تركيب حروف يُصدر صوت 'ك'؟" 
    },
    options: ["GH", "CH", "SC", "GL"],
    correctAnswer: "CH",
    explanation: { 
      en: "CH in Italian is pronounced like 'k' in English (e.g., chiesa = church).", 
      ar: "CH في الإيطالية تُنطق مثل 'ك' في الإنجليزية (مثال: chiesa = كنيسة)." 
    }
  },
  {
    type: "fill-in-blank",
    question: { 
      en: "Complete: Italian vowels are A, E, I, O, __", 
      ar: "أكمل: حروف العلة الإيطالية هي A, E, I, O, __" 
    },
    correctAnswer: "U",
    explanation: { 
      en: "The five Italian vowels are A, E, I, O, U.", 
      ar: "حروف العلة الإيطالية الخمسة هي A, E, I, O, U." 
    }
  },
  {
    type: "translation",
    question: { 
      en: "Translate to Italian: Hello", 
      ar: "ترجم إلى الإيطالية: مرحباً" 
    },
    correctAnswer: "ciao",
    explanation: { 
      en: "'Ciao' is the informal way to say hello or goodbye in Italian.", 
      ar: "'Ciao' هي الطريقة غير الرسمية لقول مرحباً أو وداعاً بالإيطالية." 
    }
  },
  {
    type: "matching",
    question: { 
      en: "Match the Italian word with its pronunciation guide", 
      ar: "طابق الكلمة الإيطالية مع دليل النطق" 
    },
    correctAnswer: ["chiesa:key-eh-za", "gnocchi:nyoh-kee", "pesce:peh-sheh"],
    explanation: { 
      en: "These words demonstrate special Italian pronunciation rules.", 
      ar: "هذه الكلمات توضح قواعد النطق الإيطالية الخاصة." 
    }
  }
]

// Common topics across most types
const commonTopics: Topic[] = [
  { slug: "common", lessons: 12 },
  { slug: "family", lessons: 10 },
  { slug: "travel", lessons: 15 },
  { slug: "food", lessons: 14 },
  { slug: "shopping", lessons: 8 },
  { slug: "work", lessons: 11 },
  { slug: "health", lessons: 9 },
  { slug: "hobbies", lessons: 10 },
]

const advancedTopics: Topic[] = [
  { slug: "common", lessons: 10 },
  { slug: "business", lessons: 14 },
  { slug: "politics", lessons: 12 },
  { slug: "culture", lessons: 15 },
  { slug: "literature", lessons: 11 },
  { slug: "science", lessons: 9 },
]

const allLevels: Level[] = [
  { slug: "a1", topics: commonTopics },
  { slug: "a2", topics: commonTopics },
  { slug: "b1", topics: [...commonTopics, { slug: "news", lessons: 10 }, { slug: "culture", lessons: 12 }] },
  { slug: "b2", topics: [...commonTopics, { slug: "business", lessons: 14 }, { slug: "culture", lessons: 12 }] },
  { slug: "c1", topics: advancedTopics },
  { slug: "c2", topics: advancedTopics },
]

const vocabularyLevels: Level[] = allLevels.map((level) =>
  level.slug === "a1"
    ? { 
        ...level, 
        topics: [
          ...level.topics, 
          { 
            slug: "letters", 
            lessons: 10, 
            vocabularies: italianAlphabetVocabularies,
            explanations: letterExplanations,
            exercises: letterExercises
          }
        ] 
      }
    : level
)

export const courseData: CourseType[] = [
  { slug: "grammar", levels: allLevels },
  { slug: "vocabulary", levels: vocabularyLevels },
  { slug: "listening", levels: allLevels },
  { slug: "reading", levels: allLevels },
  { slug: "use-of-english", levels: allLevels },
  { slug: "writing", levels: allLevels },
  {
    slug: "exams",
    levels: [
      {
        slug: "a1",
        topics: [
          { slug: "celi-impatto", lessons: 8 },
          { slug: "plida-a1", lessons: 10 },
        ],
      },
      {
        slug: "a2",
        topics: [
          { slug: "celi-1", lessons: 12 },
          { slug: "cils-a2", lessons: 10 },
          { slug: "plida-a2", lessons: 11 },
        ],
      },
      {
        slug: "b1",
        topics: [
          { slug: "celi-2", lessons: 15 },
          { slug: "cils-uno-b1", lessons: 14 },
          { slug: "plida-b1", lessons: 13 },
        ],
      },
      {
        slug: "b2",
        topics: [
          { slug: "celi-3", lessons: 18 },
          { slug: "cils-due-b2", lessons: 16 },
          { slug: "plida-b2", lessons: 15 },
        ],
      },
      {
        slug: "c1",
        topics: [
          { slug: "celi-4", lessons: 20 },
          { slug: "cils-tre-c1", lessons: 18 },
          { slug: "plida-c1", lessons: 17 },
        ],
      },
      {
        slug: "c2",
        topics: [
          { slug: "celi-5", lessons: 22 },
          { slug: "cils-quattro-c2", lessons: 20 },
          { slug: "plida-c2", lessons: 19 },
        ],
      },
    ],
  },
]

export function getCourseType(slug: string): CourseType | undefined {
  return courseData.find((type) => type.slug === slug)
}

export function getLevel(typeSlug: string, levelSlug: string): Level | undefined {
  const type = getCourseType(typeSlug)
  return type?.levels.find((level) => level.slug === levelSlug)
}

export function getTopic(typeSlug: string, levelSlug: string, topicSlug: string): Topic | undefined {
  const level = getLevel(typeSlug, levelSlug)
  return level?.topics.find((topic) => topic.slug === topicSlug)
}

export const levelNames: Record<LevelKey, { en: string; ar: string; description: { en: string; ar: string } }> = {
  a1: {
    en: "A1 - Beginner",
    ar: "A1 - مبتدئ",
    description: {
      en: "Start your Italian journey with basic phrases and vocabulary",
      ar: "ابدأ رحلتك الإيطالية بالعبارات والمفردات الأساسية",
    },
  },
  a2: {
    en: "A2 - Elementary",
    ar: "A2 - ابتدائي",
    description: {
      en: "Build on basics with everyday expressions and simple sentences",
      ar: "ابنِ على الأساسيات بالتعبيرات اليومية والجمل البسيطة",
    },
  },
  b1: {
    en: "B1 - Intermediate",
    ar: "B1 - متوسط",
    description: {
      en: "Handle most travel situations and discuss familiar topics",
      ar: "تعامل مع معظم مواقف السفر وناقش المواضيع المألوفة",
    },
  },
  b2: {
    en: "B2 - Upper Intermediate",
    ar: "B2 - فوق المتوسط",
    description: {
      en: "Interact fluently with native speakers on various topics",
      ar: "تفاعل بطلاقة مع الناطقين الأصليين في مواضيع مختلفة",
    },
  },
  c1: {
    en: "C1 - Advanced",
    ar: "C1 - متقدم",
    description: {
      en: "Express yourself fluently in complex academic and professional contexts",
      ar: "عبّر عن نفسك بطلاقة في السياقات الأكاديمية والمهنية المعقدة",
    },
  },
  c2: {
    en: "C2 - Mastery",
    ar: "C2 - إتقان",
    description: {
      en: "Understand virtually everything and express yourself with precision",
      ar: "افهم كل شيء تقريباً وعبّر عن نفسك بدقة",
    },
  },
}

export const topicNames: Record<string, { en: string; ar: string; description: { en: string; ar: string } }> = {
  common: {
    en: "Common Phrases",
    ar: "العبارات الشائعة",
    description: { en: "Essential everyday expressions", ar: "التعبيرات اليومية الأساسية" },
  },
  letters: {
    en: "Letters & Alphabet",
    ar: "الحروف والأبجدية",
    description: { en: "Learn Italian letters and pronunciation", ar: "تعلّم الحروف الإيطالية والنطق" },
  },
  family: {
    en: "Family & Relationships",
    ar: "العائلة والعلاقات",
    description: { en: "Talk about family members and relationships", ar: "تحدث عن أفراد العائلة والعلاقات" },
  },
  travel: {
    en: "Travel & Tourism",
    ar: "السفر والسياحة",
    description: { en: "Navigate Italian cities and tourist spots", ar: "تنقل في المدن والأماكن السياحية الإيطالية" },
  },
  food: {
    en: "Food & Dining",
    ar: "الطعام والمطاعم",
    description: { en: "Order food and discuss Italian cuisine", ar: "اطلب الطعام وناقش المطبخ الإيطالي" },
  },
  shopping: {
    en: "Shopping & Services",
    ar: "التسوق والخدمات",
    description: { en: "Shop and use various services in Italian", ar: "تسوق واستخدم خدمات متنوعة بالإيطالية" },
  },
  work: {
    en: "Work & Career",
    ar: "العمل والمهنة",
    description: { en: "Professional vocabulary for the workplace", ar: "مفردات مهنية لبيئة العمل" },
  },
  health: {
    en: "Health & Wellness",
    ar: "الصحة والعافية",
    description: { en: "Medical vocabulary and health discussions", ar: "مفردات طبية ومناقشات صحية" },
  },
  hobbies: {
    en: "Hobbies & Leisure",
    ar: "الهوايات والترفيه",
    description: { en: "Talk about activities and interests", ar: "تحدث عن الأنشطة والاهتمامات" },
  },
  news: {
    en: "News & Media",
    ar: "الأخبار والإعلام",
    description: { en: "Understand Italian news and current events", ar: "افهم الأخبار والأحداث الإيطالية" },
  },
  culture: {
    en: "Culture & Arts",
    ar: "الثقافة والفنون",
    description: { en: "Explore Italian culture, art, and history", ar: "استكشف الثقافة والفن والتاريخ الإيطالي" },
  },
  business: {
    en: "Business & Finance",
    ar: "الأعمال والمال",
    description: { en: "Professional business communication", ar: "التواصل التجاري المهني" },
  },
  politics: {
    en: "Politics & Society",
    ar: "السياسة والمجتمع",
    description: { en: "Discuss political and social topics", ar: "ناقش المواضيع السياسية والاجتماعية" },
  },
  literature: {
    en: "Literature & Writing",
    ar: "الأدب والكتابة",
    description: { en: "Explore Italian literary works", ar: "استكشف الأعمال الأدبية الإيطالية" },
  },
  science: {
    en: "Science & Technology",
    ar: "العلوم والتكنولوجيا",
    description: { en: "Scientific and technical vocabulary", ar: "مفردات علمية وتقنية" },
  },
  // Exam topics
  "celi-impatto": {
    en: "CELI Impatto",
    ar: "CELI Impatto",
    description: { en: "Prepare for CELI Impatto exam", ar: "استعد لامتحان CELI Impatto" },
  },
  "celi-1": {
    en: "CELI 1",
    ar: "CELI 1",
    description: { en: "Prepare for CELI 1 exam", ar: "استعد لامتحان CELI 1" },
  },
  "celi-2": {
    en: "CELI 2",
    ar: "CELI 2",
    description: { en: "Prepare for CELI 2 exam", ar: "استعد لامتحان CELI 2" },
  },
  "celi-3": {
    en: "CELI 3",
    ar: "CELI 3",
    description: { en: "Prepare for CELI 3 exam", ar: "استعد لامتحان CELI 3" },
  },
  "celi-4": {
    en: "CELI 4",
    ar: "CELI 4",
    description: { en: "Prepare for CELI 4 exam", ar: "استعد لامتحان CELI 4" },
  },
  "celi-5": {
    en: "CELI 5",
    ar: "CELI 5",
    description: { en: "Prepare for CELI 5 exam", ar: "استعد لامتحان CELI 5" },
  },
  "plida-a1": {
    en: "PLIDA A1",
    ar: "PLIDA A1",
    description: { en: "Prepare for PLIDA A1 exam", ar: "استعد لامتحان PLIDA A1" },
  },
  "plida-a2": {
    en: "PLIDA A2",
    ar: "PLIDA A2",
    description: { en: "Prepare for PLIDA A2 exam", ar: "استعد لامتحان PLIDA A2" },
  },
  "plida-b1": {
    en: "PLIDA B1",
    ar: "PLIDA B1",
    description: { en: "Prepare for PLIDA B1 exam", ar: "استعد لامتحان PLIDA B1" },
  },
  "plida-b2": {
    en: "PLIDA B2",
    ar: "PLIDA B2",
    description: { en: "Prepare for PLIDA B2 exam", ar: "استعد لامتحان PLIDA B2" },
  },
  "plida-c1": {
    en: "PLIDA C1",
    ar: "PLIDA C1",
    description: { en: "Prepare for PLIDA C1 exam", ar: "استعد لامتحان PLIDA C1" },
  },
  "plida-c2": {
    en: "PLIDA C2",
    ar: "PLIDA C2",
    description: { en: "Prepare for PLIDA C2 exam", ar: "استعد لامتحان PLIDA C2" },
  },
  "cils-a2": {
    en: "CILS A2",
    ar: "CILS A2",
    description: { en: "Prepare for CILS A2 exam", ar: "استعد لامتحان CILS A2" },
  },
  "cils-uno-b1": {
    en: "CILS Uno B1",
    ar: "CILS Uno B1",
    description: { en: "Prepare for CILS Uno B1 exam", ar: "استعد لامتحان CILS Uno B1" },
  },
  "cils-due-b2": {
    en: "CILS Due B2",
    ar: "CILS Due B2",
    description: { en: "Prepare for CILS Due B2 exam", ar: "استعد لامتحان CILS Due B2" },
  },
  "cils-tre-c1": {
    en: "CILS Tre C1",
    ar: "CILS Tre C1",
    description: { en: "Prepare for CILS Tre C1 exam", ar: "استعد لامتحان CILS Tre C1" },
  },
  "cils-quattro-c2": {
    en: "CILS Quattro C2",
    ar: "CILS Quattro C2",
    description: { en: "Prepare for CILS Quattro C2 exam", ar: "استعد لامتحان CILS Quattro C2" },
  },
}

export const typeNames: Record<TypeKey, { en: string; ar: string }> = {
  grammar: { en: "Grammar", ar: "القواعد" },
  vocabulary: { en: "Vocabulary", ar: "المفردات" },
  listening: { en: "Listening", ar: "الاستماع" },
  reading: { en: "Reading", ar: "القراءة" },
  "use-of-english": { en: "Use of Italian", ar: "استخدام الإيطالية" },
  writing: { en: "Writing", ar: "الكتابة" },
  exams: { en: "Exams", ar: "الامتحانات" },
}