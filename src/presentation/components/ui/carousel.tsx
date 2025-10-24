"use client"

import * as React from "react"
import { View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

type CarouselApi = any
type CarouselProps = {
  children: React.ReactNode
  style?: any
}

type CarouselContentProps = {
  children: React.ReactNode
}

type CarouselItemProps = {
  children: React.ReactNode
  style?: any
}

type CarouselContextProps = {
  scrollViewRef: React.RefObject<ScrollView>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

export function Carousel({ children, style }: CarouselProps) {
  return <View style={[styles.container, style]}>{children}</View>
}

export function CarouselContent({ children }: CarouselContentProps) {
  const scrollViewRef = React.useRef<ScrollView>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true })
  }, [])

  const scrollNext = React.useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: true })
  }, [])

  const handleScroll = React.useCallback((event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x
    const canScrollPrev = contentOffset > 0
    const canScrollNext = contentOffset < SCREEN_WIDTH * 2
    setCanScrollPrev(canScrollPrev)
    setCanScrollNext(canScrollNext)
  }, [])

  return (
    <CarouselContext.Provider
      value={{
        scrollViewRef,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={handleScroll}
      >
        {children}
      </ScrollView>
    </CarouselContext.Provider>
  )
}

export function CarouselItem({ children, style }: CarouselItemProps) {
  return <View style={[styles.item, { width: SCREEN_WIDTH }, style]}>{children}</View>
}

export function CarouselPrevious({ onPress }: { onPress?: () => void }) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <TouchableOpacity
      style={[styles.button, styles.prevButton]}
      onPress={onPress || scrollPrev}
      disabled={!canScrollPrev}
    >
      <Text style={styles.buttonText}>{"<"}</Text>
    </TouchableOpacity>
  )
}

export function CarouselNext({ onPress }: { onPress?: () => void }) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <TouchableOpacity
      style={[styles.button, styles.nextButton]}
      onPress={onPress || scrollNext}
      disabled={!canScrollNext}
    >
      <Text style={styles.buttonText}>{">"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: "50%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
