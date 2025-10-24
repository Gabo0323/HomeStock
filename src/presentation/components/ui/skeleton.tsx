"use client"

import * as React from "react"
import { StyleSheet, Animated } from "react-native"

interface SkeletonProps {
  style?: any
}

function Skeleton({ style }: SkeletonProps) {
  const opacity = React.useRef(new Animated.Value(1)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [opacity])

  return <Animated.View style={[styles.skeleton, { opacity }, style]} />
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
})

export { Skeleton }
