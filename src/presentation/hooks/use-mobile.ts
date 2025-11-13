"use client"

import { useState, useEffect } from "react"
import { Dimensions } from "react-native"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true) // Always true in React Native

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      // You can adjust this threshold based on your needs
      setIsMobile(window.width < 768)
    })

    return () => subscription?.remove()
  }, [])

  return isMobile
}

export { useIsMobile as useMobile }
