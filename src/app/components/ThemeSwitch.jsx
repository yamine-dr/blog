"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { setThemeCookie } from '@/src/libs/theme'
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
      onClick={() => {
        setTheme("light")
        setThemeCookie("light")
      }}
      className='p-1 border border-neutral hover:cursor-pointer rounded-full'
    >
      {Icons.sun}
    </button>
  )

  if (theme === "light") return (
    <button 
      onClick={() => {
        setTheme("dark")
        setThemeCookie("dark")
      }}
      className='p-1 border border-neutral hover:cursor-pointer rounded-full'
    >
      {Icons.moon}
    </button>
  )
}
