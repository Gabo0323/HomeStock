import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getShoppingLists, ShoppingList, updateShoppingList } from '../api/shoppingList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Inventory: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Inventory'>;

export default function InventoryScreen({ navigation }: Props) {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const lists = await getShoppingLists();
      setShoppingLists(lists);
      setSelectedList(lists.length > 0 ? lists[0].id : null);
      setLoading(false);
    })();
  }, []);

  const handleToggleItem = async (listId: string, itemId: string) => {
    const list = shoppingLists.find(l => l.id === listId);
    if (!list) return;
    const updatedItems = list.items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    const updatedList = await updateShoppingList(listId, { items: updatedItems });
    setShoppingLists(shoppingLists.map(l => (l.id === listId ? updatedList : l)));
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Cargando listas...</Text>
      </View>
    );
  }

  const currentList = shoppingLists.find(l => l.id === selectedList);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compra</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.addButton}>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {currentList ? (
          currentList.items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <TouchableOpacity
                onPress={() => handleToggleItem(currentList.id, item.id)}
                style={[styles.checkbox, item.checked && styles.checkboxChecked]}
              >
                {item.checked && <Feather name="check" size={14} color="#fff" />}
              </TouchableOpacity>
              <Text style={[styles.itemText, item.checked && styles.itemChecked]}>
                {item.productName} x{item.quantity}
              </Text>
            </View>
          ))
        ) : (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text>No hay productos en esta lista</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', color: '#111827' },
  addButton: { backgroundColor: '#AC2C2F', padding: 8, borderRadius: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  itemText: { flex: 1, marginLeft: 8, color: '#111827' },
  itemChecked: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 1.5, borderColor: '#AC2C2F', justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#AC2C2F' },
});
