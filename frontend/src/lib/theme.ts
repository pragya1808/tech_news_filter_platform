// ─── Design system constants ──────────────────────────────────────────────
// All values mirror the CSS custom properties in globals.css.
// Use these in JS/TS contexts (e.g. Recharts,styles).

// ── Colors ───────────────────────────────────────────────────────────────
export const colors = {
  // Surfaces
  bg: '#03060f',
  surface: '#0d1117',
  surface2: '#161b22',
  surface3: '#1c2230',
  border: '#21262d',
  borderSubtle: '#161b22',

  // Brand
  brand: '#3b82f6',
  brandHover: '#2563eb',
  brandMuted: 'rgba(59,130,246,0.15)',

  // Text
  textPrimary: '#e6edf3',
  textSecondary: '#8b949e',
  textMuted: '#484f58',
  textLink: '#58a6ff',

  // Status
  success: '#3fb950',
  successMuted: 'rgba(63,185,80,0.15)',
  warning: '#d29922',
  warningMuted: 'rgba(210,153,34,0.15)',
  danger: '#f85149',
  dangerMuted: 'rgba(248,81,73,0.15)',
  info: '#58a6ff',
  infoMuted: 'rgba(88,166,255,0.15)',
} as const

// ── Chart palette ─────────────────────────────────────────────────────────
export const chartColors = [
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#f97316', // orange
  '#6366f1', // indigo
] as const

export type ChartColor = typeof chartColors[number]

// ── Typography scale ──────────────────────────────────────────────────────
export const typography = {
  // font families
  fontSans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  // sizes (rem)
  size: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
  },

  // weights
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // line heights
  leading: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const

// ── Spacing scale (px) ────────────────────────────────────────────────────
export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

// ── Border radius ─────────────────────────────────────────────────────────
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const

// ── Shadows ───────────────────────────────────────────────────────────────
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.4)',
  md: '0 4px 12px rgba(0,0,0,0.5)',
  lg: '0 8px 24px rgba(0,0,0,0.6)',
  glowBrand: '0 0 0 3px rgba(59,130,246,0.3)',
} as const

// ── Transitions ───────────────────────────────────────────────────────────
export const transitions = {
  fast: '100ms ease',
  base: '150ms ease',
  slow: '300ms ease',
} as const

// ── Status config ─────────────────────────────────────────────────────────
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'default'

export const statusConfig: Record<
  StatusVariant,
  { color: string; bg: string; label: string }
> = {
  success: { color: colors.success, bg: colors.successMuted, label: 'Success' },
  warning: { color: colors.warning, bg: colors.warningMuted, label: 'Warning' },
  danger: { color: colors.danger, bg: colors.dangerMuted, label: 'Error' },
  info: { color: colors.info, bg: colors.infoMuted, label: 'Info' },
  default: { color: colors.textSecondary, bg: colors.surface2, label: 'Default' },
}

// ── Badge variants ────────────────────────────────────────────────────────
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-[#1c2230] text-[#8b949e] border border-[#21262d]',
  primary: 'bg-[rgba(59,130,246,0.15)] text-[#58a6ff] border border-[rgba(59,130,246,0.3)]',
  success: 'bg-[rgba(63,185,80,0.15)]  text-[#3fb950] border border-[rgba(63,185,80,0.3)]',
  warning: 'bg-[rgba(210,153,34,0.15)] text-[#d29922] border border-[rgba(210,153,34,0.3)]',
  danger: 'bg-[rgba(248,81,73,0.15)]  text-[#f85149] border border-[rgba(248,81,73,0.3)]',
  info: 'bg-[rgba(88,166,255,0.15)] text-[#58a6ff] border border-[rgba(88,166,255,0.3)]',
}

// ── Button variants ───────────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-sm',
  secondary: 'bg-[#1c2230] text-[#e6edf3] border border-[#21262d] hover:bg-[#21262d]',
  ghost: 'text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3]',
  danger: 'bg-[rgba(248,81,73,0.15)] text-[#f85149] border border-[rgba(248,81,73,0.3)] hover:bg-[rgba(248,81,73,0.25)]',
}

export const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-7  px-3 text-xs  gap-1.5 rounded-md',
  md: 'h-9  px-4 text-sm  gap-2   rounded-lg',
  lg: 'h-11 px-5 text-base gap-2  rounded-lg',
}

export const buttonBase = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d1117] disabled:opacity-40 disabled:cursor-not-allowed'
