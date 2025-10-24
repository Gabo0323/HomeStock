// App.tsx
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/ProfileScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import {LoginScreen}  from './src/screens/LoginScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Configuración para web
const linking = {
  prefixes: ['http://localhost:8081', 'http://localhost:19006'],
  config: {
    screens: {
      LoginScreen: '/',
      Inventory: '/inventory',
      Profile: '/profile',
      ShoppingList: '/shopping-list',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={Platform.OS === 'web' ? linking : undefined}>
      <Stack.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Inventory" 
          component={InventoryScreen}
          options={{ title: 'Inventario' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
        <Stack.Screen 
          name="ShoppingList" 
          component={ShoppingListScreen}
          options={{ title: 'Lista de Compras' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
