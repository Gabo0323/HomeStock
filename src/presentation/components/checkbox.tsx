import { TouchableOpacity, StyleSheet, type ViewProps } from "react-native"
import { Check } from "lucide-react-native"

interface CheckboxProps extends Omit<ViewProps, "children"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

function Checkbox({ checked = false, onCheckedChange, disabled = false, style, ...props }: CheckboxProps) {
  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked)
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.checkbox, checked && styles.checked, disabled && styles.disabled, style]}
      {...props}
    >
      {checked && <Check size={14} color="#ffffff" strokeWidth={3} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#18181b",
    borderColor: "#18181b",
  },
  disabled: {
    opacity: 0.5,
  },
})

export { Checkbox }
