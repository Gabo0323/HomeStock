import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { authViewModel } from "../container/profileContainer";
import { shoppingListViewModel } from "../container/shoppingListContainer";
import { productViewModel } from "../container/productContainer";

interface ShoppingListScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export const ShoppingListScreen = observer(({ onBack, onNavigate }: ShoppingListScreenProps) => {
  const listVm = shoppingListViewModel;
  const prodVm = productViewModel;

  const [userId, setUserId] = useState<number | null>(null);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [newItemQty, setNewItemQty] = useState("1");
  
  // Modal de selección de producto
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ----------------------------------------------------
  // 🔵 CARGAR USUARIO, LISTAS Y PRODUCTOS
  // ----------------------------------------------------
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      console.log("🔵 [ShoppingList] Iniciando carga de datos...");
      
      // Asegurar que tenemos un usuario autenticado
      let user = authViewModel.user;
      if (!user || !user.id) {
        console.log("🔵 [ShoppingList] Usuario no cargado, llamando a me()...");
        user = await authViewModel.me();
      }
      console.log("✅ [ShoppingList] Usuario obtenido:", user.id);
      setUserId(user.id);

      // Cargar productos del usuario
      console.log("🔵 [ShoppingList] Cargando productos...");
      await prodVm.getProductsByUserId(user.id);
      console.log("✅ [ShoppingList] Productos cargados:", prodVm.products.length);

      // Cargar listas de compras
      console.log("🔵 [ShoppingList] Cargando listas de compras...");
      await listVm.getShoppingListsByUserId(user.id);
      console.log("✅ [ShoppingList] Listas cargadas:", listVm.shoppingLists.length);

      if (listVm.shoppingLists.length > 0) {
        console.log("🔵 [ShoppingList] Cargando detalle de primera lista...");
        setSelectedListId(listVm.shoppingLists[0].id);
        await listVm.getShoppingListById(listVm.shoppingLists[0].id);
        console.log("✅ [ShoppingList] Detalle cargado, items:", listVm.selectedShoppingListItems.length);
      }
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error cargando datos:", err);
      console.error("❌ [ShoppingList] Error status:", err?.response?.status);
      console.error("❌ [ShoppingList] Error message:", err?.message);
      console.error("❌ [ShoppingList] Error response:", err?.response?.data);
      
      // Si es 401, probablemente el token expiró
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else {
        Alert.alert("Error", err?.message || "No se pudieron cargar los datos");
      }
    }
  }

  // ----------------------------------------------------
  // 🔵 Seleccionar lista
  // ----------------------------------------------------
  const handleSelectList = async (id: number) => {
    console.log("🔵 [ShoppingList] Seleccionando lista:", id);
    setSelectedListId(id);
    try {
      await listVm.getShoppingListById(id);
      console.log("✅ [ShoppingList] Lista seleccionada, items:", listVm.selectedShoppingListItems.length);
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error al seleccionar lista:", err?.response?.status);
      
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else {
        Alert.alert("Error", err?.message || "No se pudo cargar la lista");
      }
    }
  };

  // ----------------------------------------------------
  // 🟢 Crear una nueva lista
  // ----------------------------------------------------
  const handleCreateList = async () => {
    if (!userId) return;

    try {
      const name = `Lista ${listVm.shoppingLists.length + 1}`;
      await listVm.createShoppingList({ name, userId });

      if (listVm.selectedShoppingList) {
        setSelectedListId(listVm.selectedShoppingList.id);
      }
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error creando lista:", err?.response?.status);
      
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else {
        Alert.alert("Error", err.message ?? "No se pudo crear la lista");
      }
    }
  };

  // Agregar item a la lista seleccionada
  const handleAddItem = async (productId: number) => {
    if (!selectedListId) return;

    const qty = Number(newItemQty) || 1;

    console.log("🔵 [ShoppingList] Agregando item:", { selectedListId, productId, qty });

    try {
      await listVm.addItemToShoppingList(selectedListId, {
        productId,
        desiredQuantity: qty,
      });

      console.log("✅ [ShoppingList] Item agregado exitosamente");
      setNewItemQty("1");
      setShowProductModal(false);
      setSearchQuery("");
      
      // Recargar los items de la lista para asegurar sincronización
      await listVm.getShoppingListById(selectedListId);
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error agregando item:", err?.response?.status);
      console.error("❌ [ShoppingList] Error response:", err?.response?.data);
      
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else {
        Alert.alert("Error", err.message ?? "No se pudo agregar el producto");
      }
    }
  };

  // ----------------------------------------------------
  // 🔴 Toggle (check/uncheck)
  // ----------------------------------------------------
  const handleToggleItem = async (itemId: number) => {
    if (!selectedListId) return;

    const item = listVm.selectedShoppingListItems.find((i: any) => i.id === itemId);
    if (!item) return;

    try {
      console.log("🔵 [ShoppingList] Actualizando item:", { itemId, checked: !item.checked });
      await listVm.updateShoppingListItem(selectedListId, itemId, {
        checked: !item.checked,
        desiredQuantity: item.desiredQuantity,
      });
      console.log("✅ [ShoppingList] Item actualizado exitosamente");
      // No recargar inmediatamente, confiar en la actualización del viewmodel
      // Un pequeño delay para asegurar que el servidor procesó
      setTimeout(() => {
        listVm.getShoppingListById(selectedListId).catch((err) => {
          console.error("⚠️ [ShoppingList] Error sincronizando después de actualización:", err);
        });
      }, 500);
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error actualizando item:", err?.response?.status, err?.response?.data);
      
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else if (err?.response?.status === 409) {
        Alert.alert("Aviso", "El item fue modificado recientemente. Recargando lista...");
        // Recargar la lista para sincronizar
        await listVm.getShoppingListById(selectedListId);
      } else {
        Alert.alert("Error", err.message || "No se pudo actualizar el item");
      }
    }
  };

  // ----------------------------------------------------
  // 🟠 Generar items desde bajo inventario
  // ----------------------------------------------------
  const handleGenerateFromLowStock = async () => {
    if (!selectedListId) return;

    try {
      console.log("🔵 [ShoppingList] Generando items desde bajo inventario...");
      await listVm.generateItemsFromLowStock(selectedListId);
      console.log("✅ [ShoppingList] Items generados, recargando...");
      // Recargar la lista después de generar items
      await listVm.getShoppingListById(selectedListId);
      Alert.alert("Éxito", "Productos agregados desde el inventario bajo");
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error generando items:", err?.response?.status);
      
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else {
        Alert.alert("Error", err.message || "No se pudieron generar los productos");
      }
    }
  };

  // ----------------------------------------------------
  // 🔴 Convertir lista a compra
  // ----------------------------------------------------
  const handleConvertToPurchase = async () => {
    if (!selectedListId) return;

    try {
      console.log("🔵 [ShoppingList] Convirtiendo lista a compra...");
      await listVm.convertListToPurchase(selectedListId);
      console.log("✅ [ShoppingList] Lista convertida, recargando...");
      // Recargar la lista después de convertir
      await listVm.getShoppingListById(selectedListId);
      Alert.alert("Éxito", "Lista convertida en compra");
    } catch (err: any) {
      console.error("❌ [ShoppingList] Error convirtiendo lista:", err?.response?.status);
      
      if (err?.response?.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente");
      } else {
        Alert.alert("Error", err.message || "No se pudo convertir la lista");
      }
    }
  };

  // ----------------------------------------------------
  // 🔍 Búsqueda de productos
  // ----------------------------------------------------
  const filteredProducts = prodVm.products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper para obtener el nombre del producto
  const getProductName = (productId: number) => {
    const product = prodVm.products.find((p) => p.id === productId);
    return product?.name ?? "Producto desconocido";
  };

  const lists = listVm.shoppingLists;
  const items = listVm.selectedShoppingListItems;

  if (listVm.loading && !listVm.selectedShoppingList) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AC2C2F" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lista de Compras</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LISTAS */}
      <ScrollView
        horizontal
        style={styles.listSelector}
        showsHorizontalScrollIndicator={false}
      >
        {lists.map((list, index) => (
          <TouchableOpacity
            key={`list-${list.id}-${index}`}
            style={[
              styles.listButton,
              selectedListId === list.id && styles.listButtonActive,
            ]}
            onPress={() => handleSelectList(list.id)}
          >
            <Text
              style={[
                styles.listButtonText,
                selectedListId === list.id && styles.listButtonTextActive,
              ]}
            >
              {list.name}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Crear nueva lista */}
        <TouchableOpacity style={styles.addListButton} onPress={handleCreateList}>
          <Feather name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>

      {/* ITEMS DE LA LISTA */}
      <ScrollView style={styles.itemsContainer}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="shopping-cart" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No hay elementos en esta lista.</Text>
            <Text style={styles.emptySubtext}>
              Presiona el botón + para agregar productos
            </Text>
          </View>
        ) : (
          items.map((item, index) => (
            <TouchableOpacity
              key={`item-${item.id}-${index}`}
              style={styles.itemRow}
              onPress={() => handleToggleItem(item.id)}
            >
              <Feather
                name={(item as any).checked ? "check-square" : "square"}
                size={22}
                color={(item as any).checked ? "#AC2C2F" : "#9CA3AF"}
              />

              <View style={styles.itemContent}>
                <Text style={[styles.itemText, (item as any).checked && styles.itemTextChecked]}>
                  {getProductName(item.productId)}
                </Text>
                <Text style={styles.itemQty}>Cantidad: {item.desiredQuantity}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* BOTONES DE ACCIÓN */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.addItemButton}
          onPress={() => setShowProductModal(true)}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.addItemButtonText}>Agregar Producto</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE SELECCIÓN DE PRODUCTO */}
      <Modal
        visible={showProductModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProductModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Producto</Text>
              <TouchableOpacity onPress={() => setShowProductModal(false)}>
                <Feather name="x" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Búsqueda */}
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar producto..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Cantidad */}
            <View style={styles.qtyContainer}>
              <Text style={styles.qtyLabel}>Cantidad:</Text>
              <TextInput
                style={styles.qtyInput}
                placeholder="1"
                keyboardType="numeric"
                value={newItemQty}
                onChangeText={setNewItemQty}
              />
            </View>

            {/* Lista de productos */}
            <ScrollView style={styles.productList}>
              {filteredProducts.length === 0 ? (
                <Text style={styles.noProductsText}>No hay productos disponibles</Text>
              ) : (
                filteredProducts.map((product, index) => (
                  <TouchableOpacity
                    key={`product-${product.id}-${index}`}
                    style={styles.productItem}
                    onPress={() => handleAddItem(product.id)}
                  >
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDetails}>
                        Stock: {product.quantity} | Marca: {product.brand || "Sin marca"}
                      </Text>
                    </View>
                    <Feather name="plus-circle" size={24} color="#AC2C2F" />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 24, fontWeight: "600", color: "#111827" },

  listNameContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  listNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  editNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editNameInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: "#111827",
  },
  confirmNameButton: {
    padding: 8,
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
  },
  cancelNameButton: {
    padding: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },

  listSelector: {
    flexGrow: 0,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  listButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    marginRight: 12,
  },
  listButtonActive: {
    backgroundColor: "#AC2C2F",
  },
  listButtonText: { color: "#374151", fontSize: 14 },
  listButtonTextActive: { color: "#FFFFFF", fontWeight: "600" },

  addListButton: {
    width: 40,
    height: 40,
    backgroundColor: "#AC2C2F",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  itemsContainer: { flex: 1, padding: 16 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  emptySubtext: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 8,
    fontSize: 14,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  itemContent: { flex: 1 },
  itemText: { fontSize: 16, color: "#111827", fontWeight: "500" },
  itemTextChecked: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  itemQty: { fontSize: 14, color: "#6B7280", marginTop: 4 },

  actionsContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
  },

  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FEF3F2",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  generateButtonText: {
    color: "#AC2C2F",
    fontWeight: "600",
    fontSize: 14,
  },

  addItemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#AC2C2F",
    padding: 16,
    borderRadius: 12,
  },
  addItemButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  convertButton: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  convertButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  searchInput: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 16,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  qtyLabel: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  qtyInput: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    width: 80,
  },

  productList: {
    maxHeight: 400,
  },
  noProductsText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    paddingVertical: 40,
  },

  productItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  productDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});