"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts@2.15.2"
import { View, Text, StyleSheet } from "react-native"

import { cn } from "./utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: string
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

export function ChartContainer({ config, children, style }: any) {
  return <View style={[styles.container, style]}>{children}</View>
}

function ChartContainerWeb({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

export function ChartTooltip({ children }: { children?: React.ReactNode }) {
  return <View style={styles.tooltip}>{children}</View>
}

export function ChartTooltipContent({ active, payload }: any) {
  if (!active || !payload) return null

  return (
    <View style={styles.tooltipContent}>
      {payload.map((item: any, index: number) => (
        <Text key={index} style={styles.tooltipText}>
          {item.name}: {item.value}
        </Text>
      ))}
    </View>
  )
}

export function ChartLegend({ children }: { children?: React.ReactNode }) {
  return <View style={styles.legend}>{children}</View>
}

export function ChartLegendContent({ payload }: any) {
  return (
    <View style={styles.legendContent}>
      {payload?.map((item: any, index: number) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.value}</Text>
        </View>
      ))}
    </View>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tooltip: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipContent: {
    gap: 4,
  },
  tooltipText: {
    fontSize: 12,
  },
  legend: {
    marginTop: 16,
  },
  legendContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
  },
})

export { ChartContainerWeb, ChartStyle }
