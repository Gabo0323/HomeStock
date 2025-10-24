"use client"

import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue>({
  value: "",
  onValueChange: () => {},
})

interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  style?: ViewStyle
}

export function Tabs({ value: controlledValue, defaultValue, onValueChange, children, style }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const handleValueChange = onValueChange || setInternalValue

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View style={[styles.tabs, style]}>{children}</View>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function TabsList({ children, style }: TabsListProps) {
  return <View style={[styles.tabsList, style]}>{children}</View>
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  style?: ViewStyle
}

export function TabsTrigger({ value, children, style }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isActive = selectedValue === value

  return (
    <TouchableOpacity
      style={[styles.tabsTrigger, isActive && styles.tabsTriggerActive, style]}
      onPress={() => onValueChange(value)}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabsTriggerText, isActive && styles.tabsTriggerTextActive]}>{children}</Text>
    </TouchableOpacity>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  style?: ViewStyle
}

export function TabsContent({ value, children, style }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext)

  if (selectedValue !== value) return null

  return <View style={[styles.tabsContent, style]}>{children}</View>
}

const styles = StyleSheet.create({
  tabs: {
    gap: 8,
  },
  tabsList: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 3,
    height: 36,
  },
  tabsTrigger: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "transparent",
  },
  tabsTriggerActive: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  tabsTriggerTextActive: {
    color: "#111827",
  },
  tabsContent: {
    flex: 1,
  },
})
