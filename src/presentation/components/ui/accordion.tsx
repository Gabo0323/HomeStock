"use client"

import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated, LayoutAnimation, Platform, UIManager } from "react-native"

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface AccordionContextValue {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const AccordionContext = React.createContext<AccordionContextValue>({})

interface AccordionProps {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
}

export function Accordion({ type = "single", value, onValueChange, children }: AccordionProps) {
  return (
    <AccordionContext.Provider value={{ type, value, onValueChange }}>
      <View style={styles.accordion}>{children}</View>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const context = React.useContext(AccordionContext)

  React.useEffect(() => {
    if (context.type === "single") {
      setIsOpen(context.value === value)
    } else if (context.type === "multiple" && Array.isArray(context.value)) {
      setIsOpen(context.value.includes(value))
    }
  }, [context.value, value, context.type])

  return (
    <View style={styles.accordionItem}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, value })
        }
        return child
      })}
    </View>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  isOpen?: boolean
  value?: string
}

export function AccordionTrigger({ children, isOpen, value }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext)
  const rotation = React.useRef(new Animated.Value(isOpen ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isOpen, rotation])

  const handlePress = () => {
    if (!value || !context.onValueChange) return

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    if (context.type === "single") {
      context.onValueChange(isOpen ? "" : value)
    } else if (context.type === "multiple") {
      const currentValue = Array.isArray(context.value) ? context.value : []
      const newValue = isOpen ? currentValue.filter((v) => v !== value) : [...currentValue, value]
      context.onValueChange(newValue)
    }
  }

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  return (
    <TouchableOpacity style={styles.accordionTrigger} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.accordionTriggerText}>{children}</Text>
      <Animated.Text style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}>▼</Animated.Text>
    </TouchableOpacity>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  isOpen?: boolean
}

export function AccordionContent({ children, isOpen }: AccordionContentProps) {
  if (!isOpen) return null

  return (
    <View style={styles.accordionContent}>
      <Text style={styles.accordionContentText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  accordion: {
    width: "100%",
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  accordionTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  accordionTriggerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 16,
  },
  accordionContent: {
    paddingBottom: 16,
  },
  accordionContentText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
})
