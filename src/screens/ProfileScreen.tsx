import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getUserProfile, logout, User } from '../api/profile';

type RootStackParamList = {
  Inventory: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getUserProfile();
      setUser(data);
      setLoading(false);
    })();
  }, []);

  if (loading || !user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigation.replace('Inventory');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Feather name="user" size={48} color="#fff" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Feather name="log-out" size={18} color="#AC2C2F" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  headerTitle: { marginLeft: 12, fontSize: 20, color: '#111827', fontWeight: '600' },
  profileHeader: { alignItems: 'center', backgroundColor: '#AC2C2F', paddingVertical: 32 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#fff3', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  name: { color: '#fff', fontSize: 22, fontWeight: '600' },
  logoutButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#AC2C2F', borderWidth: 1.5, borderRadius: 12, padding: 12, margin: 16 },
  logoutText: { color: '#AC2C2F', marginLeft: 6, fontWeight: '600' },
});
