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

export const DEFAULT_ICON_COLOR = '#262627'
export const DEFAULT_ICON_SIZE = 24
export const DEFAULT_STROKE_WIDTH = 2

export function resolveIconColor(color?: string, fill?: string): string {
  return color ?? fill ?? DEFAULT_ICON_COLOR
}

export function resolveIconSize(
  size?: number,
  width?: number,
  height?: number,
): number {
  return size ?? width ?? height ?? DEFAULT_ICON_SIZE
}
