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
import { CreateCategoryDto } from "@/data/dto/categoryDto";
import { categoryViewModel } from "../container/categoryContainer";

interface AddCategoryScreenProps {
  onBack: () => void;
  onAdd: (category: any) => void;
}

export function AddCategoryScreen({ onBack, onAdd }: AddCategoryScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "El nombre de la categoría es obligatorio");
      return;
    }

    try {
      // Obtener usuario autenticado (para asociar la categoría si aplica)
      const user = await authViewModel.me();

      //  Crear DTO real
      const dto: CreateCategoryDto = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      };

      // Crear categoría en backend
      await categoryViewModel.createCategory(dto);

      if (!categoryViewModel.category) {
        Alert.alert("Error", "No se pudo crear la categoría");
        return;
      }

      //  Notificar a la UI
      onAdd(categoryViewModel.category);
      Alert.alert("Éxito", "Categoría creada correctamente");

      //  Regresar
      onBack();
    } catch (err: any) {
      console.error("Error al crear categoría:", err);
      Alert.alert("Error", err.message ?? "No se pudo crear la categoría");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar Categoría</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Campo: Nombre */}
        <View style={styles.field}>
          <Text style={styles.label}>Nombre de la categoría *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Lácteos, Verduras, Limpieza..."
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Campo: Descripción */}
        <View style={styles.field}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Ej: Productos refrigerados, alimentos perecederos, etc."
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>

        {/* Botón Guardar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Guardar Categoría</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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
  field: {
    marginBottom: 24,
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
});
