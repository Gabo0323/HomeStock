import type * as React from "react"
import { View, Image, Text, StyleSheet, type ImageProps, type ViewProps, type TextProps } from "react-native"

interface AvatarProps extends ViewProps {
  size?: number
}

function Avatar({ size = 40, style, children, ...props }: AvatarProps) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }, style]} {...props}>
      {children}
    </View>
  )
}

interface AvatarImageProps extends ImageProps {
  source: ImageProps["source"]
}

function AvatarImage({ style, ...props }: AvatarImageProps) {
  return <Image style={[styles.image, style]} {...props} />
}

interface AvatarFallbackProps extends TextProps {
  children: React.ReactNode
}

function AvatarFallback({ style, children, ...props }: AvatarFallbackProps) {
  return (
    <View style={styles.fallback}>
      <Text style={[styles.fallbackText, style]} {...props}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f4f4f5",
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#71717a",
  },
})

export { Avatar, AvatarImage, AvatarFallback }
