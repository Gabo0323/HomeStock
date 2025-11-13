"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import type { ShoppingList } from "../../lib/types"

const logoImage = require("../assets/70b756a756bbc6dd6b4d1437c0a2812790a64904.png")

interface ShoppingListScreenProps {
  shoppingLists: ShoppingList[]
  onUpdateLists: (lists: ShoppingList[]) => void
}

export function ShoppingListScreen({ shoppingLists, onUpdateLists }: ShoppingListScreenProps) {
  const [selectedList, setSelectedList] = useState<string | null>(shoppingLists.length > 0 ? shoppingLists[0].id : null)

  const currentList = shoppingLists.find((list) => list.id === selectedList)

  const handleToggleItem = (listId: string, itemId: string) => {
    const updatedLists = shoppingLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)),
        }
      }
      return list
    })
    onUpdateLists(updatedLists)
  }

  const handleDeleteItem = (listId: string, itemId: string) => {
    const updatedLists = shoppingLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter((item) => item.id !== itemId),
        }
      }
      return list
    })
    onUpdateLists(updatedLists)
  }

  const handleCreateList = () => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: `Nueva Lista ${shoppingLists.length + 1}`,
      createdAt: new Date().toISOString().split("T")[0],
      items: [],
    }
    onUpdateLists([...shoppingLists, newList])
    setSelectedList(newList.id)
  }

  const groupedItems = currentList?.items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof currentList.items>,
  )

  const progress = currentList
    ? (currentList.items.filter((item) => item.checked).length / currentList.items.length) * 100
    : 0

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerTitle}>Lista de Compra</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleCreateList}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* List Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
          contentContainerStyle={styles.tabContent}
        >
          {shoppingLists.map((list) => (
            <TouchableOpacity
              key={list.id}
              onPress={() => setSelectedList(list.id)}
              style={[styles.tabButton, selectedList === list.id && styles.tabButtonActive]}
            >
              <Text style={[styles.tabButtonText, selectedList === list.id && styles.tabButtonTextActive]}>
                {list.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Shopping List Content */}
      {currentList ? (
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {/* Progress */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progreso</Text>
              <Text style={styles.progressText}>
                {currentList.items.filter((item) => item.checked).length} / {currentList.items.length}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          {/* Items by Category */}
          {groupedItems &&
            Object.entries(groupedItems).map(([category, items]) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryTitle}>{category}</Text>
                {items.map((item) => (
                  <View key={item.id} style={styles.itemRow}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => handleToggleItem(currentList.id, item.id)}>
                      {item.checked && <Feather name="check" size={16} color="#AC2C2F" />}
                    </TouchableOpacity>
                    <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                      {item.productName}
                      <Text style={styles.itemQuantity}> x{item.quantity}</Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteItem(currentList.id, item.id)}
                    >
                      <Feather name="trash-2" size={16} color="#AC2C2F" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}

          {currentList.items.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No hay productos en esta lista</Text>
              <Text style={styles.emptyStateSubtext}>Los productos con stock bajo se agregarán automáticamente</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes listas de compra</Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
            <Text style={styles.createButtonText}>Crear primera lista</Text>
          </TouchableOpacity>
        </View>
      )}
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
  tabScroll: {
    marginHorizontal: -24,
  },
  tabContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabButtonActive: {
    backgroundColor: "#AC2C2F",
    borderColor: "#AC2C2F",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#111827",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  progressText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#AC2C2F",
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#AC2C2F",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  itemTextChecked: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  itemQuantity: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: "#AC2C2F",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
})
