"use client"

import * as React from "react"
import { View, Text, Modal, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface DrawerContentProps {
  children: React.ReactNode
}

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange?.(false)}>
      {children}
    </Modal>
  )
}

export function DrawerTrigger({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
}

export function DrawerContent({ children }: DrawerContentProps) {
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.content, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </View>
  )
}

export function DrawerHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>
}

export function DrawerTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>
}

export function DrawerDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>
}

export function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>
}

export function DrawerClose({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
}

export const DrawerPortal = View
export const DrawerOverlay = View

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.8,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    flexDirection: "row",
    gap: 8,
  },
})
