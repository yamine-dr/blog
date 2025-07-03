"use client"
import { useEffect } from "react"

export default function UpdateViews({ slug }) {
  useEffect(() => {
    fetch("/api/post-views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
  }, [slug])
  
  return null
}