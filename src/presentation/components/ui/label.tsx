import { Text, StyleSheet, type TextProps } from "react-native"

interface LabelProps extends TextProps {
  disabled?: boolean
}

function Label({ style, disabled, ...props }: LabelProps) {
  return <Text style={[styles.label, disabled && styles.disabled, style]} {...props} />
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#09090b",
  },
  disabled: {
    opacity: 0.5,
  },
})

export { Label }
