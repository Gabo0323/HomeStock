"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { type Product, CATEGORIES } from "../../lib/types"

const logoImage = require("../assets/70b756a756bbc6dd6b4d1437c0a2812790a64904.png")

interface InventoryScreenProps {
  products: Product[]
  onNavigate: (screen: string) => void
  onProductClick: (product: Product) => void
  onBack: () => void
}

export function InventoryScreen({ products, onNavigate, onProductClick, onBack }: InventoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "#D1FAE5"
      case "warning":
        return "#FEF3C7"
      case "low":
        return "#FED7AA"
      case "expired":
        return "#FEE2E2"
      default:
        return "#F3F4F6"
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "good":
        return "#047857"
      case "warning":
        return "#A16207"
      case "low":
        return "#C2410C"
      case "expired":
        return "#B91C1C"
      default:
        return "#374151"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "good":
        return "Disponible"
      case "warning":
        return "Por vencer"
      case "low":
        return "Stock bajo"
      case "expired":
        return "Vencido"
      default:
        return ""
    }
  }

  return (
    
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerTitle}>Inventario</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => onNavigate("add-product")}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
    
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
            >
              <Text
                style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextActive]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <ScrollView style={styles.productList} contentContainerStyle={styles.productListContent}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No se encontraron productos</Text>
          </View>
        ) : (
          filteredProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard} onPress={() => onProductClick(product)}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productMeta}>
                  {product.brand} • {product.store}
                </Text>
                <View style={styles.productFooter}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
                    <Text style={[styles.statusText, { color: getStatusTextColor(product.status) }]}>
                      {getStatusText(product.status)}
                    </Text>
                  </View>
                  <Text style={styles.productQuantity}>
                    {product.quantity} {product.unit}
                  </Text>
                </View>
              </View>
              <View style={styles.productRight}>
                <Text style={styles.productPrice}>₡{product.price.toLocaleString()}</Text>
                <Text style={styles.productExpiry}>
                  Vence: {new Date(product.expirationDate).toLocaleDateString("es-CR")}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  addButton: {
    backgroundColor: "#AC2C2F",
    padding: 8,
    borderRadius: 12,
  },
  backButton: {
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: "#111827",
  },
  categoryScroll: {
    marginHorizontal: -24,
  },
  categoryContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: "#AC2C2F",
    borderColor: "#AC2C2F",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#111827",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
  },
  productList: {
    flex: 1,
  },
  productListContent: {
    padding: 16,
    gap: 12,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productMeta: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  productQuantity: {
    fontSize: 12,
    color: "#111827",
  },
  productRight: {
    alignItems: "flex-end",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  productExpiry: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },
})
