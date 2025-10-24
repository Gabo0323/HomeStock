import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  Inventory: undefined;
  Profile: undefined;
  ShoppingList: undefined;
  Register : undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;
export type InventoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Inventory'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type ShoppingListScreenProps = NativeStackScreenProps<RootStackParamList, 'ShoppingList'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;