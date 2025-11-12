import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-pink-200/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-amber-200/60 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900"
          >
            Handmade Chocolates, Crafted with Love
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-lg text-neutral-600"
          >
            Small-batch truffles, bars, and bonbons made from ethically sourced cacao. Taste the difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex items-center gap-4"
          >
            <a href="#collection" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">
              Browse Collection
            </a>
            <a href="#about" className="inline-flex items-center rounded-full bg-white text-neutral-900 border px-6 py-3 text-sm font-medium hover:bg-neutral-50 transition-colors">
              Learn More
            </a>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ scale: 0.9, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 12 }}
            className="aspect-square w-full max-w-md mx-auto rounded-3xl bg-gradient-to-br from-amber-200 via-pink-100 to-white p-4 shadow-xl"
          >
            <div className="h-full w-full rounded-2xl bg-[url('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur rounded-full px-4 py-2 text-xs shadow"
          >
            Real ingredients. No shortcuts.
          </motion.div>
        </div>
      </div>
    </section>
  )
}
