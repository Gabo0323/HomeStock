import { View, StyleSheet } from "react-native"

interface ToasterProps {
  position?: "top" | "bottom"
}

export function Toaster({ position = "bottom" }: ToasterProps) {
  return <View style={[styles.container, position === "top" ? styles.containerTop : styles.containerBottom]} />
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  containerTop: {
    top: 50,
  },
  containerBottom: {
    bottom: 50,
  },
})
