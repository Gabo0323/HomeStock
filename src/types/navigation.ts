import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Inventory: undefined;
  AddProduct: undefined;
  ShoppingList: undefined;
  Comparison: undefined;
  Recommendations: undefined;
  Settings: undefined;
  Profile: undefined;
  Scanner: undefined;
  Ratings: undefined;
  Camera: undefined;
  Notifications: undefined;
  PurchaseHistory: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type InventoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Inventory'>;
export type AddProductScreenProps = NativeStackScreenProps<RootStackParamList, 'AddProduct'>;
export type ShoppingListScreenProps = NativeStackScreenProps<RootStackParamList, 'ShoppingList'>;
export type ComparisonScreenProps = NativeStackScreenProps<RootStackParamList, 'Comparison'>;
export type RecommendationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Recommendations'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type ScannerScreenProps = NativeStackScreenProps<RootStackParamList, 'Scanner'>;
export type RatingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Ratings'>;
export type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
export type NotificationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Notifications'>;
export type PurchaseHistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'PurchaseHistory'>;