"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { authViewModel } from "../container/profileContainer";
import { storeViewModel } from "../container/storeContainer";
import { CreateStoreDto } from "@/data/dto/storeDto";

interface AddStoreScreenProps {
  onBack: () => void;
  onCreated?: (store: any) => void;
}

export function AddStoreScreen({ onBack, onCreated }: AddStoreScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    notes: "",
  });

  // -------------------------------------------------
  // 🔴 Crear tienda
  // -------------------------------------------------
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "El nombre de la tienda es obligatorio");
      return;
    }

    try {
      const user = await authViewModel.me();

      const dto: CreateStoreDto = {
        name: formData.name.trim(),
        location: formData.location || "",
        notes: formData.notes || "",
      };

      await storeViewModel.createStore(dto);

      if (!storeViewModel.store) {
        Alert.alert("Error", "No se pudo crear la tienda");
        return;
      }

      Alert.alert("Éxito", "Tienda agregada correctamente");

      if (onCreated) onCreated(storeViewModel.store);

      onBack();
    } catch (err: any) {
      console.error("Error al crear tienda:", err);
      Alert.alert("Error", err.message ?? "No se pudo crear la tienda");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar Tienda</Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* Nombre */}
        <View style={styles.field}>
          <Text style={styles.label}>Nombre de la tienda *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Walmart, AM PM"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Ubicación */}
        <View style={styles.field}>
          <Text style={styles.label}>Ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: San José, Curridabat"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Notas */}
        <View style={styles.field}>
          <Text style={styles.label}>Notas</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Información adicional de la tienda"
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>

        {/* Botón Guardar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Agregar Tienda</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ---------------------------------------------------
// ✔ ESTILOS IDENTICOS A AddProductScreen
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

  field: { marginBottom: 24 },
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

  submitButton: {
    backgroundColor: "#AC2C2F",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
