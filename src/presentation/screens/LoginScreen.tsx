"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import type { StackNavigationProp } from "@react-navigation/stack"
import { authViewModel } from "../container/authContainer"
import { LoginDto } from "@/data/dto/loginDto"
import React from "react"



const logoImage = require("../assets/70b756a756bbc6dd6b4d1437c0a2812790a64904.png")

type LoginScreenProps = {
  navigation: StackNavigationProp<any>
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Correo y contraseña requeridos");
        return;
      }

      const dto: LoginDto = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      const { user, accessToken, refreshToken } = await authViewModel.login(dto);

      console.log("Login OK:", user, accessToken);

      navigation.navigate("Dashboard");
    } catch (err: any) {
      console.error("Error login:", err);
      alert(err.message ?? "Credenciales incorrectas");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>Únete a HomeStock</Text>
          <Text style={styles.subtitle}>Crea tu cuenta y comienza tu administración personal</Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabTextActive}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabInactive} onPress={() => navigation.navigate("Register")}>
              <Text style={styles.tabTextInactive}>Registrarse</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="tucorreo@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O continúa con</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  logo: {
    width: 96,
    height: 96,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#AC2C2F",
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
  },
  tabTextActive: {
    textAlign: "center",
    color: "#111827",
    fontWeight: "600",
  },
  tabTextInactive: {
    textAlign: "center",
    color: "#9CA3AF",
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 16,
    height: 56,
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    color: "#AC2C2F",
    fontSize: 14,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#111827",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#9CA3AF",
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
  },
})
