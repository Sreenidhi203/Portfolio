import type { ComponentType } from 'react'

interface SubHeadingProps {
  icon: ComponentType<{ size?: number; className?: string }>
  label: string
  color: string
}

export function SubHeading({ icon: Icon, label, color }: SubHeadingProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}
        aria-hidden="true"
      >
        <Icon size={16} aria-hidden />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {label}
      </h3>
    </div>
  )
}
