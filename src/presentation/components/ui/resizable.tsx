"use client"

import * as React from "react"
import { View, PanResponder, StyleSheet } from "react-native"

interface ResizablePanelGroupProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  style?: any
}

interface ResizablePanelProps {
  children: React.ReactNode
  defaultSize?: number
  style?: any
}

interface ResizableHandleProps {
  withHandle?: boolean
}

export function ResizablePanelGroup({ children, direction = "horizontal", style }: ResizablePanelGroupProps) {
  return <View style={[styles.container, direction === "vertical" && styles.containerVertical, style]}>{children}</View>
}

export function ResizablePanel({ children, defaultSize = 50, style }: ResizablePanelProps) {
  return <View style={[styles.panel, { flex: defaultSize }, style]}>{children}</View>
}

export function ResizableHandle({ withHandle }: ResizableHandleProps) {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Handle resize logic here
      },
    }),
  ).current

  return (
    <View style={styles.handle} {...panResponder.panHandlers}>
      {withHandle && <View style={styles.handleIndicator} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  containerVertical: {
    flexDirection: "column",
  },
  panel: {
    overflow: "hidden",
  },
  handle: {
    width: 4,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  handleIndicator: {
    width: 12,
    height: 16,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },
})
