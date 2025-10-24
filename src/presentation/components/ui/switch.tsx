"use client"
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from "react-native"

interface SwitchProps extends RNSwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Switch({ checked = false, onCheckedChange, disabled = false, ...props }: SwitchProps) {
  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: "#e4e4e7", true: "#18181b" }}
      thumbColor="#ffffff"
      ios_backgroundColor="#e4e4e7"
      {...props}
    />
  )
}

export { Switch }
