"use client"

import * as React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface TooltipProps {
  children: React.ReactNode
}

const TooltipContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

function Tooltip({ children }: TooltipProps) {
  const [open, setOpen] = React.useState(false)

  return <TooltipContext.Provider value={{ open, setOpen }}>{children}</TooltipContext.Provider>
}

function TooltipTrigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = React.useContext(TooltipContext)

  return (
    <TouchableOpacity onPressIn={() => setOpen(true)} onPressOut={() => setOpen(false)}>
      {children}
    </TouchableOpacity>
  )
}

function TooltipContent({ children, style }: { children: React.ReactNode; style?: any }) {
  const { open } = React.useContext(TooltipContext)

  if (!open) return null

  return (
    <View style={[styles.content, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    backgroundColor: "#1f2937",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 50,
  },
  text: {
    color: "#ffffff",
    fontSize: 12,
  },
})

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
