"use client"

import * as React from "react"
import { View, StyleSheet, PanResponder } from "react-native"

interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  style?: any
}

function Slider({
  value: controlledValue,
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  style,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue[0])
  const value = controlledValue ? controlledValue[0] : internalValue
  const sliderWidth = React.useRef(0)

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateValue(evt.nativeEvent.locationX)
      },
      onPanResponderMove: (evt) => {
        updateValue(evt.nativeEvent.locationX)
      },
    }),
  ).current

  const updateValue = (x: number) => {
    const percentage = Math.max(0, Math.min(1, x / sliderWidth.current))
    const rawValue = min + percentage * (max - min)
    const steppedValue = Math.round(rawValue / step) * step
    const clampedValue = Math.max(min, Math.min(max, steppedValue))

    if (onValueChange) {
      onValueChange([clampedValue])
    } else {
      setInternalValue(clampedValue)
    }
  }

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => {
        sliderWidth.current = e.nativeEvent.layout.width
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.track}>
        <View style={[styles.range, { width: `${percentage}%` }]} />
      </View>
      <View style={[styles.thumb, { left: `${percentage}%` }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
  track: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    overflow: "hidden",
  },
  range: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#3b82f6",
    marginLeft: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
})

export { Slider }
