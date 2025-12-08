import { LevelPageContent } from "./view"


export default async function LevelPage({ params }: { params: Promise<{ type: string; level: string }> }) {
  
  const { type, level } = await params;

  return <LevelPageContent type={type} level={level} />
}
