import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ProfileScreenProps {
  onBack: () => void
  onLogout: () => void
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const user = {
    name: "María Rodríguez",
    email: "maria.rodriguez@email.com",
    phone: "+506 8888-8888",
    location: "San José, Costa Rica",
    memberSince: "2025-01-15",
    totalProducts: 24,
    totalSavings: 18500,
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
            <TouchableOpacity style={styles.cameraButton}>
              <Feather name="camera" size={16} color="#AC2C2F" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.memberSince}>
            Miembro desde {new Date(user.memberSince).toLocaleDateString("es-CR", { month: "long", year: "numeric" })}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.totalProducts}</Text>
            <Text style={styles.statLabel}>Productos</Text>
          </View>
          <View style={[styles.statCard, styles.statCardGreen]}>
            <Text style={styles.statValueGreen}>₡{user.totalSavings.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Ahorrado</Text>
          </View>
        </View>

        {/* User Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            <TouchableOpacity>
              <Feather name="edit-2" size={20} color="#AC2C2F" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Feather name="mail" size={20} color="#9CA3AF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Correo electrónico</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Feather name="phone" size={20} color="#9CA3AF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Feather name="map-pin" size={20} color="#9CA3AF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Ubicación</Text>
              <Text style={styles.infoValue}>{user.location}</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logros</Text>
          <View style={styles.achievementsGrid}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🏆</Text>
              <Text style={styles.achievementText}>Primer producto</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>💰</Text>
              <Text style={styles.achievementText}>Ahorrador</Text>
            </View>
            <View style={[styles.achievementCard, styles.achievementLocked]}>
              <Text style={styles.achievementIcon}>⭐</Text>
              <Text style={styles.achievementText}>Bloqueado</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Feather name="log-out" size={20} color="#AC2C2F" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
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
  achievementsGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  achievementLocked: {
    backgroundColor: "#E5E7EB",
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 12,
    color: "#111827",
    textAlign: "center",
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
})
