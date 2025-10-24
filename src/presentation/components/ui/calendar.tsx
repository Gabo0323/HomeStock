"use client"

import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  mode?: "single" | "range"
  style?: any
}

export function Calendar({ selected, onSelect, mode = "single", style }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
        >
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
        >
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {days.map((day, index) => {
          const isSelected = selected && day.toDateString() === selected.toDateString()
          return (
            <TouchableOpacity
              key={index}
              style={[styles.day, isSelected && styles.selectedDay]}
              onPress={() => onSelect?.(day)}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day.getDate()}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    fontSize: 18,
    padding: 8,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  selectedDay: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  dayText: {
    fontSize: 14,
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "600",
  },
})
