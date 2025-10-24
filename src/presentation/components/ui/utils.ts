import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function cnReactNative(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
