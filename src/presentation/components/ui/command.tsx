import type * as React from "react"
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet } from "react-native"

interface CommandProps {
  children: React.ReactNode
  style?: any
}

interface CommandInputProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}

interface CommandListProps {
  children: React.ReactNode
}

interface CommandItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Command({ children, style }: CommandProps) {
  return <View style={[styles.container, style]}>{children}</View>
}

export function CommandDialog({ open, onOpenChange, children }: CommandDialogProps) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange?.(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  )
}

export function CommandInput({ placeholder, value, onChangeText }: CommandInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  )
}

export function CommandList({ children }: CommandListProps) {
  return <View style={styles.list}>{children}</View>
}

export function CommandEmpty() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No results found.</Text>
    </View>
  )
}

export function CommandGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.group}>{children}</View>
}

export function CommandItem({ children, onSelect, disabled }: CommandItemProps) {
  return (
    <TouchableOpacity style={[styles.item, disabled && styles.itemDisabled]} onPress={onSelect} disabled={disabled}>
      <Text style={[styles.itemText, disabled && styles.itemTextDisabled]}>{children}</Text>
    </TouchableOpacity>
  )
}

export function CommandSeparator() {
  return <View style={styles.separator} />
}

export function CommandShortcut({ children }: { children: React.ReactNode }) {
  return <Text style={styles.shortcut}>{children}</Text>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    padding: 12,
  },
  input: {
    fontSize: 16,
    padding: 8,
  },
  list: {
    maxHeight: 300,
  },
  empty: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  group: {
    padding: 4,
  },
  item: {
    padding: 12,
    borderRadius: 4,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
  },
  itemTextDisabled: {
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 4,
  },
  shortcut: {
    fontSize: 12,
    color: "#999",
    marginLeft: "auto",
  },
})
