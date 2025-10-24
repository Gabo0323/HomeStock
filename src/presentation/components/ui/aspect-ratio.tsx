import type * as React from "react"
import { View, StyleSheet } from "react-native"

interface AspectRatioProps {
  ratio?: number
  children?: React.ReactNode
  style?: any
}

export function AspectRatio({ ratio = 1, children, style }: AspectRatioProps) {
  return <View style={[styles.container, { aspectRatio: ratio }, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
})
