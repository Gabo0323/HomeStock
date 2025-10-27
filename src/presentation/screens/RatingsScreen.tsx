"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import type { Product } from "../../lib/types"
import { productRatings } from "../../lib/mockData"

interface RatingsScreenProps {
  product: Product
  onBack: () => void
}

export function RatingsScreen({ product, onBack }: RatingsScreenProps) {
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")

  const handleSubmitRating = () => {
    if (userRating === 0) {
      Alert.alert("Error", "Por favor selecciona una calificación")
      return
    }

    Alert.alert("Éxito", "¡Gracias por tu calificación!")
    setUserRating(0)
    setUserComment("")
  }

  const existingRatings = productRatings.filter((r) => r.productId === product.id)
  const averageRating =
    existingRatings.length > 0 ? existingRatings.reduce((sum, r) => sum + r.rating, 0) / existingRatings.length : 0

  const renderStars = (rating: number, size = 16, onPress?: (star: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => onPress?.(star)} disabled={!onPress} activeOpacity={0.7}>
            <Feather
              name="star"
              size={size}
              color={star <= rating ? "#FBBF24" : "#E5E7EB"}
              style={star <= rating && styles.starFilled}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calificaciones</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Product Info */}
        <View style={styles.productSection}>
          <View style={styles.productInfo}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
            </View>
          </View>

          {/* Average Rating */}
          {existingRatings.length > 0 && (
            <View style={styles.averageRating}>
              <View style={styles.averageRatingLeft}>
                <Text style={styles.averageRatingValue}>{averageRating.toFixed(1)}</Text>
                {renderStars(Math.round(averageRating), 16)}
              </View>
              <View style={styles.averageRatingRight}>
                <Text style={styles.averageRatingText}>
                  Basado en {existingRatings.length} {existingRatings.length === 1 ? "calificación" : "calificaciones"}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Rate Product */}
        <View style={styles.rateSection}>
          <Text style={styles.sectionTitle}>Califica este producto</Text>

          {/* Star Rating */}
          <View style={styles.userRatingContainer}>{renderStars(userRating, 40, setUserRating)}</View>

          {/* Comment */}
          <View style={styles.commentContainer}>
            <Text style={styles.commentLabel}>Comentario (opcional)</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Comparte tu experiencia con este producto..."
              placeholderTextColor="#9CA3AF"
              value={userComment}
              onChangeText={setUserComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity onPress={handleSubmitRating} style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Enviar Calificación</Text>
          </TouchableOpacity>
        </View>

        {/* User Ratings */}
        <View style={styles.ratingsSection}>
          <Text style={styles.sectionTitle}>Opiniones de usuarios</Text>

          {existingRatings.length > 0 ? (
            <View style={styles.ratingsList}>
              {existingRatings.map((rating, index) => (
                <View key={index} style={styles.ratingCard}>
                  <View style={styles.ratingHeader}>
                    <View>
                      <Text style={styles.ratingUserName}>{rating.userName}</Text>
                      <Text style={styles.ratingDate}>{new Date(rating.date).toLocaleDateString("es-CR")}</Text>
                    </View>
                    {renderStars(rating.rating, 16)}
                  </View>
                  <Text style={styles.ratingComment}>{rating.comment}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyRatings}>
              <Text style={styles.emptyRatingsText}>Aún no hay calificaciones para este producto</Text>
              <Text style={styles.emptyRatingsSubtext}>¡Sé el primero en calificarlo!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  productSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  averageRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  averageRatingLeft: {
    alignItems: "center",
    gap: 4,
  },
  averageRatingValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },
  averageRatingRight: {
    flex: 1,
  },
  averageRatingText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  starFilled: {
    // Star fill is handled by color prop
  },
  rateSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  userRatingContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  commentContainer: {
    marginBottom: 16,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  commentInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    minHeight: 96,
  },
  submitButton: {
    backgroundColor: "#CC0000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  ratingsSection: {
    padding: 24,
  },
  ratingsList: {
    gap: 16,
  },
  ratingCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ratingUserName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  ratingDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  ratingComment: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 20,
  },
  emptyRatings: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyRatingsText: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  emptyRatingsSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
  },
})
