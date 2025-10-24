"use client"

import * as React from "react"
import { View, TextInput, StyleSheet } from "react-native"

interface InputOTPProps {
  length?: number
  value?: string
  onChangeText?: (text: string) => void
  style?: any
}

interface InputOTPSlotProps {
  index: number
  value: string
  isActive: boolean
}

export function InputOTP({ length = 6, value = "", onChangeText, style }: InputOTPProps) {
  const [focusedIndex, setFocusedIndex] = React.useState(0)
  const inputRefs = React.useRef<TextInput[]>([])

  const handleChange = (text: string, index: number) => {
    const newValue = value.split("")
    newValue[index] = text
    onChangeText?.(newValue.join(""))

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref
          }}
          style={[styles.input, focusedIndex === index && styles.inputFocused]}
          maxLength={1}
          keyboardType="number-pad"
          value={value[index] || ""}
          onChangeText={(text) => handleChange(text, index)}
          onFocus={() => setFocusedIndex(index)}
        />
      ))}
    </View>
  )
}

export function InputOTPGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.group}>{children}</View>
}

export function InputOTPSlot({ index, value, isActive }: InputOTPSlotProps) {
  return (
    <View style={[styles.slot, isActive && styles.slotActive]}>
      <TextInput style={styles.slotInput} value={value} maxLength={1} editable={false} />
    </View>
  )
}

export function InputOTPSeparator() {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  group: {
    flexDirection: "row",
    gap: 4,
  },
  input: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  inputFocused: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  slot: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  slotActive: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  slotInput: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  separator: {
    width: 8,
  },
})
