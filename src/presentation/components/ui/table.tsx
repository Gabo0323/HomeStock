import type * as React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"

function Table({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <ScrollView horizontal style={styles.container}>
      <View style={[styles.table, style]}>{children}</View>
    </ScrollView>
  )
}

function TableHeader({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.header, style]}>{children}</View>
}

function TableBody({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.body, style]}>{children}</View>
}

function TableFooter({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.footer, style]}>{children}</View>
}

function TableRow({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.row, style]}>{children}</View>
}

function TableHead({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View style={[styles.head, style]}>
      <Text style={styles.headText}>{children}</Text>
    </View>
  )
}

function TableCell({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View style={[styles.cell, style]}>
      <Text style={styles.cellText}>{children}</Text>
    </View>
  )
}

function TableCaption({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View style={[styles.caption, style]}>
      <Text style={styles.captionText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  table: {
    minWidth: "100%",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  body: {},
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "rgba(249, 250, 251, 0.5)",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  head: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flex: 1,
  },
  headText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flex: 1,
  },
  cellText: {
    fontSize: 14,
    color: "#000",
  },
  caption: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  captionText: {
    fontSize: 12,
    color: "#6b7280",
  },
})

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
