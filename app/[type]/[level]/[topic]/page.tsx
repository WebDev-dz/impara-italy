import { TopicPageContent } from "./view";


export default async function TopicPage({ params }: { params: Promise<{ type: string; level: string; topic: string }> }) {
  const { type, level, topic } = await params;
  return <TopicPageContent type={type} level={level} topic={topic} />
}
