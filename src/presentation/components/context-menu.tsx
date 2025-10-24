"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu@2.2.6"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0"
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"

import { cn } from "./utils"

interface ContextMenuProps {
  children: React.ReactNode
}

interface ContextMenuTriggerProps {
  children: React.ReactNode
  onLongPress?: () => void
}

interface ContextMenuContentProps {
  children: React.ReactNode
}

interface ContextMenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

const ContextMenuContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

export function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false)

  return <ContextMenuContext.Provider value={{ open, setOpen }}>{children}</ContextMenuContext.Provider>
}

export function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {
  const context = React.useContext(ContextMenuContext)

  return <TouchableOpacity onLongPress={() => context?.setOpen(true)}>{children}</TouchableOpacity>
}

export function ContextMenuContent({ children }: ContextMenuContentProps) {
  const context = React.useContext(ContextMenuContext)

  return (
    <Modal visible={context?.open} transparent animationType="fade" onRequestClose={() => context?.setOpen(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => context?.setOpen(false)}>
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Modal>
  )
}

export function ContextMenuItem({ children, onSelect, disabled }: ContextMenuItemProps) {
  const context = React.useContext(ContextMenuContext)

  return (
    <TouchableOpacity
      style={[styles.item, disabled && styles.itemDisabled]}
      onPress={() => {
        onSelect?.()
        context?.setOpen(false)
      }}
      disabled={disabled}
    >
      <Text style={[styles.itemText, disabled && styles.itemTextDisabled]}>{children}</Text>
    </TouchableOpacity>
  )
}

export function ContextMenuSeparator() {
  return <View style={styles.separator} />
}

export function ContextMenuLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>
}

export const ContextMenuGroup = View
export const ContextMenuSub = View
export const ContextMenuSubTrigger = TouchableOpacity
export const ContextMenuSubContent = View
export const ContextMenuCheckboxItem = TouchableOpacity
export const ContextMenuRadioItem = TouchableOpacity
export const ContextMenuRadioGroup = View
export const ContextMenuShortcut = Text
export const ContextMenuPortal = View

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: 12,
    borderRadius: 4,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
  },
  itemTextDisabled: {
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    padding: 8,
    color: "#666",
  },
})

function WebContextMenu({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function WebContextMenuTrigger({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
}

function WebContextMenuGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

function WebContextMenuPortal({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
}

function WebContextMenuSub({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function WebContextMenuRadioGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
}

function WebContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function WebContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  )
}

function WebContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function WebContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function WebContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function WebContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function WebContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn("text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)}
      {...props}
    />
  )
}

function WebContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function WebContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  )
}

export {
  ContextMenu as WebContextMenu,
  ContextMenuTrigger as WebContextMenuTrigger,
  ContextMenuContent as WebContextMenuContent,
  ContextMenuItem as WebContextMenuItem,
  ContextMenuCheckboxItem as WebContextMenuCheckboxItem,
  ContextMenuRadioItem as WebContextMenuRadioItem,
  ContextMenuLabel as WebContextMenuLabel,
  ContextMenuSeparator as WebContextMenuSeparator,
  WebContextMenuShortcut,
  WebContextMenuGroup,
  WebContextMenuPortal,
  WebContextMenuSub,
  WebContextMenuSubContent,
  WebContextMenuSubTrigger,
  WebContextMenuRadioGroup,
}
