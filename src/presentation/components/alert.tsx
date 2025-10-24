import type * as React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"

type AlertVariant = "default" | "destructive"

interface AlertProps {
  variant?: AlertVariant
  children: React.ReactNode
  style?: ViewStyle
}

export function Alert({ variant = "default", children, style }: AlertProps) {
  return <View style={[styles.alert, variant === "destructive" && styles.alertDestructive, style]}>{children}</View>
}

interface AlertTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  return <Text style={[styles.alertTitle, style]}>{children}</Text>
}

interface AlertDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  return <Text style={[styles.alertDescription, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  alert: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    gap: 4,
  },
  alertDestructive: {
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    lineHeight: 16,
  },
  alertDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
})
