"use client";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { inventoryViewModel } from "../container/inventoryContainer";
import { authViewModel, productViewModel } from "../container/profileContainer";
import { shoppingListViewModel } from "../container/shoppingListContainer";
import { shoppingItemViewModel } from "../container/shoppingItemContainer";
import React from "react";

const logoImage = require("../assets/70b756a756bbc6dd6b4d1437c0a2812790a64904.png");

export const InventoryScreen = observer(({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const currentUser = authViewModel.user;

  // 🔥 Cargar inventario al entrar
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🚀 Iniciando carga de datos...');
        
        // Asegurar que el usuario esté cargado
        if (!currentUser) {
          console.log('👤 Cargando usuario...');
          await authViewModel.me();
          console.log('✅ Usuario cargado:', authViewModel.user);
        }
        
        console.log('📦 Cargando productos del usuario...');
        await productViewModel.getProductsByUserId(authViewModel.user?.id || 0);
        console.log('✅ Productos cargados, total items:', productViewModel.products.length);
      } catch (error) {
        console.error('❌ Error cargando datos:', error);
      }
    };
    
    loadData();
  }, []);

  const products = productViewModel.products;

  // 🐛 Debug: Información de depuración
  console.log('🔍 DEBUG - InventoryScreen:');
  console.log('- Usuario actual:', currentUser);
  console.log('- Total productos:', products.length);
  console.log('- Productos:', products);
  console.log('- Loading:', productViewModel.loading);
  console.log('- Error:', productViewModel.error);

  const filteredProducts = products.filter((product) => {
    // 🔥 Solo mostrar productos del usuario logueado
    if (!currentUser || !currentUser.id) {
      console.log('❌ No hay usuario logueado');
      return false;
    }
    
    const belongsToUser = product.userId === currentUser.id;
    if (!belongsToUser) {
      console.log('❌ Producto no pertenece al usuario:', {
        productId: product.id,
        productUserId: product.userId,
        currentUserId: currentUser.id,
        productName: product.name
      });
      return false;
    }

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || product.categoryId === Number(selectedCategory);

    console.log('✅ Producto válido:', product.name);
    return matchesSearch && matchesCategory;
  });

  console.log('📊 Productos filtrados:', filteredProducts.length);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Feather name="arrow-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerTitle}>Inventario</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Product List */}
      <ScrollView style={styles.productList}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No se encontraron productos</Text>
          </View>
        ) : (
          filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() =>
                navigation.navigate("ProductDetailScreen", { product })
              }
            >
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productQuantity}>
                  Cantidad: {product.quantity}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#AC2C2F",
    padding: 8,
    borderRadius: 12,
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  productList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productQuantity: {
    color: "#4B5563",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 40,
  },
  emptyStateText: {
    color: "#9CA3AF",
  },
});