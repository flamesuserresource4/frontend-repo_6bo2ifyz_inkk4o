import { useState } from 'react'
import { Menu, X, Candy, ShoppingBag, Phone } from 'lucide-react'

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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/60 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <Candy className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-tight">Flora Chocolatier</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#order" className="inline-flex items-center gap-2 rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-pink-700 transition-colors">
              <Phone className="h-4 w-4" /> Order Now
            </a>
          </nav>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-2 text-neutral-700">
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
