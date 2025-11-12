import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChocolateCard from './components/ChocolateCard'
import ChocolateDetail from './pages/ChocolateDetail'

function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const params = new URLSearchParams()
        if (category !== 'All') params.set('category', category)
        if (query) params.set('q', query)
        const res = await fetch(`${baseUrl}/api/chocolates?${params.toString()}`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category, query])

  // Smooth scroll behavior on internal links
  useEffect(() => {
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href').slice(1)
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const categories = ['All', 'Truffle', 'Bonbon', 'Bar']

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <Navbar />
      <Hero />

      <section id="collection" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Our Collection</h2>
            <p className="mt-1 text-neutral-600">Explore our seasonal assortment of handmade treats</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flavors..."
              className="h-10 w-48 rounded-full border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
            />
            <div className="flex items-center rounded-full border p-1 bg-white">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 text-sm rounded-full transition ${category === c ? 'bg-pink-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center py-20">Loading...</div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item) => (
              <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                <ChocolateCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <section id="best-sellers" className="bg-white/60 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Best Sellers</h2>
          <p className="mt-1 text-neutral-600">Fan favorites that never go out of style</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.slice(0, 4).map((item) => (
              <ChocolateCard key={`best-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjI5MTcyNDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="w-full"/>
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-neutral-900">Our Story</h3>
            <p className="mt-2 text-neutral-600">We hand-temper in small batches using single-origin cacao and local cream. Every piece is finished by hand, resulting in nuanced textures and flavors.</p>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-neutral-900 text-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <p>© {new Date().getFullYear()} Flora Chocolatier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chocolate/:id" element={<ChocolateDetail />} />
    </Routes>
  )
}

export default App
