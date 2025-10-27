import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { StackNavigationProp } from "@react-navigation/stack"

const logoImage = require("../assets/4143eb91b41a31517afa1b9ed5b9c39f736dd4e9.png")

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>
}

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>HomeStock</Text>

        <Text style={styles.description}>
          Tu alacena digital para administrar y optimizar el consumo de productos en el hogar
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AC2C2F",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 192,
    height: 192,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 48,
    maxWidth: 320,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#AC2C2F",
    fontSize: 16,
    fontWeight: "600",
  },
})
