"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import type { Purchase } from "../../lib/types"

interface PurchaseHistoryScreenProps {
  purchases: Purchase[]
  onBack: () => void
}

export function PurchaseHistoryScreen({ purchases, onBack }: PurchaseHistoryScreenProps) {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [filterStore, setFilterStore] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const totalSpent = purchases.reduce((sum, p) => sum + p.total, 0)
  const totalPurchases = purchases.length
  const averagePurchase = totalSpent / totalPurchases
  const stores = Array.from(new Set(purchases.map((p) => p.store)))

  const filteredPurchases = filterStore === "all" ? purchases : purchases.filter((p) => p.store === filterStore)

  const groupedPurchases = filteredPurchases.reduce(
    (acc, purchase) => {
      const date = new Date(purchase.date)
      const monthYear = `${date.toLocaleDateString("es-CR", { month: "long", year: "numeric" })}`

      if (!acc[monthYear]) {
        acc[monthYear] = []
      }
      acc[monthYear].push(purchase)
      return acc
    },
    {} as Record<string, Purchase[]>,
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-CR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentMethodLabel = (method: Purchase["paymentMethod"]) => {
    switch (method) {
      case "card":
        return "Tarjeta"
      case "cash":
        return "Efectivo"
      case "transfer":
        return "Transferencia"
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
            <View>
              <Text style={styles.headerTitle}>Historial de Compras</Text>
              <Text style={styles.headerSubtitle}>
                {totalPurchases} {totalPurchases === 1 ? "compra" : "compras"}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsFilterOpen(true)} style={styles.filterButton}>
            <Feather name="filter" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardRed]}>
            <View style={styles.statHeader}>
              <Feather name="trending-up" size={16} color="#AC2C2F" />
              <Text style={styles.statLabel}>Total gastado</Text>
            </View>
            <Text style={styles.statValueRed}>₡{totalSpent.toLocaleString()}</Text>
          </View>
          <View style={[styles.statCard, styles.statCardGreen]}>
            <View style={styles.statHeader}>
              <Feather name="file-text" size={16} color="#16A34A" />
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
            <Text style={styles.statValueGreen}>₡{Math.round(averagePurchase).toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Filter Badge */}
      {filterStore !== "all" && (
        <View style={styles.filterBadgeContainer}>
          <View style={styles.filterBadge}>
            <Feather name="shopping-bag" size={12} color="#111827" />
            <Text style={styles.filterBadgeText}>{filterStore}</Text>
          </View>
          <TouchableOpacity onPress={() => setFilterStore("all")}>
            <Text style={styles.clearFilterText}>Limpiar filtro</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Purchases List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {filteredPurchases.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="file-text" size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No hay compras</Text>
            <Text style={styles.emptySubtitle}>
              {filterStore !== "all" ? "No hay compras en esta tienda" : "Aquí aparecerá tu historial de compras"}
            </Text>
          </View>
        ) : (
          <View style={styles.purchasesList}>
            {Object.entries(groupedPurchases).map(([monthYear, monthPurchases]) => (
              <View key={monthYear} style={styles.monthGroup}>
                <View style={styles.monthHeader}>
                  <Feather name="calendar" size={16} color="#9CA3AF" />
                  <Text style={styles.monthTitle}>{monthYear}</Text>
                  <View style={styles.monthDivider} />
                </View>

                <View style={styles.monthPurchases}>
                  {monthPurchases.map((purchase) => (
                    <TouchableOpacity
                      key={purchase.id}
                      onPress={() => setSelectedPurchase(purchase)}
                      style={styles.purchaseCard}
                      activeOpacity={0.7}
                    >
                      <View style={styles.purchaseHeader}>
                        <View style={styles.purchaseInfo}>
                          <View style={styles.purchaseIcon}>
                            <Feather name="shopping-bag" size={24} color="#AC2C2F" />
                          </View>
                          <View>
                            <Text style={styles.purchaseStore}>{purchase.store}</Text>
                            <Text style={styles.purchaseDate}>{formatDate(purchase.date)}</Text>
                          </View>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                      </View>

                      <View style={styles.purchaseFooter}>
                        <View style={styles.purchaseBadges}>
                          <View style={styles.badge}>
                            <Feather name="package" size={12} color="#6B7280" />
                            <Text style={styles.badgeText}>
                              {purchase.items.length} {purchase.items.length === 1 ? "producto" : "productos"}
                            </Text>
                          </View>
                          <View style={styles.badge}>
                            <Feather name="credit-card" size={12} color="#6B7280" />
                            <Text style={styles.badgeText}>{getPaymentMethodLabel(purchase.paymentMethod)}</Text>
                          </View>
                        </View>
                        <Text style={styles.purchaseTotal}>₡{purchase.total.toLocaleString()}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Purchase Detail Modal */}
      <Modal
        visible={!!selectedPurchase}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPurchase(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPurchase && (
              <>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalTitle}>Detalle de Compra</Text>
                    <Text style={styles.modalSubtitle}>
                      {selectedPurchase.store} • {formatDate(selectedPurchase.date)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedPurchase(null)}>
                    <Feather name="x" size={24} color="#111827" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll}>
                  {/* Invoice Info */}
                  <View style={styles.invoiceInfo}>
                    <View style={styles.invoiceRow}>
                      <View style={styles.invoiceLabel}>
                        <Feather name="file-text" size={20} color="#9CA3AF" />
                        <Text style={styles.invoiceLabelText}>N° Factura</Text>
                      </View>
                      <Text style={styles.invoiceValue}>{selectedPurchase.invoiceNumber}</Text>
                    </View>
                    <View style={styles.invoiceRow}>
                      <View style={styles.invoiceLabel}>
                        <Feather name="credit-card" size={20} color="#9CA3AF" />
                        <Text style={styles.invoiceLabelText}>Método de pago</Text>
                      </View>
                      <Text style={styles.invoiceValue}>{getPaymentMethodLabel(selectedPurchase.paymentMethod)}</Text>
                    </View>
                  </View>

                  {/* Items List */}
                  <View style={styles.itemsSection}>
                    <Text style={styles.itemsTitle}>Productos comprados</Text>
                    <View style={styles.itemsList}>
                      {selectedPurchase.items.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                          <Image source={{ uri: item.image }} style={styles.itemImage} />
                          <View style={styles.itemInfo}>
                            <Text style={styles.itemName} numberOfLines={2}>
                              {item.productName}
                            </Text>
                            <Text style={styles.itemDetails}>
                              {item.quantity} {item.unit} × ₡{item.price.toLocaleString()}
                            </Text>
                          </View>
                          <Text style={styles.itemTotal}>₡{item.total.toLocaleString()}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Totals */}
                  <View style={styles.totalsSection}>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>Subtotal</Text>
                      <Text style={styles.totalValue}>₡{selectedPurchase.subtotal.toLocaleString()}</Text>
                    </View>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>IVA (13%)</Text>
                      <Text style={styles.totalValue}>₡{selectedPurchase.tax.toLocaleString()}</Text>
                    </View>
                    <View style={styles.totalDivider} />
                    <View style={styles.totalRow}>
                      <Text style={styles.grandTotalLabel}>Total</Text>
                      <Text style={styles.grandTotalValue}>₡{selectedPurchase.total.toLocaleString()}</Text>
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={isFilterOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Filtrar por tienda</Text>
                <Text style={styles.modalSubtitle}>Selecciona una tienda para ver sus compras</Text>
              </View>
              <TouchableOpacity onPress={() => setIsFilterOpen(false)}>
                <Feather name="x" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterList}>
              <TouchableOpacity
                onPress={() => {
                  setFilterStore("all")
                  setIsFilterOpen(false)
                }}
                style={[styles.filterOption, filterStore === "all" && styles.filterOptionActive]}
              >
                <Text style={[styles.filterOptionText, filterStore === "all" && styles.filterOptionTextActive]}>
                  Todas las tiendas
                </Text>
                <View style={styles.filterBadgeCount}>
                  <Text style={styles.filterBadgeCountText}>{purchases.length}</Text>
                </View>
              </TouchableOpacity>

              {stores.map((store) => {
                const storeCount = purchases.filter((p) => p.store === store).length
                return (
                  <TouchableOpacity
                    key={store}
                    onPress={() => {
                      setFilterStore(store)
                      setIsFilterOpen(false)
                    }}
                    style={[styles.filterOption, filterStore === store && styles.filterOptionActive]}
                  >
                    <View style={styles.filterOptionLeft}>
                      <Feather name="shopping-bag" size={20} color={filterStore === store ? "#AC2C2F" : "#9CA3AF"} />
                      <Text style={[styles.filterOptionText, filterStore === store && styles.filterOptionTextActive]}>
                        {store}
                      </Text>
                    </View>
                    <View style={styles.filterBadgeCount}>
                      <Text style={styles.filterBadgeCountText}>{storeCount}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 16,
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
    gap: 16,
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
  },
  statCardRed: {
    backgroundColor: "#FEF3F2",
  },
  statCardGreen: {
    backgroundColor: "#F0FDF4",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  statValueRed: {
    fontSize: 18,
    fontWeight: "600",
    color: "#AC2C2F",
  },
  statValueGreen: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16A34A",
  },
  filterBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filterBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterBadgeText: {
    fontSize: 14,
    color: "#111827",
  },
  clearFilterText: {
    fontSize: 14,
    color: "#AC2C2F",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  purchasesList: {
    gap: 24,
  },
  monthGroup: {
    gap: 12,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textTransform: "capitalize",
  },
  monthDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  monthPurchases: {
    gap: 12,
  },
  purchaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  purchaseHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  purchaseInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  purchaseIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FEF3F2",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseStore: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  purchaseDate: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  purchaseFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  purchaseBadges: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  badgeText: {
    fontSize: 12,
    color: "#6B7280",
  },
  purchaseTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#AC2C2F",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  modalScroll: {
    padding: 24,
  },
  invoiceInfo: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invoiceLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  invoiceLabelText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  invoiceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  itemsSection: {
    marginBottom: 24,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  itemsList: {
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  totalsSection: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  totalDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#AC2C2F",
  },
  filterModalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
  },
  filterList: {
    padding: 24,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 8,
  },
  filterOptionActive: {
    backgroundColor: "#FEF3F2",
    borderColor: "#AC2C2F",
  },
  filterOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterOptionText: {
    fontSize: 16,
    color: "#111827",
  },
  filterOptionTextActive: {
    color: "#AC2C2F",
    fontWeight: "600",
  },
  filterBadgeCount: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  filterBadgeCountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
})
