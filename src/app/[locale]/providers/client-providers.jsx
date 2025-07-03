"use client"
import { ThemeProvider } from "next-themes"

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      enableSystem
      defaultTheme="system"
    >
      {children}
    </ThemeProvider>
  )
}