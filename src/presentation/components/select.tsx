"use client"

import * as React from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native"

interface SelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
})

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

function Select({ children, value, onValueChange, defaultValue }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)

  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue)
      } else {
        setInternalValue(newValue)
      }
      setOpen(false)
    },
    [onValueChange],
  )

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}>
      {children}
    </SelectContext.Provider>
  )
}

function SelectTrigger({ children, style }: { children: React.ReactNode; style?: any }) {
  const { setOpen } = React.useContext(SelectContext)

  return (
    <TouchableOpacity style={[styles.trigger, style]} onPress={() => setOpen(true)}>
      {children}
      <Text style={styles.chevron}>▼</Text>
    </TouchableOpacity>
  )
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext)

  return <Text style={[styles.value, !value && styles.placeholder]}>{value || placeholder}</Text>
}

function SelectContent({ children, style }: { children: React.ReactNode; style?: any }) {
  const { open, setOpen } = React.useContext(SelectContext)

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
        <View style={[styles.content, style]}>
          <ScrollView>{children}</ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

function SelectItem({
  children,
  value,
  style,
}: {
  children: React.ReactNode
  value: string
  style?: any
}) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemSelected, style]}
      onPress={() => onValueChange?.(value)}
    >
      <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>{children}</Text>
      {isSelected && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  )
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>
}

function SelectLabel({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View style={[styles.label, style]}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
  },
  value: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  placeholder: {
    color: "#9ca3af",
  },
  chevron: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    minWidth: 200,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  itemSelected: {
    backgroundColor: "#f3f4f6",
  },
  itemText: {
    fontSize: 14,
    color: "#000",
  },
  itemTextSelected: {
    fontWeight: "600",
  },
  checkmark: {
    fontSize: 16,
    color: "#3b82f6",
    marginLeft: 8,
  },
  label: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
})

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel }
