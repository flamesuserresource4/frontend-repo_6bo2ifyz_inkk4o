import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/70 backdrop-blur text-neutral-700 hover:bg-white shadow-sm transition dark:bg-neutral-900/70 dark:text-neutral-200 dark:hover:bg-neutral-900"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}
