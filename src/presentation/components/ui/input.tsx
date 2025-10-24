import { TextInput, StyleSheet, type TextInputProps, type ViewStyle } from "react-native"

interface InputProps extends TextInputProps {
  style?: ViewStyle
}

function Input({ style, ...props }: InputProps) {
  return <TextInput style={[styles.input, style]} placeholderTextColor="#9CA3AF" {...props} />
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
})

export { Input }
