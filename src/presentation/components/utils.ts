export function cnReactNative(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

// Alias for convenience
export const cn = cnReactNative
