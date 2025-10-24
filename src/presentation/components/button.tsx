import type * as React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle, ActivityIndicator } from "react-native"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  loading?: boolean
}

export const buttonVariants = (props?: { variant?: ButtonVariant; size?: ButtonSize }) => {
  const variant = props?.variant || "default"
  const size = props?.size || "default"

  return {
    container: [styles.base, styles[`variant_${variant}`], styles[`size_${size}`]],
    text: [styles.text, styles[`text_${variant}`], styles[`textSize_${size}`]],
  }
}

function Button({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  onPress,
  style,
  textStyle,
  loading = false,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ]

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ]

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={variant === "default" ? "#FFFFFF" : "#111827"} />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  variant_default: {
    backgroundColor: "#111827",
  },
  variant_destructive: {
    backgroundColor: "#AC2C2F",
  },
  variant_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  variant_secondary: {
    backgroundColor: "#F3F4F6",
  },
  variant_ghost: {
    backgroundColor: "transparent",
  },
  variant_link: {
    backgroundColor: "transparent",
  },
  size_default: {
    height: 44,
    paddingHorizontal: 16,
  },
  size_sm: {
    height: 36,
    paddingHorizontal: 12,
  },
  size_lg: {
    height: 52,
    paddingHorizontal: 24,
  },
  size_icon: {
    width: 44,
    height: 44,
    paddingHorizontal: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  text_default: {
    color: "#FFFFFF",
  },
  text_destructive: {
    color: "#FFFFFF",
  },
  text_outline: {
    color: "#111827",
  },
  text_secondary: {
    color: "#111827",
  },
  text_ghost: {
    color: "#111827",
  },
  text_link: {
    color: "#111827",
    textDecorationLine: "underline",
  },
  textSize_default: {
    fontSize: 14,
  },
  textSize_sm: {
    fontSize: 12,
  },
  textSize_lg: {
    fontSize: 16,
  },
  textSize_icon: {
    fontSize: 14,
  },
  textDisabled: {
    opacity: 0.5,
  },
})

export { Button }
