import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { authViewModel, alertViewModel } from "../container/dashboardContainer";

import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import type { Product } from "../../lib/types";
import React from "react";

const logoImage = require("../assets/70b756a756bbc6dd6b4d1437c0a2812790a64904.png");

export const DashboardScreen = observer(({ onNavigate }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      // 1️⃣ Obtener usuario actual
      const user = await authViewModel.me();

      // 2️⃣ Obtener alertas activas desde backend
      await alertViewModel.getActiveAlertsByUserId(user.id);

      // 3️⃣ Obtener productos (cuando me pases ese VM lo conectamos aquí)
      setProducts([]); // temporal
    } catch (err) {
      console.error("Error cargando Dashboard:", err);
    } finally {
      setLoadingProducts(false);
    }
  }

  if (loadingProducts || alertViewModel.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#AC2C2F" />
      </View>
    );
  }

  const alertProducts = products.filter(p => p.status === "warning" || p.status === "low" || p.status === "expired");
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerTitle}>HomeStock</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate("Notifications")}>
              <Feather name="bell" size={24} color="#111827" />
              {alertViewModel.alerts.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{alertViewModel.alerts.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate("Profile")}>
              <Feather name="user" size={24} color="#111827" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ALERTAS */}
        {alertViewModel.alerts.length > 0 && (
          <View style={styles.alertsContainer}>
            <View style={styles.alertsHeader}>
              <Feather name="alert-triangle" size={20} color="#AC2C2F" />
              <Text style={styles.alertsTitle}>Alertas</Text>
            </View>

            {alertViewModel.alerts.map((alert: any) => (
              <View key={alert.id} style={styles.alertItem}>
                <View style={styles.alertContent}>
                  <Text style={styles.alertProductName}>{alert.productName}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                </View>
                <View style={styles.alertBadge}>
                  <Text style={styles.alertBadgeText}>Activa</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Accesos rápidos</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => onNavigate("AddProduct")}>
              <Feather name="plus" size={32} color="#111827" />
              <Text style={styles.quickActionText}>Agregar Producto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => onNavigate("Scanner")}>
              <Feather name="camera" size={32} color="#111827" />
              <Text style={styles.quickActionText}>Escanear Factura</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => onNavigate("ShoppingList")}>
              <Feather name="shopping-cart" size={32} color="#111827" />
              <Text style={styles.quickActionText}>Lista de Compra</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => onNavigate("Inventory")}>
              <Feather name="package" size={32} color="#111827" />
              <Text style={styles.quickActionText}>Ver Inventario</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{products.length}</Text>
            <Text style={styles.statLabel}>Productos totales</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.statValueGreen]}>₡{totalValue.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Valor total</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#AC2C2F",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  alertsContainer: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  alertsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#AC2C2F",
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FEF3F2",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  alertImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  alertContent: {
    flex: 1,
  },
  alertProductName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  alertMessage: {
    fontSize: 12,
    color: "#AC2C2F",
    marginTop: 2,
  },
  alertBadge: {
    backgroundColor: "rgba(156, 163, 175, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertBadgeText: {
    fontSize: 12,
    color: "#111827",
  },
  quickActionsContainer: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionButton: {
    width: "48%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  quickActionText: {
    fontSize: 14,
    color: "#111827",
    textAlign: "center",
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#AC2C2F",
    marginBottom: 4,
  },
  statValueGreen: {
    color: "#16A34A",
  },
  statLabel: {
    fontSize: 12,
    color: "#111827",
  },
})
