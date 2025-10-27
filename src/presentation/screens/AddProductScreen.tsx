"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from "react-native"
import { Feather } from "@expo/vector-icons"

interface AddProductScreenProps {
  onBack: () => void
  onAdd: (product: any) => void
  onNavigate: (screen: string) => void
  capturedImage?: string | null
}

export function AddProductScreen({ onBack, onAdd, onNavigate, capturedImage }: AddProductScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "unidades",
    expirationDate: "",
    price: "",
    brand: "",
    store: "",
    barcode: "",
  })
  const [productImage, setProductImage] = useState<string | null>(capturedImage || null)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showUnitPicker, setShowUnitPicker] = useState(false)
  const [showStorePicker, setShowStorePicker] = useState(false)

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.quantity) {
      Alert.alert("Error", "Por favor completa los campos requeridos")
      return
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      quantity: Number.parseFloat(formData.quantity),
      unit: formData.unit,
      expirationDate: formData.expirationDate,
      price: Number.parseFloat(formData.price) || 0,
      brand: formData.brand,
      store: formData.store,
      barcode: formData.barcode,
      image: productImage || "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400",
      status: "good" as const,
    }

    onAdd(newProduct)
    Alert.alert("Éxito", "Producto agregado exitosamente")
    onBack()
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar Producto</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Image Upload */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            {productImage ? (
              <>
                <Image source={{ uri: productImage }} style={styles.productImage} />
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setProductImage(null)}>
                  <Feather name="x" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </>
            ) : (
              <Feather name="camera" size={32} color="#9CA3AF" />
            )}
          </View>
          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => onNavigate("camera")}>
              <Feather name="camera" size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Galería</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barcode Scanner */}
        <View style={styles.barcodeSection}>
          <TextInput
            style={styles.input}
            placeholder="Código de barras"
            value={formData.barcode}
            onChangeText={(text) => setFormData({ ...formData, barcode: text })}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.scanButton} onPress={() => onNavigate("scanner")}>
            <Feather name="maximize" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Nombre del producto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Leche"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category */}
        <View style={styles.field}>
          <Text style={styles.label}>Categoría *</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowCategoryPicker(true)}>
            <Text style={formData.category ? styles.inputText : styles.placeholder}>
              {formData.category || "Seleccionar categoría"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quantity and Unit */}
        <View style={styles.row}>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.label}>Cantidad *</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={formData.quantity}
              onChangeText={(text) => setFormData({ ...formData, quantity: text })}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.label}>Unidad</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowUnitPicker(true)}>
              <Text style={styles.inputText}>{formData.unit}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Expiration Date */}
        <View style={styles.field}>
          <Text style={styles.label}>Fecha de vencimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={formData.expirationDate}
            onChangeText={(text) => setFormData({ ...formData, expirationDate: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Price */}
        <View style={styles.field}>
          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Brand */}
        <View style={styles.field}>
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Dos Pinos"
            value={formData.brand}
            onChangeText={(text) => setFormData({ ...formData, brand: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Store */}
        <View style={styles.field}>
          <Text style={styles.label}>Lugar de compra</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowStorePicker(true)}>
            <Text style={formData.store ? styles.inputText : styles.placeholder}>
              {formData.store || "Seleccionar tienda"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Agregar Producto</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageContainer: {
    width: 128,
    height: 128,
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#E5E7EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#AC2C2F",
    borderRadius: 12,
    padding: 4,
  },
  imageButtons: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#AC2C2F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#AC2C2F",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: "#AC2C2F",
    fontSize: 14,
    fontWeight: "500",
  },
  barcodeSection: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  scanButton: {
    backgroundColor: "#AC2C2F",
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  field: {
    marginBottom: 24,
  },
  halfField: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  inputText: {
    fontSize: 16,
    color: "#111827",
  },
  placeholder: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  submitButton: {
    backgroundColor: "#AC2C2F",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
