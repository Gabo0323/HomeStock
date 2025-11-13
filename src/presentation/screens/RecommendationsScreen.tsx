import { View, Text, ScrollView, StyleSheet, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"

export function RecommendationsScreen() {
  const offers = [
    {
      id: "1",
      title: "Leche Dos Pinos 2x1",
      store: "Walmart",
      discount: "50%",
      validUntil: "2025-10-05",
      image: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=400",
    },
    {
      id: "2",
      title: "Arroz Tío Pelón - 20% OFF",
      store: "MásxMenos",
      discount: "20%",
      validUntil: "2025-10-10",
      image: "https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?w=400",
    },
    {
      id: "3",
      title: "Café Britt - Descuento especial",
      store: "Automercado",
      discount: "15%",
      validUntil: "2025-10-03",
      image: "https://images.unsplash.com/photo-1675306408031-a9aad9f23308?w=400",
    },
  ]

  const tips = [
    {
      id: "1",
      icon: "lightbulb",
      title: "Almacenamiento de Pan",
      description: "Guarda el pan en el congelador para que dure hasta 3 meses sin perder frescura.",
      color: "#EFF6FF",
      borderColor: "#BFDBFE",
      textColor: "#1E40AF",
    },
    {
      id: "2",
      icon: "clock",
      title: "Rotación de productos",
      description: "Organiza tu alacena con el método FIFO: lo primero que entra, primero que sale.",
      color: "#F5F3FF",
      borderColor: "#DDD6FE",
      textColor: "#6D28D9",
    },
    {
      id: "3",
      icon: "trending-up",
      title: "Ahorro inteligente",
      description: "Compra productos no perecederos en oferta y almacénalos para ahorrar a largo plazo.",
      color: "#F0FDF4",
      borderColor: "#BBF7D0",
      textColor: "#15803D",
    },
  ]

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recomendaciones</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Offers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="tag" size={20} color="#CC0000" />
            <Text style={styles.sectionTitle}>Ofertas Personalizadas</Text>
          </View>

          <View style={styles.offersList}>
            {offers.map((offer) => (
              <View key={offer.id} style={styles.offerCard}>
                <Image source={{ uri: offer.image }} style={styles.offerImage} />
                <View style={styles.offerInfo}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerStore}>{offer.store}</Text>
                  <Text style={styles.offerValidity}>
                    Válido hasta {new Date(offer.validUntil).toLocaleDateString("es-CR")}
                  </Text>
                </View>
                <View style={styles.offerDiscount}>
                  <Text style={styles.offerDiscountText}>-{offer.discount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="lightbulb" size={20} color="#CC0000" />
            <Text style={styles.sectionTitle}>Tips de Almacenamiento</Text>
          </View>

          <View style={styles.tipsList}>
            {tips.map((tip) => (
              <View key={tip.id} style={[styles.tipCard, { backgroundColor: tip.color, borderColor: tip.borderColor }]}>
                <View style={styles.tipContent}>
                  <Feather name={tip.icon} size={24} color={tip.textColor} style={styles.tipIcon} />
                  <View style={styles.tipText}>
                    <Text style={[styles.tipTitle, { color: tip.textColor }]}>{tip.title}</Text>
                    <Text style={[styles.tipDescription, { color: tip.textColor }]}>{tip.description}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Planning Suggestions */}
        <View style={styles.planningCard}>
          <Text style={styles.planningTitle}>Sugerencias de Planificación</Text>
          <View style={styles.planningList}>
            <View style={styles.planningItem}>
              <Text style={styles.planningBullet}>•</Text>
              <Text style={styles.planningText}>
                Esta semana tienes 3 productos que vencen pronto. Planifica usarlos primero.
              </Text>
            </View>
            <View style={styles.planningItem}>
              <Text style={styles.planningBullet}>•</Text>
              <Text style={styles.planningText}>
                Basado en tu consumo, necesitarás comprar leche en aproximadamente 5 días.
              </Text>
            </View>
            <View style={styles.planningItem}>
              <Text style={styles.planningBullet}>•</Text>
              <Text style={styles.planningText}>
                El arroz está en oferta en MásxMenos. ¡Ahorra hasta ₡200 comprando ahora!
              </Text>
            </View>
          </View>
        </View>

        {/* Weekly Savings */}
        <View style={styles.savingsCard}>
          <Text style={styles.savingsTitle}>Ahorro Semanal Estimado</Text>
          <Text style={styles.savingsAmount}>₡2,850</Text>
          <Text style={styles.savingsDescription}>
            Siguiendo nuestras recomendaciones podrías ahorrar este monto esta semana
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  offersList: {
    gap: 12,
  },
  offerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  offerInfo: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  offerStore: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  offerValidity: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  offerDiscount: {
    backgroundColor: "#CC0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  offerDiscountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  tipsList: {
    gap: 12,
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  tipContent: {
    flexDirection: "row",
    gap: 12,
  },
  tipIcon: {
    marginTop: 4,
  },
  tipText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
  planningCard: {
    backgroundColor: "#CC0000",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  planningTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  planningList: {
    gap: 8,
  },
  planningItem: {
    flexDirection: "row",
    gap: 8,
  },
  planningBullet: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  planningText: {
    flex: 1,
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 20,
  },
  savingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  savingsAmount: {
    fontSize: 40,
    fontWeight: "700",
    color: "#CC0000",
    marginBottom: 8,
  },
  savingsDescription: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
})
