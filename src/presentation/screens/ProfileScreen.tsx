import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { authViewModel, productViewModel, priceHistoryViewModel } from "../container/profileContainer";

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const ProfileScreen = observer(({ onBack, onLogout }: ProfileScreenProps) => {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    memberSince: "",
  });

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    loadProfileData();
  }, []);

  async function loadProfileData() {
    try {
      // 1️⃣ Obtener usuario
      const user = await authViewModel.me();

      setUserData({
        name: user.name,
        email: user.email,
        memberSince: user.createdAt ? (typeof user.createdAt === 'string' ? user.createdAt : user.createdAt.toISOString()) : "2024-01-01",
      });

      // 2️⃣ Obtener productos del usuario
      await productViewModel.getProductsByUserId(user.id);

      setTotalProducts(productViewModel.products.length);

      // 3️⃣ Calcular ahorrado
      let total = 0;

      for (const p of productViewModel.products) {
        await priceHistoryViewModel.getLastPriceByProductId(p.id);
        if (priceHistoryViewModel.priceHistory) {
          total += priceHistoryViewModel.priceHistory.amount;
        }
      }

      setTotalSavings(total);
    } catch (err) {
      console.error("Error cargando perfil:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" color="#AC2C2F" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Feather name="user" size={48} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.memberSince}>
            Miembro desde{" "}
            {new Date(userData.memberSince).toLocaleDateString("es-CR", { month: "long", year: "numeric" })}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalProducts}</Text>
            <Text style={styles.statLabel}>Productos</Text>
          </View>

          <View style={[styles.statCard, styles.statCardGreen]}>
            <Text style={styles.statValueGreen}>₡{totalSavings.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Ahorrado</Text>
          </View>
        </View>

        {/* Información personal */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
          </View>

          <View style={styles.infoItem}>
            <Feather name="mail" size={20} color="#9CA3AF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Correo electrónico</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Feather name="log-out" size={20} color="#AC2C2F" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
});


// -----------------------------
// 🔥 EXACTAMENTE LOS MISMOS STYLES QUE USABAS
// -----------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  profileHeader: {
    backgroundColor: "#AC2C2F",
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    marginTop: -24,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FEF3F2",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statCardGreen: {
    backgroundColor: "#F0FDF4",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#AC2C2F",
    marginBottom: 4,
  },
  statValueGreen: {
    fontSize: 24,
    fontWeight: "600",
    color: "#16A34A",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
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
  infoItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#AC2C2F",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#AC2C2F",
  },
});
