"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  authViewModel,
  productViewModel,
  priceHistoryViewModel,
} from "../container/profileContainer";

import { categoryViewModel } from "../container/categoryContainer";
import { storeViewModel } from "../container/storeContainer";

import { CreateProductDto } from "@/data/dto/productDto";
import { CreatePriceHistoryDto } from "@/data/dto/priceHistoryDto";
import { Category } from "@/domain/entities/categoryEntity";
import { Store } from "@/domain/entities/storeEntity";

interface AddProductScreenProps {
  onBack: () => void;
  onAdd: (product: any) => void;
  onNavigate: (screen: string, params?: any) => void;
  capturedImage?: string | null;
}

export function AddProductScreen({
  onBack,
  onAdd,
  onNavigate,
  capturedImage,
}: AddProductScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    store: "",
    quantity: "",
    unit: "unidades",
    expirationDate: "",
    price: "",
    brand: "",
    barcode: "",
  });

  const [productImage, setProductImage] = useState<string | null>(capturedImage || null);

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showStorePicker, setShowStorePicker] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  // ----------------------------------------------------
  // 🔵 CARGAR CATEGORÍAS Y TIENDAS
  // ----------------------------------------------------
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // Categorías
      await categoryViewModel.getAllCategories();
      setCategories(categoryViewModel.categories);

      // Tiendas
      await storeViewModel.getStores();
      setStores(storeViewModel.stores);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }

  // ----------------------------------------------------
  // 🔴 GUARDAR PRODUCTO
  // ----------------------------------------------------
  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.quantity) {
      Alert.alert("Error", "Por favor completa los campos requeridos");
      return;
    }

    try {
      const user = await authViewModel.me();

      const dto: CreateProductDto = {
        userId: user.id,
        name: formData.name.trim(),
        categoryId: Number(formData.category),
        quantity: Number(formData.quantity),
        price: Number(formData.price) || 0,
        brand: formData.brand || undefined,
        barcode: formData.barcode || "",
      };

      await productViewModel.createProduct(dto);

      if (!productViewModel.product) {
        Alert.alert("Error", "No se pudo crear el producto");
        return;
      }

      const createdProduct = productViewModel.product;

      // Historial de precio inicial
      const priceDto: CreatePriceHistoryDto = {
        productId: createdProduct.id,
        unitPrice: dto.price,
        storeId: formData.store ? Number(formData.store) : 0,
        recordedAt: new Date().toISOString(),
      };

      await priceHistoryViewModel.createPriceHistory(priceDto);

      Alert.alert("Éxito", "Producto agregado correctamente");
      onBack();
    } catch (err: any) {
      console.error("Error al agregar producto:", err);
      Alert.alert("Error", err.message ?? "No se pudo agregar el producto");
    }
  };

  // ----------------------------------------------------
  // 🟣 Seleccionar Categoría
  // ----------------------------------------------------
  const selectCategory = (cat: Category) => {
    setFormData({ ...formData, category: String(cat.id) });
    setShowCategoryPicker(false);
  };

  // ----------------------------------------------------
  // 🟣 Seleccionar Tienda
  // ----------------------------------------------------
  const selectStore = (store: Store) => {
    setFormData({ ...formData, store: String(store.id) });
    setShowStorePicker(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar Producto</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* ------------ Foto ------------ */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            {productImage ? (
              <>
                <Image source={{ uri: productImage }} style={styles.productImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setProductImage(null)}
                >
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

        {/* ------------ Código de barras ------------ */}
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

        {/* ------------ Nombre ------------ */}
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

        {/* ------------ Categorías ------------ */}
        <View style={styles.field}>
          <Text style={styles.label}>Categoría *</Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={[styles.input, { flex: 1, justifyContent: "center" }]}
              onPress={() => setShowCategoryPicker(true)}
            >
              <Text style={formData.category ? styles.inputText : styles.placeholder}>
                {formData.category
                  ? categories.find((c) => String(c.id) === formData.category)?.name
                  : "Seleccionar categoría"}
              </Text>
            </TouchableOpacity>

            {/* Botón + */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                onNavigate("addCategory", {
                  onCreated: async () => {
                    await loadData();
                    setFormData({
                      ...formData,
                      category: String(categoryViewModel.category?.id),
                    });
                  },
                })
              }
            >
              <Feather name="plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ------------ Cantidad ------------ */}
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
            <TouchableOpacity style={styles.input}>
              <Text style={styles.inputText}>{formData.unit}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ------------ Fecha ------------ */}
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

        {/* ------------ Precio ------------ */}
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

        {/* ------------ Marca ------------ */}
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

        {/* ------------ TIENDAS ------------ */}
        <View style={styles.field}>
          <Text style={styles.label}>Lugar de compra</Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={[styles.input, { flex: 1, justifyContent: "center" }]}
              onPress={() => setShowStorePicker(true)}
            >
              <Text style={formData.store ? styles.inputText : styles.placeholder}>
                {formData.store
                  ? stores.find((s) => String(s.id) === formData.store)?.name
                  : "Seleccionar tienda"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                onNavigate("addStore", {
                  onCreated: async () => {
                    await loadData();
                    setFormData({
                      ...formData,
                      store: String(storeViewModel.store?.id),
                    });
                  },
                })
              }
            >
              <Feather name="plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Agregar Producto</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ------------ MODAL CATEGORÍAS ------------ */}
      <Modal visible={showCategoryPicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>

            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectCategory(item)}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.modalClose} onPress={() => setShowCategoryPicker(false)}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ------------ MODAL TIENDAS ------------ */}
      <Modal visible={showStorePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Seleccionar Tienda</Text>

            <FlatList
              data={stores}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectStore(item)}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.modalClose} onPress={() => setShowStorePicker(false)}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ---------------------------------------------------
// ✔ ESTILOS COMPLETOS (SIN CAMBIOS)
// ---------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 24, fontWeight: "600", color: "#111827" },
  content: { flex: 1 },
  contentContainer: { padding: 24, paddingBottom: 100 },

  imageSection: { alignItems: "center", marginBottom: 24 },
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
  productImage: { width: "100%", height: "100%", borderRadius: 16 },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#AC2C2F",
    borderRadius: 12,
    padding: 4,
  },

  imageButtons: { flexDirection: "row", gap: 12 },
  primaryButton: {
    backgroundColor: "#AC2C2F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "500" },
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

  barcodeSection: { flexDirection: "row", gap: 8, marginBottom: 24 },
  scanButton: {
    backgroundColor: "#AC2C2F",
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  field: { marginBottom: 24 },
  halfField: { flex: 1 },
  row: { flexDirection: "row", gap: 16 },

  label: { fontSize: 14, fontWeight: "500", color: "#111827", marginBottom: 8 },
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

  inputText: { fontSize: 16, color: "#111827" },
  placeholder: { fontSize: 16, color: "#9CA3AF" },

  addButton: {
    width: 48,
    height: 48,
    backgroundColor: "#AC2C2F",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#AC2C2F",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: { paddingVertical: 12 },
  modalItemText: { fontSize: 16, color: "#111827" },

  modalClose: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#AC2C2F",
    borderRadius: 12,
  },
  modalCloseText: { color: "#FFFFFF", fontWeight: "600", textAlign: "center" },
});
