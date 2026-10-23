import { useLavexTheme } from '../../theme/LavexThemeProvider'

export type IconProps = {
  /** Stroke color (preferred). */
  color?: string
  /** Compat alias for color — existing consumers pass fill. */
  fill?: string
  width?: number
  height?: number
  /** Preferred size; falls back to width/height/24. */
  size?: number
  strokeWidth?: number
}

export const DEFAULT_ICON_COLOR = '#2D3B42'
export const DEFAULT_ICON_SIZE = 24
export const DEFAULT_STROKE_WIDTH = 2

export function resolveIconColor(color?: string, fill?: string): string {
  return color ?? fill ?? DEFAULT_ICON_COLOR
}

/** Igual a `resolveIconColor`, mas sem `color`/`fill` usa `colors.text` do tema. */
export function useIconColor(color?: string, fill?: string): string {
  const { colors } = useLavexTheme()
  return color ?? fill ?? colors.text
}

export function resolveIconSize(
  size?: number,
  width?: number,
  height?: number,
): number {
  return size ?? width ?? height ?? DEFAULT_ICON_SIZE
}
