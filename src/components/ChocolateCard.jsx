import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ChocolateCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group rounded-2xl border bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <Link to={`/chocolate/${item.id}`} className="block">
        <div className="aspect-[4/3] w-full rounded-xl bg-neutral-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold text-neutral-900">{item.name}</h3>
            <span className="text-sm font-medium text-pink-600">${item.price.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-pink-50 text-pink-700 px-2 py-0.5 text-xs">{item.category}</span>
            {item.cacao_percent != null && (
              <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-2 py-0.5 text-xs">{item.cacao_percent}% cacao</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
