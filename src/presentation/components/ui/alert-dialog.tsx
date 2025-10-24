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
import { buttonVariants } from "./button"

interface AlertDialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({
  open: false,
  setOpen: () => {},
})

interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function AlertDialog({ open: controlledOpen, onOpenChange, children }: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  return <AlertDialogContext.Provider value={{ open, setOpen }}>{children}</AlertDialogContext.Provider>
}

interface AlertDialogTriggerProps {
  children: React.ReactNode
}

export function AlertDialogTrigger({ children }: AlertDialogTriggerProps) {
  const { setOpen } = React.useContext(AlertDialogContext)

  return (
    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  )
}

interface AlertDialogContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function AlertDialogContent({ children, style }: AlertDialogContentProps) {
  const { open, setOpen } = React.useContext(AlertDialogContext)

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

interface AlertDialogHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function AlertDialogHeader({ children, style }: AlertDialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>
}

interface AlertDialogFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function AlertDialogFooter({ children, style }: AlertDialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>
}

interface AlertDialogTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export function AlertDialogTitle({ children, style }: AlertDialogTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export function AlertDialogDescription({ children, style }: AlertDialogDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>
}

interface AlertDialogActionProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

export function AlertDialogAction({ children, onPress, style }: AlertDialogActionProps) {
  const { setOpen } = React.useContext(AlertDialogContext)
  const buttonStyles = buttonVariants({ variant: "default", size: "default" })

  return (
    <TouchableOpacity
      style={[buttonStyles.container, style]}
      onPress={() => {
        onPress?.()
        setOpen(false)
      }}
      activeOpacity={0.7}
    >
      <Text style={buttonStyles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

interface AlertDialogCancelProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

export function AlertDialogCancel({ children, onPress, style }: AlertDialogCancelProps) {
  const { setOpen } = React.useContext(AlertDialogContext)
  const buttonStyles = buttonVariants({ variant: "outline", size: "default" })

  return (
    <TouchableOpacity
      style={[buttonStyles.container, style]}
      onPress={() => {
        onPress?.()
        setOpen(false)
      }}
      activeOpacity={0.7}
    >
      <Text style={buttonStyles.text}>{children}</Text>
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
