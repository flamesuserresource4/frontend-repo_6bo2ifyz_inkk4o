import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ChocolateDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/chocolates/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setItem(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>
  if (error) return <div className="min-h-screen grid place-items-center text-red-600">{error}</div>
  if (!item) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Link to="/" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">← Back to collection</Link>
        <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl overflow-hidden shadow-lg">
            <img src={item.image} alt={item.name} className="w-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">{item.name}</h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">{item.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-semibold text-pink-600">${item.price.toFixed(2)}</span>
              <span className="inline-flex items-center rounded-full bg-pink-50 text-pink-700 px-2 py-0.5 text-xs">{item.category}</span>
              {item.cacao_percent != null && (
                <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-2 py-0.5 text-xs">{item.cacao_percent}% cacao</span>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button className="rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition">Add to cart</button>
              <button className="rounded-full border px-6 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">Save</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
