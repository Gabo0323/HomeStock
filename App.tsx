"use client"

import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"

// Import all screens
import { WelcomeScreen } from "./src/presentation/screens/WelcomeScreen"
import { LoginScreen } from "./src/presentation/screens/LoginScreen"
import { RegisterScreen } from "./src/presentation/screens/RegisterScreen"
import { DashboardScreen } from "./src/presentation/screens/DashboardScreen"
import { InventoryScreen } from "./src/presentation/screens/InventoryScreen"
import { AddProductScreen } from "./src/presentation/screens/AddProductScreen"
import { AddCategoryScreen } from "./src/presentation/screens/AddCategoryScreen"
import { AddStoreScreen } from "./src/presentation/screens/AddStoreScreen"
import { ShoppingListScreen } from "./src/presentation/screens/ShoppingListScreen"
import { ComparisonScreen } from "./src/presentation/screens/ComparisonScreen"
import { RecommendationsScreen } from "./src/presentation/screens/RecommendationsScreen"
import { SettingsScreen } from "./src/presentation/screens/SettingsScreen"
import { ProfileScreen } from "./src/presentation/screens/ProfileScreen"
import { ScannerScreen } from "./src/presentation/screens/ScannerScreen"
import { RatingsScreen } from "./src/presentation/screens/RatingsScreen"
import { CameraScreen } from "./src/presentation/screens/CameraScreen"
import { NotificationsScreen } from "./src/presentation/screens/NotificationsScreen"
import { PurchaseHistoryScreen } from "./src/presentation/screens/PurchaseHistoryScreen"

// Import types and mock data
import { RootStackParamList } from "./src/types/navigation"
import { initialProducts, initialShoppingLists, initialNotifications, initialPurchases } from "./src/lib/mockData"
import type { Product, ShoppingList, Notification, Purchase } from "./src/lib/types"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>(initialShoppingLists)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product])
    setCapturedImage(null)
  }

  const handleAddCategory = (category: any) => {
    // Manejar categoria agregada si es necesario
    console.log('Categoria agregada:', category)
  }

  const handleAddStore = (store: any) => {
    // Manejar tienda agregada si es necesario
    console.log('Tienda agregada:', store)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCameraCapture = (imageData: string) => {
    setCapturedImage(imageData)
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register">
              {({ navigation }) => (
                <RegisterScreen 
                  onRegister={() => navigation.navigate('Dashboard')}
                  onSwitchToLogin={() => navigation.navigate('Login')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Dashboard">
              {({ navigation }) => (
                <DashboardScreen 
                  products={products} 
                  onNavigate={(screen: any) => navigation.navigate(screen)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Inventory">
              {({ navigation }) => (
                <InventoryScreen 
                  navigation={navigation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="AddProduct">
              {({ navigation }) => (
                <AddProductScreen 
                  onAdd={handleAddProduct}
                  capturedImage={capturedImage}
                  onBack={() => navigation.goBack()}
                  onNavigate={(screen: any) => navigation.navigate(screen)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="addCategory">
              {({ navigation }) => (
                <AddCategoryScreen 
                  onAdd={handleAddCategory}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="addStore">
              {({ navigation }) => (
                <AddStoreScreen 
                  onBack={() => navigation.goBack()}
                  onCreated={handleAddStore}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ShoppingList">
              {({ navigation }) => (
                <ShoppingListScreen 
                  navigation={navigation}
                  shoppingLists={shoppingLists} 
                  onUpdateLists={setShoppingLists} 
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Comparison" component={ComparisonScreen} />
            <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile">
              {({ navigation }) => (
                <ProfileScreen 
                  onBack={() => navigation.goBack()}
                  onLogout={() => navigation.navigate('Welcome')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Scanner">
              {({ navigation }) => (
                <ScannerScreen 
                  onBack={() => navigation.goBack()}
                  onNavigate={(screen: any) => navigation.navigate(screen)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Ratings">
              {({ navigation }) => (
                <RatingsScreen 
                  product={selectedProduct!}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Camera">
              {({ navigation }) => (
                <CameraScreen 
                  onCapture={handleCameraCapture}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Notifications">
              {({ navigation }) => (
                <NotificationsScreen
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onDeleteNotification={handleDeleteNotification}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="PurchaseHistory">
              {({ navigation }) => (
                <PurchaseHistoryScreen 
                  purchases={purchases}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
