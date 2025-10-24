import type * as React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

function Badge({ variant = "default", children, style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  default: {
    backgroundColor: "#18181b",
    borderColor: "transparent",
  },
  defaultText: {
    color: "#fafafa",
  },
  secondary: {
    backgroundColor: "#f4f4f5",
    borderColor: "transparent",
  },
  secondaryText: {
    color: "#18181b",
  },
  destructive: {
    backgroundColor: "#ef4444",
    borderColor: "transparent",
  },
  destructiveText: {
    color: "#ffffff",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#e4e4e7",
  },
  outlineText: {
    color: "#18181b",
  },
})

// Export badgeVariants for compatibility
export const badgeVariants = (variant: BadgeVariant = "default") => {
  return {
    container: styles[variant],
    text: styles[`${variant}Text`],
  }
}

export { Badge }
