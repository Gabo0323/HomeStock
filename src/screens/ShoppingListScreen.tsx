import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ShoppingList, Item, getShoppingLists, createShoppingList, updateItem, deleteItem } from '../api/shoppingList';

export default function ShoppingListScreen() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const lists = await getShoppingLists();
      setShoppingLists(lists);
      if (lists.length > 0) setSelectedList(lists[0].id);
      setLoading(false);
    })();
  }, []);

  const currentList = shoppingLists.find(l => l.id === selectedList);

  const handleToggleItem = async (itemId: string) => {
    if (!currentList) return;
    const updatedItem = await updateItem(currentList.id, itemId, { checked: !currentList.items.find(i => i.id === itemId)?.checked });
    setShoppingLists(shoppingLists.map(l => l.id === currentList.id ? { ...currentList, items: currentList.items.map(i => i.id === itemId ? updatedItem : i) } : l));
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!currentList) return;
    await deleteItem(currentList.id, itemId);
    setShoppingLists(shoppingLists.map(l => l.id === currentList.id ? { ...currentList, items: currentList.items.filter(i => i.id !== itemId) } : l));
  };

  const handleCreateList = async () => {
    const newList = await createShoppingList(`Nueva Lista ${shoppingLists.length + 1}`);
    setShoppingLists([...shoppingLists, newList]);
    setSelectedList(newList.id);
  };

  if (loading) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#AC2C2F" />
    </View>
  );

  const groupedItems = currentList ? currentList.items.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {}) : {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de Compra</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateList}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {currentList ? (
          <>
            {Object.entries(groupedItems).map(([category, items]: any) => (
              <View key={category} style={styles.card}>
                <Text style={styles.category}>{category}</Text>
                {items.map((item: Item) => (
                  <View key={item.id} style={styles.itemRow}>
                    <TouchableOpacity
                      style={[styles.checkbox, item.checked && styles.checkboxChecked]}
                      onPress={() => handleToggleItem(item.id)}
                    >
                      {item.checked && <Feather name="check" size={14} color="#fff" />}
                    </TouchableOpacity>
                    <Text style={[styles.itemText, item.checked && styles.itemChecked]}>
                      {item.productName} x{item.quantity}
                    </Text>
                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                      <Feather name="trash-2" size={18} color="#AC2C2F" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyBox}>
            <Text>No tienes listas de compra</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  headerText: { fontSize: 18, fontWeight: '600', color: '#111827' },
  addButton: { backgroundColor: '#AC2C2F', borderRadius: 12, padding: 8 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12 },
  category: { fontWeight: '600', marginBottom: 8, color: '#111827' },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9FAFB', padding: 8, borderRadius: 10, marginBottom: 6 },
  itemText: { flex: 1, marginHorizontal: 8, color: '#111827' },
  itemChecked: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#AC2C2F', alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#AC2C2F' },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
});
