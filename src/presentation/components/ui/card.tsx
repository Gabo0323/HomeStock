import type * as React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"

interface CardProps {
  children?: React.ReactNode
  style?: ViewStyle
}

function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>
}

function CardHeader({ children, style }: CardProps) {
  return <View style={[styles.cardHeader, style]}>{children}</View>
}

function CardTitle({ children, style }: { children?: React.ReactNode; style?: TextStyle }) {
  return <Text style={[styles.cardTitle, style]}>{children}</Text>
}

function CardDescription({ children, style }: { children?: React.ReactNode; style?: TextStyle }) {
  return <Text style={[styles.cardDescription, style]}>{children}</Text>
}

function CardContent({ children, style }: CardProps) {
  return <View style={[styles.cardContent, style]}>{children}</View>
}

function CardFooter({ children, style }: CardProps) {
  return <View style={[styles.cardFooter, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  cardContent: {
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
