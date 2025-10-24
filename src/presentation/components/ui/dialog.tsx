"use client"

import * as React from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  setOpen: () => {},
})

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

interface DialogTriggerProps {
  children: React.ReactNode
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  const { setOpen } = React.useContext(DialogContext)

  return (
    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function DialogContent({ children, style }: DialogContentProps) {
  const { open, setOpen } = React.useContext(DialogContext)

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

interface DialogHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function DialogHeader({ children, style }: DialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>
}

interface DialogFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function DialogFooter({ children, style }: DialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>
}

interface DialogTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export function DialogTitle({ children, style }: DialogTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

interface DialogDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export function DialogDescription({ children, style }: DialogDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>
}

export function DialogClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = React.useContext(DialogContext)

  return (
    <TouchableOpacity onPress={() => setOpen(false)} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    width: "90%",
    maxWidth: 500,
    gap: 16,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6b7280",
  },
  header: {
    gap: 8,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
})
