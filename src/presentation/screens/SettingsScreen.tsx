"use client"

import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"

interface SettingsScreenProps {
  onNavigate?: (screen: string) => void
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState({
    expirationAlerts: true,
    lowStock: true,
    offers: false,
    recommendations: true,
  })

  const purchaseHistory = [
    { date: "2025-09-28", store: "Walmart", total: 12500, items: 8 },
    { date: "2025-09-21", store: "Automercado", total: 18300, items: 12 },
    { date: "2025-09-15", store: "MásxMenos", total: 9800, items: 6 },
    { date: "2025-09-10", store: "Palí", total: 15600, items: 10 },
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="bell" size={20} color="#CC0000" />
            <Text style={styles.sectionTitle}>Notificaciones</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Alertas de vencimiento</Text>
              <Text style={styles.settingDescription}>Te avisamos cuando productos estén por vencer</Text>
            </View>
            <Switch
              value={notifications.expirationAlerts}
              onValueChange={(value) => setNotifications({ ...notifications, expirationAlerts: value })}
              trackColor={{ false: "#E5E7EB", true: "#CC0000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Stock bajo</Text>
              <Text style={styles.settingDescription}>Notificaciones cuando los productos se agoten</Text>
            </View>
            <Switch
              value={notifications.lowStock}
              onValueChange={(value) => setNotifications({ ...notifications, lowStock: value })}
              trackColor={{ false: "#E5E7EB", true: "#CC0000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Ofertas</Text>
              <Text style={styles.settingDescription}>Recibe ofertas personalizadas</Text>
            </View>
            <Switch
              value={notifications.offers}
              onValueChange={(value) => setNotifications({ ...notifications, offers: value })}
              trackColor={{ false: "#E5E7EB", true: "#CC0000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Recomendaciones</Text>
              <Text style={styles.settingDescription}>Tips y consejos de almacenamiento</Text>
            </View>
            <Switch
              value={notifications.recommendations}
              onValueChange={(value) => setNotifications({ ...notifications, recommendations: value })}
              trackColor={{ false: "#E5E7EB", true: "#CC0000" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Purchase History */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeader}>
              <Feather name="clock" size={20} color="#CC0000" />
              <Text style={styles.sectionTitle}>Historial de Compras</Text>
            </View>
            {onNavigate && (
              <TouchableOpacity onPress={() => onNavigate("purchase-history")}>
                <Text style={styles.viewAllText}>Ver todo</Text>
              </TouchableOpacity>
            )}
          </View>

          {purchaseHistory.slice(0, 3).map((purchase, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onNavigate && onNavigate("purchase-history")}
              style={styles.historyItem}
            >
              <View style={styles.historyInfo}>
                <Text style={styles.historyStore}>{purchase.store}</Text>
                <Text style={styles.historyDetails}>
                  {new Date(purchase.date).toLocaleDateString("es-CR")} • {purchase.items} productos
                </Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyTotal}>₡{purchase.total.toLocaleString()}</Text>
                <Feather name="chevron-right" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Other Settings */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="help-circle" size={20} color="#9CA3AF" />
              <Text style={styles.menuItemText}>Ayuda y soporte</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="file-text" size={20} color="#9CA3AF" />
              <Text style={styles.menuItemText}>Términos y condiciones</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="shield" size={20} color="#9CA3AF" />
              <Text style={styles.menuItemText}>Política de privacidad</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItemDanger}>
            <View style={styles.menuItemLeft}>
              <Feather name="trash-2" size={20} color="#CC0000" />
              <Text style={styles.menuItemTextDanger}>Eliminar todos los datos</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CC0000" />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>HomeStock v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 HomeStock. Todos los derechos reservados.</Text>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  viewAllText: {
    fontSize: 14,
    color: "#AC2C2F",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyStore: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  historyRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  historyTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuItemDanger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#111827",
  },
  menuItemTextDanger: {
    fontSize: 16,
    color: "#CC0000",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
