import { LessonPageContent } from "./view";


export default async function TopicPage({ params }: { params: Promise<{ type: string; level: string; topic: string; lesson: string }> }) {
  const { type, level, topic, lesson } = await params;
  return <LessonPageContent type={type} level={level} topic={topic} lesson={lesson} />
}
