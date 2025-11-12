export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border bg-white/60 dark:bg-neutral-800/60 p-3 shadow-sm">
      <div className="aspect-[4/3] w-full rounded-xl bg-neutral-200 dark:bg-neutral-700" />
      <div className="mt-3 h-4 w-3/5 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div className="mt-2 h-3 w-full rounded bg-neutral-100 dark:bg-neutral-700/80" />
      <div className="mt-2 h-3 w-4/5 rounded bg-neutral-100 dark:bg-neutral-700/80" />
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-neutral-100 dark:bg-neutral-700/70" />
        <div className="h-5 w-20 rounded-full bg-neutral-100 dark:bg-neutral-700/70" />
      </div>
    </div>
  )
}
