import { use } from "react"
import { TypePageContent } from "./view"

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return <TypePageContent type={type} />
}
