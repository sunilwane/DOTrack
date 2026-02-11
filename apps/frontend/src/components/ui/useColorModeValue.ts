// hooks/useColorModeValue.ts

import { useColorMode } from "./useColorMode"

// _define-ocg_: custom hook for switching color mode
export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}
