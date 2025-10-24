import { TextInput, StyleSheet, type TextInputProps } from "react-native"

interface TextareaProps extends TextInputProps {
  style?: any
}

function Textarea({ style, ...props }: TextareaProps) {
  return (
    <TextInput multiline numberOfLines={4} style={[styles.textarea, style]} placeholderTextColor="#9ca3af" {...props} />
  )
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    textAlignVertical: "top",
  },
})

export { Textarea }
