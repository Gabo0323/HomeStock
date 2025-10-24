"use client"

import * as React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

interface RadioGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({})

interface RadioGroupProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  style?: any
}

function RadioGroup({ children, value, onValueChange, style }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View style={[styles.group, style]}>{children}</View>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps {
  value: string
  style?: any
}

function RadioGroupItem({ value, style }: RadioGroupItemProps) {
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext)
  const isSelected = selectedValue === value

  return (
    <TouchableOpacity style={[styles.item, style]} onPress={() => onValueChange?.(value)}>
      <View style={styles.outer}>{isSelected && <View style={styles.inner} />}</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  group: {
    gap: 12,
  },
  item: {
    width: 20,
    height: 20,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3b82f6",
  },
})

export { RadioGroup, RadioGroupItem }
