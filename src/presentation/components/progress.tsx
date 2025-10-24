"use client"

import * as React from "react"
import { View, StyleSheet, Animated } from "react-native"

interface ProgressProps {
  value?: number
  style?: any
}

function Progress({ value = 0, style }: ProgressProps) {
  const animatedValue = React.useRef(new Animated.Value(value)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [value, animatedValue])

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  })

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.indicator, { width }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: "100%",
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderRadius: 9999,
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
})

export { Progress }
