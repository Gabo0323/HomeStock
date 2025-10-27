"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { productComparisons } from "../../lib/mockData"

const logoImage = require("../assets/70b756a756bbc6dd6b4d1437c0a2812790a64904.png")

export function ComparisonScreen() {
  const [selectedProduct, setSelectedProduct] = useState(productComparisons[0].productName)

  const currentComparison = productComparisons.find((p) => p.productName === selectedProduct)
  const sortedStores = currentComparison ? [...currentComparison.stores].sort((a, b) => a.price - b.price) : []
  const bestPrice = sortedStores[0]

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image source={logoImage} style={styles.logo} />
          <Text style={styles.headerTitle}>Comparación</Text>
        </View>

        {/* Product Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productScroll}
          contentContainerStyle={styles.productContent}
        >
          {productComparisons.map((product) => (
            <TouchableOpacity
              key={product.productName}
              onPress={() => setSelectedProduct(product.productName)}
              style={[styles.productButton, selectedProduct === product.productName && styles.productButtonActive]}
            >
              <Text
                style={[
                  styles.productButtonText,
                  selectedProduct === product.productName && styles.productButtonTextActive,
                ]}
              >
                {product.productName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Comparison Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Best Price Alert */}
        {bestPrice && (
          <View style={styles.bestPriceCard}>
            <View style={styles.bestPriceHeader}>
              <Feather name="trending-down" size={20} color="#16A34A" />
              <Text style={styles.bestPriceTitle}>Mejor Precio</Text>
            </View>
            <Text style={styles.bestPriceText}>
              {bestPrice.name} - ₡{bestPrice.price.toLocaleString()}
            </Text>
          </View>
        )}

        {/* Price Comparison Cards */}
        {sortedStores.map((store, index) => {
          const savings = index > 0 ? store.price - bestPrice.price : 0

          return (
            <View key={store.name} style={[styles.storeCard, index === 0 && styles.storeCardBest]}>
              <View style={styles.storeHeader}>
                <View>
                  <Text style={styles.storeName}>{store.name}</Text>
                  {index === 0 && <Text style={styles.bestLabel}>Mejor opción</Text>}
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.storePrice}>₡{store.price.toLocaleString()}</Text>
                  {savings > 0 && <Text style={styles.savingsText}>+₡{savings.toLocaleString()}</Text>}
                </View>
              </View>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Feather
                      key={star}
                      name="star"
                      size={16}
                      color={star <= store.rating ? "#FBBF24" : "#E5E7EB"}
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>{store.rating.toFixed(1)}</Text>
              </View>

              {/* Distance info */}
              <View style={styles.distanceContainer}>
                <Text style={styles.distanceLabel}>Distancia aproximada</Text>
                <Text style={styles.distanceValue}>{(Math.random() * 5 + 0.5).toFixed(1)} km</Text>
              </View>
            </View>
          )
        })}

        {/* Tips */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Consejo</Text>
          <Text style={styles.tipText}>
            Considera la distancia y el costo del transporte al elegir dónde comprar. A veces un precio ligeramente más
            alto en una tienda cercana puede ser más conveniente.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  logo: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  productScroll: {
    marginHorizontal: -24,
  },
  productContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  productButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  productButtonActive: {
    backgroundColor: "#AC2C2F",
    borderColor: "#AC2C2F",
  },
  productButtonText: {
    fontSize: 14,
    color: "#111827",
  },
  productButtonTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  bestPriceCard: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 16,
    padding: 16,
  },
  bestPriceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  bestPriceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#166534",
  },
  bestPriceText: {
    fontSize: 14,
    color: "#15803D",
  },
  storeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  storeCardBest: {
    borderWidth: 2,
    borderColor: "#22C55E",
  },
  storeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  bestLabel: {
    fontSize: 12,
    color: "#16A34A",
    marginTop: 2,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  storePrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  savingsText: {
    fontSize: 12,
    color: "#DC2626",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stars: {
    flexDirection: "row",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  distanceLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  distanceValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  tipCard: {
    backgroundColor: "#DBEAFE",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 16,
    padding: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: "#1E3A8A",
    lineHeight: 18,
  },
})
