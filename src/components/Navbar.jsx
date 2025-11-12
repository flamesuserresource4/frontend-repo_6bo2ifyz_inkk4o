import { useState } from 'react'
import { Menu, X, Candy, Phone } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: '#collection', label: 'Collection' },
    { href: '#best-sellers', label: 'Best Sellers' },
    { href: '#order', label: 'Order' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200/70 dark:border-neutral-800/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <Candy className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Flora Chocolatier</span>
          </a>

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="px-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#order" className="ml-2 inline-flex items-center gap-2 rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-700 transition-colors">
              <Phone className="h-4 w-4" /> Order Now
            </a>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-2 text-neutral-700 dark:text-neutral-300">
                {item.label}
              </a>
            ))}
            <a href="#order" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-medium shadow-sm">
              <Phone className="h-4 w-4" /> Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
