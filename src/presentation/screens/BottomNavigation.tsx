import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "inventory", label: "Inventario", icon: "package" },
    { id: "shopping", label: "Lista", icon: "shopping-cart" },
    { id: "compare", label: "Comparar", icon: "bar-chart-2" },
    { id: "settings", label: "Config", icon: "settings" },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              <Feather name={tab.icon} size={20} color={isActive ? "#AC2C2F" : "#9CA3AF"} />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingBottom: 20,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#FEE2E2",
  },
  tabLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#AC2C2F",
    fontWeight: "500",
  },
})
