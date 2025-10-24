import type * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu@1.2.5"
import { cva } from "class-variance-authority@0.7.1"
import { ChevronDownIcon } from "lucide-react@0.487.0"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

import { cn } from "./utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}

interface NavigationMenuProps {
  children: React.ReactNode
  style?: any
}

interface NavigationMenuListProps {
  children: React.ReactNode
}

interface NavigationMenuItemProps {
  children: React.ReactNode
}

interface NavigationMenuTriggerProps {
  children: React.ReactNode
  onPress?: () => void
}

interface NavigationMenuContentProps {
  children: React.ReactNode
}

interface NavigationMenuLinkProps {
  children: React.ReactNode
  onPress?: () => void
  active?: boolean
}

export function NavigationMenuNative({ children, style }: NavigationMenuProps) {
  return <View style={[styles.container, style]}>{children}</View>
}

export function NavigationMenuListNative({ children }: NavigationMenuListProps) {
  return <View style={styles.list}>{children}</View>
}

export function NavigationMenuItemNative({ children }: NavigationMenuItemProps) {
  return <View style={styles.item}>{children}</View>
}

export function NavigationMenuTriggerNative({ children, onPress }: NavigationMenuTriggerProps) {
  return (
    <TouchableOpacity style={styles.trigger} onPress={onPress}>
      <Text style={styles.triggerText}>{children}</Text>
    </TouchableOpacity>
  )
}

export function NavigationMenuContentNative({ children }: NavigationMenuContentProps) {
  return <View style={styles.content}>{children}</View>
}

export function NavigationMenuLinkNative({ children, onPress, active }: NavigationMenuLinkProps) {
  return (
    <TouchableOpacity style={[styles.link, active && styles.linkActive]} onPress={onPress}>
      <Text style={[styles.linkText, active && styles.linkTextActive]}>{children}</Text>
    </TouchableOpacity>
  )
}

export function NavigationMenuIndicatorNative() {
  return <View style={styles.indicator} />
}

export function NavigationMenuViewportNative({ children }: { children: React.ReactNode }) {
  return <View style={styles.viewport}>{children}</View>
}

export const navigationMenuTriggerStyleNative = {}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    gap: 4,
  },
  item: {
    position: "relative",
  },
  trigger: {
    padding: 8,
    borderRadius: 4,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  link: {
    padding: 8,
    borderRadius: 4,
  },
  linkActive: {
    backgroundColor: "#f0f0f0",
  },
  linkText: {
    fontSize: 14,
  },
  linkTextActive: {
    fontWeight: "600",
  },
  indicator: {
    height: 2,
    backgroundColor: "#007AFF",
    position: "absolute",
    bottom: 0,
  },
  viewport: {
    overflow: "hidden",
  },
})
