import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isObjEmpty = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0
}

export const toDashCase = (input: string): string | undefined => {
  if (!input) return
  return input.replace(/\s+/g, "-")
}

export const maxLength = (
  str: string | undefined,
  size: number = 100,
  prefix: string = "..."
): string | undefined => {
  if (!str) return undefined

  if (str.length < size) return str
  return str.slice(0, size) + prefix
}

export const formatCurrency = (value: number) => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3
  }).format(value)

  return formattedValue
}
