import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChocolateCard from './components/ChocolateCard'
import ChocolateDetail from './pages/ChocolateDetail'

const fallbackSamples = [
  {
    id: 'sample-1',
    name: 'Sea Salt Caramel Truffle',
    description: 'Silky caramel center enrobed in 62% dark chocolate, finished with flaky sea salt.',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1600&auto=format&fit=crop',
    category: 'Truffle',
    cacao_percent: 62,
  },
  {
    id: 'sample-2',
    name: 'Hazelnut Praline Bonbon',
    description: 'Roasted hazelnut praline with a touch of vanilla in a crisp shell.',
    price: 3.0,
    image: 'https://images.unsplash.com/photo-1691428051155-23baefc80bff?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxIYXplbG51dCUyMFByYWxpbmUlMjBCb25ib258ZW58MHwwfHx8MTc2Mjk2MzcyM3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    category: 'Bonbon',
    cacao_percent: 54,
  },
  {
    id: 'sample-3',
    name: '70% Single-Origin Bar',
    description: 'Bright, fruity notes with a long cocoa finish. Stone-ground in small batches.',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1685599504130-9ee12eef06eb?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHw3MCUyNSUyMFNpbmdsZS1PcmlnaW4lMjBCYXJ8ZW58MHwwfHx8MTc2Mjk2MzcyM3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    category: 'Bar',
    cacao_percent: 70,
  },
  {
    id: 'sample-4',
    name: 'Matcha White Chocolate Bonbon',
    description: 'Ceremonial matcha folded into creamy white chocolate ganache.',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1600&auto=format&fit=crop',
    category: 'Bonbon',
    cacao_percent: 30,
  },
]

function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const params = new URLSearchParams()
        if (category !== 'All') params.set('category', category)
        if (query) params.set('q', query)
        const res = await fetch(`${baseUrl}/api/chocolates?${params.toString()}`)
        const data = await res.json()
        const current = data.items || []

        // If no items in DB yet, call seed endpoint once, then refetch
        if (current.length === 0 && !seeded && !query && category === 'All') {
          try {
            const s = await fetch(`${baseUrl}/api/chocolates/seed`, { method: 'POST' })
            if (s.ok) {
              setSeeded(true)
              const r2 = await fetch(`${baseUrl}/api/chocolates`)
              const d2 = await r2.json()
              setItems(d2.items || fallbackSamples)
            } else {
              setItems(fallbackSamples)
            }
          } catch {
            setItems(fallbackSamples)
          }
        } else {
          setItems(current)
        }
      } catch (e) {
        console.error(e)
        setItems(fallbackSamples)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category, query, seeded])

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

      <section id="order" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Order Now</h2>
            <p className="mt-2 text-neutral-600">Place an order for pickup or delivery. Well confirm details within 24 hours.</p>
            <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-neutral-500">Phone</dt>
                  <dd className="font-medium text-neutral-900">(555) 123-4567</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Email</dt>
                  <dd className="font-medium text-neutral-900">orders@florachocolatier.com</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Hours</dt>
                  <dd className="font-medium text-neutral-900">MonSat, 10am6pm</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Location</dt>
                  <dd className="font-medium text-neutral-900">123 Cocoa Lane, Sweet City</dd>
                </div>
              </dl>
              <a
                href="mailto:orders@florachocolatier.com?subject=New%20Order%20Inquiry&body=Hello%2C%20I%27d%20like%20to%20place%20an%20order.%20Here%20are%20the%20details%3A%0A-%20Items%3A%20%0A-%20Quantity%3A%20%0A-%20Preferred%20pickup%2Fdelivery%20date%3A%20%0A-%20Name%3A%20%0A-%20Phone%3A%20"
                className="mt-6 inline-flex items-center rounded-full bg-pink-600 text-white px-6 py-3 text-sm font-medium shadow-sm hover:bg-pink-700 transition-colors"
              >
                Email Your Order
              </a>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              const name = data.get('name')
              const phone = data.get('phone')
              const item = data.get('item')
              const qty = data.get('qty')
              const date = data.get('date')
              const body = encodeURIComponent(`Hello, I'd like to place an order.\n- Items: ${item}\n- Quantity: ${qty}\n- Preferred pickup/delivery date: ${date}\n- Name: ${name}\n- Phone: ${phone}`)
              window.location.href = `mailto:orders@florachocolatier.com?subject=New%20Order%20Request&body=${body}`
            }}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-neutral-900">Quick Order Form</h3>
            <p className="text-sm text-neutral-600">Well get back to you to confirm.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-600">Your Name</label>
                <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
              </div>
              <div>
                <label className="text-sm text-neutral-600">Phone</label>
                <input name="phone" required className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-neutral-600">Item(s)</label>
                <input name="item" required placeholder="e.g. 6x Sea Salt Caramel, 1x 70% Bar" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
              </div>
              <div>
                <label className="text-sm text-neutral-600">Quantity</label>
                <input name="qty" type="number" min="1" defaultValue="1" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
              </div>
              <div>
                <label className="text-sm text-neutral-600">Preferred Date</label>
                <input name="date" type="date" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition">Send Order</button>
          </form>
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
