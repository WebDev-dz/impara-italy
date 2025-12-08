"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface GoogleAdProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export function GoogleAd({ 
  slot, 
  format = "auto", 
  responsive = true,
  className,
  style 
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error("Google AdSense error:", err)
    }
  }, [])

  // Replace this with your actual Publisher ID
  const PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXX" 

  if (process.env.NODE_ENV === "development") {
    return (
      <div 
        className={`bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm p-4 text-center ${className}`}
        style={{ minHeight: "100px", ...style }}
      >
        <div className="space-y-1">
          <p className="font-semibold">Google Ad Placeholder</p>
          <p className="text-xs">Slot: {slot}</p>
          <p className="text-xs">Format: {format}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ overflow: "hidden", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
