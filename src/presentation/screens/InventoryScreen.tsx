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

  // ➕ Función para aumentar cantidad de producto
  const handleIncreaseQuantity = async (product: any) => {
    try {
      const newQuantity = product.quantity + 1;
      
      console.log('📈 Aumentando cantidad:', {
        productId: product.id,
        productName: product.name,
        currentQuantity: product.quantity,
        newQuantity: newQuantity
      });
      
      await productViewModel.updateProduct(product.id, {
        ...product,
        quantity: newQuantity
      });
      
      console.log('✅ Cantidad aumentada en backend');
      
      // Recargar la lista de productos para asegurar sincronización
      if (currentUser?.id) {
        console.log('🔄 Recargando lista de productos...');
        await productViewModel.getProductsByUserId(currentUser.id);
        console.log('✅ Lista recargada, total productos:', productViewModel.products.length);
      }
      
    } catch (error: any) {
      console.error('❌ Error al aumentar cantidad:', error);
      alert('Error al aumentar la cantidad. Intenta nuevamente.');
    }
  };

  // 🗑️ Función para eliminar/reducir cantidad de producto
  const handleReduceQuantity = async (product: any) => {
    try {
      const newQuantity = product.quantity - 1;
      
      console.log('🔍 [DEBUG] Procesando producto:', {
        productId: product.id,
        productName: product.name,
        currentQuantity: product.quantity,
        newQuantity: newQuantity,
        willDelete: newQuantity <= 0
      });
      
      if (newQuantity <= 0) {
        // Si la cantidad llega a 0, eliminar el producto completamente
        console.log('🗑️ Eliminando producto completamente:', product.name, 'ID:', product.id);
        
        await productViewModel.deleteProduct(product.id);
        console.log('✅ Producto eliminado del backend');
        
        // Verificar si se eliminó del array local
        const productStillExists = productViewModel.products.find(p => p.id === product.id);
        console.log('🔍 [DEBUG] Producto aún existe en array local:', !!productStillExists);
        
        // Si el producto aún existe en el array local, recargar la lista
        if (productStillExists && currentUser?.id) {
          console.log('🔄 Producto aún en array local, recargando lista...');
          await productViewModel.getProductsByUserId(currentUser.id);
          console.log('✅ Lista recargada después de eliminar');
        }
        
      } else {
        // Si aún hay cantidad, solo reducir en 1
        console.log('📉 Reduciendo cantidad de', product.name, 'de', product.quantity, 'a', newQuantity);
        
        await productViewModel.updateProduct(product.id, {
          ...product,
          quantity: newQuantity
        });
        console.log('✅ Cantidad actualizada en backend');
        
        // Recargar la lista de productos para asegurar sincronización
        if (currentUser?.id) {
          console.log('🔄 Recargando lista de productos...');
          await productViewModel.getProductsByUserId(currentUser.id);
          console.log('✅ Lista recargada, total productos:', productViewModel.products.length);
        }
      }
      
      console.log('🏁 [DEBUG] Operación completada. Productos finales:', productViewModel.products.length);
      
    } catch (error: any) {
      console.error('❌ Error en handleReduceQuantity:', error);
      console.error('❌ Error details:', {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        productId: product?.id,
        productName: product?.name
      });
      
      // Manejo específico del error 409 (Conflict)
      if (error?.response?.status === 409) {
        console.log('⚠️ Error 409 - Conflicto al eliminar producto');
        console.log('💡 Detalles del error:', error?.response?.data);
        
        // Extraer información específica del error
        const errorMessage = error?.response?.data?.message || '';
        let userMessage = 'No se puede eliminar este producto porque tiene dependencias.';
        
        if (errorMessage.includes('price_history')) {
          userMessage = 'No se puede eliminar este producto porque tiene un historial de precios asociado. Este historial es importante para mantener el registro de cambios de precios.';
        } else if (errorMessage.includes('inventory')) {
          userMessage = 'No se puede eliminar este producto porque tiene movimientos de inventario asociados.';
        } else if (errorMessage.includes('shopping')) {
          userMessage = 'No se puede eliminar este producto porque está en listas de compras.';
        }
        
        console.log('🔄 Intentando recargar la lista de productos...');
        
        // Recargar la lista para ver el estado actual
        if (currentUser?.id) {
          await productViewModel.getProductsByUserId(currentUser.id);
          console.log('✅ Lista recargada después del error 409');
        }
        
        // Reducir automáticamente a 0 como alternativa
        try {
          console.log('🔄 Reduciendo cantidad a 0 automáticamente...');
          await productViewModel.updateProduct(product.id, {
            ...product,
            quantity: 0
          });
          
          // Recargar la lista
          if (currentUser?.id) {
            await productViewModel.getProductsByUserId(currentUser.id);
            console.log('✅ Cantidad reducida a 0 exitosamente');
          }
          
          alert('✅ Cantidad reducida a 0. El producto se mantiene con stock 0 para preservar el historial.');
        } catch (updateError) {
          console.error('❌ Error al reducir cantidad a 0:', updateError);
          alert('Error al actualizar la cantidad. Intenta nuevamente.');
        }
      } else {
        // Otros errores
        alert('Error al procesar la operación. Intenta nuevamente.');
      }
    }
  };

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
            <Text style={styles.emptyStateSubtext}>
              {products.length > 0 
                ? `Hay ${products.length} productos pero no pertenecen al usuario actual`
                : 'No hay productos cargados desde la API'
              }
            </Text>
          </View>
        ) : (
          filteredProducts.map((product) => (
            <View key={product.id} style={[
              styles.productCard,
              product.quantity === 0 && styles.productCardOutOfStock
            ]}>
              <TouchableOpacity
                style={styles.productMainContent}
                onPress={() =>
                  navigation.navigate("ProductDetailScreen", { product })
                }
              >
                <Image
                  source={{ uri: product.imageUrl || 'https://via.placeholder.com/70x70/e5e7eb/9ca3af?text=IMG' }}
                  style={[
                    styles.productImage,
                    product.quantity === 0 && styles.productImageOutOfStock
                  ]}
                />
                <View style={styles.productInfo}>
                  <Text style={[
                    styles.productName,
                    product.quantity === 0 && styles.productNameOutOfStock
                  ]}>
                    {product.name}
                    {product.quantity === 0 && ' (Sin stock)'}
                  </Text>
                  <Text style={[
                    styles.productQuantity,
                    product.quantity === 0 && styles.productQuantityOutOfStock
                  ]}>
                    Cantidad: {product.quantity}
                  </Text>
                  {product.brand && (
                    <Text style={[
                      styles.productBrand,
                      product.quantity === 0 && styles.productBrandOutOfStock
                    ]}>
                      {product.brand}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              
              {/* Botones de cantidad */}
              <View style={styles.productActions}>
                <TouchableOpacity
                  style={styles.increaseButton}
                  onPress={() => handleIncreaseQuantity(product)}
                >
                  <Feather 
                    name="plus" 
                    size={18} 
                    color="#16A34A" 
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reduceButton}
                  onPress={() => handleReduceQuantity(product)}
                >
                  <Feather 
                    name={product.quantity > 1 ? "minus" : "trash-2"} 
                    size={18} 
                    color="#AC2C2F" 
                  />
                </TouchableOpacity>
              </View>
            </View>
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
  // 🎨 Estilos mejorados para tarjetas de producto
  productMainContent: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  productBrand: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
  productActions: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    gap: 8,
  },
  increaseButton: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  reduceButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  // 🎨 Estilos para productos sin stock
  productCardOutOfStock: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    opacity: 0.7,
  },
  productImageOutOfStock: {
    opacity: 0.5,
  },
  productNameOutOfStock: {
    color: "#6B7280",
    fontStyle: "italic",
  },
  productQuantityOutOfStock: {
    color: "#EF4444",
    fontWeight: "600",
  },
  productBrandOutOfStock: {
    color: "#9CA3AF",
  },
});