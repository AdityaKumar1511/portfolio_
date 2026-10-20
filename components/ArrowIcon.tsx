import type { ReactNode } from 'react'

type ArrowProps = {
  size?: number
  strokeWidth?: number
  className?: string
}

type ArrowBaseProps = ArrowProps & {
  dir: 'up-right' | 'right' | 'left'
  children: ReactNode
}

function ArrowBase({
  size = 14,
  strokeWidth = 2.5,
  className,
  dir,
  children,
}: ArrowBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-dir={dir}
      className={className ? `ui-arrow ${className}` : 'ui-arrow'}
    >
      {children}
    </svg>
  )
}

export function ArrowUpRight(props: ArrowProps) {
  return (
    <ArrowBase dir="up-right" {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </ArrowBase>
  )
}

export function ArrowRight(props: ArrowProps) {
  return (
    <ArrowBase dir="right" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </ArrowBase>
  )
}

export function ArrowLeft(props: ArrowProps) {
  return (
    <ArrowBase dir="left" {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </ArrowBase>
  )
}
