"use client"

import type * as React from "react"
import { ScrollView, StyleSheet, type ScrollViewProps } from "react-native"

interface ScrollAreaProps extends ScrollViewProps {
  children: React.ReactNode
  style?: any
}

function ScrollArea({ children, style, ...props }: ScrollAreaProps) {
  return (
    <ScrollView style={[styles.scrollArea, style]} {...props}>
      {children}
    </ScrollView>
  )
}

function ScrollBar() {
  return null
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
})

export { ScrollArea, ScrollBar }
