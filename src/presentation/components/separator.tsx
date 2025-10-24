import { View, StyleSheet, type ViewProps } from "react-native"

interface SeparatorProps extends ViewProps {
  orientation?: "horizontal" | "vertical"
}

function Separator({ orientation = "horizontal", style, ...props }: SeparatorProps) {
  return (
    <View
      style={[styles.separator, orientation === "horizontal" ? styles.horizontal : styles.vertical, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#e4e4e7",
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    width: 1,
    height: "100%",
  },
})

export { Separator }
