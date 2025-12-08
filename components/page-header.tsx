import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  icon: LucideIcon
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="bg-primary/5 border-b border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-primary text-primary-foreground">
            <Icon className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
      </div>
    </div>
  )
}
