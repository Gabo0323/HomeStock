"use client"

import * as React from "react"
import { View, TouchableOpacity, Modal, StyleSheet } from "react-native"

interface HoverCardProps {
  children: React.ReactNode
}

interface HoverCardTriggerProps {
  children: React.ReactNode
}

interface HoverCardContentProps {
  children: React.ReactNode
}

const HoverCardContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

export function HoverCard({ children }: HoverCardProps) {
  const [open, setOpen] = React.useState(false)

  return <HoverCardContext.Provider value={{ open, setOpen }}>{children}</HoverCardContext.Provider>
}

export function HoverCardTrigger({ children }: HoverCardTriggerProps) {
  const context = React.useContext(HoverCardContext)

  return <TouchableOpacity onPress={() => context?.setOpen(!context.open)}>{children}</TouchableOpacity>
}

export function HoverCardContent({ children }: HoverCardContentProps) {
  const context = React.useContext(HoverCardContext)

  if (!context?.open) return null

  return (
    <Modal visible={context.open} transparent animationType="fade" onRequestClose={() => context.setOpen(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => context.setOpen(false)}>
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
