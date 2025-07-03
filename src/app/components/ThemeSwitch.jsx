"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Icons } from './ui/Icons'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <></>
  )

  if (theme === "dark") return (
    <button 
      onClick={() => setTheme("light")}
      className='ml-3 p-1 hover:cursor-pointer'
    >
      {Icons.sun}
    </button>
  )

  if (theme === "light") return (
    <button 
      onClick={() => setTheme("dark")}
      className='ml-3 p-1 hover:cursor-pointer'
    >
      {Icons.moon}
    </button>
  )
}