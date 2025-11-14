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

  // 🔍 DEBUG: Usuario ID al cargar componente
  console.log('👤 [InventoryScreen] Usuario actual al cargar:', {
    user: currentUser,
    userId: currentUser?.id || 'NO_USER_ID',
    userName: currentUser?.name || 'NO_NAME'
  });

  // 🔥 Cargar inventario al entrar
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🚀 Iniciando carga de datos...');
        
        // 🔧 FIX: SIEMPRE cargar el usuario para asegurar que esté actualizado
        console.log('👤 Cargando usuario...');
        const loadedUser = await authViewModel.me();
        console.log('✅ Usuario cargado:', loadedUser);
        console.log('🆔 [DEBUG] USER ID después de me():', loadedUser?.id);
        console.log('🆔 [DEBUG] authViewModel.user después de me():', authViewModel.user?.id);
        
        if (!loadedUser || !loadedUser.id) {
          console.error('❌ No se pudo cargar el usuario o no tiene ID');
          return;
        }
        
        console.log('📦 Cargando productos del usuario...');
        console.log('🆔 [DEBUG] USER ID para cargar productos:', loadedUser.id);
        await productViewModel.getProductsByUserId(loadedUser.id);
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
  console.log('🆔 [DEBUG] CURRENT USER ID:', currentUser?.id || 'UNDEFINED');
  console.log('- Usuario actual:', currentUser);
  console.log('- Total productos:', products.length);
  console.log('- Productos:', products);
  console.log('- Loading:', productViewModel.loading);
  console.log('- Error:', productViewModel.error);

  const filteredProducts = products.filter((product) => {
    // 🔥 Solo mostrar productos del usuario logueado
    if (!currentUser || !currentUser.id) {
      console.log('❌ No hay usuario logueado');
      console.log('🆔 [DEBUG] currentUser:', currentUser);
      console.log('🆔 [DEBUG] currentUser.id:', currentUser?.id);
      return false;
    }
    
    const belongsToUser = product.userId === currentUser.id;
    console.log('🔍 [DEBUG] Comparando USER IDs:', {
      'product.userId': product.userId,
      'currentUser.id': currentUser.id,
      'belongsToUser': belongsToUser,
      'productName': product.name
    });
    
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

      {/* Debug Info - Temporal */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>🔍 DEBUG INFO</Text>
        <Text style={styles.debugText}>👤 Usuario ID: {currentUser?.id || 'NO_USER_ID'}</Text>
        <Text style={styles.debugText}>👤 Usuario Nombre: {currentUser?.name || 'NO_NAME'}</Text>
        <Text style={styles.debugText}>📦 Total Productos: {products.length}</Text>
        <Text style={styles.debugText}>📊 Productos Filtrados: {filteredProducts.length}</Text>
        <Text style={styles.debugText}>⏳ Loading: {productViewModel.loading ? 'SÍ' : 'NO'}</Text>
        <Text style={styles.debugText}>❌ Error: {productViewModel.error || 'NINGUNO'}</Text>
        {products.length > 0 && (
          <Text style={styles.debugText}>
            🏷️ Primer Producto UserID: {products[0]?.userId || 'NO_USER_ID'}
          </Text>
        )}
      </View>

      {/* Product List */}
      <ScrollView style={styles.productList}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No se encontraron productos</Text>
            <Text style={styles.emptyStateSubtext}>
              {products.length > 0 
                ? `Hay ${products.length} productos pero no pertenecen al usuario actual`
                : 'No hay productos cargados desde la API'
              }
            </Text>
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
    fontSize: 16,
    fontWeight: "500",
  },
  emptyStateSubtext: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  // 🐛 Estilos temporales para debug
  debugContainer: {
    backgroundColor: "#FFF3CD",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: "#856404",
    marginBottom: 4,
  },
});