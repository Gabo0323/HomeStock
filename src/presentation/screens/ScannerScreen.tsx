"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"

interface ScannerScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

export function ScannerScreen({ onBack, onNavigate }: ScannerScreenProps) {
  const [scanMode, setScanMode] = useState<"receipt" | "barcode" | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [manualBarcode, setManualBarcode] = useState("")
  const scanAnimation = new Animated.Value(0)

  const handleStartScan = (mode: "receipt" | "barcode") => {
    setScanMode(mode)
    setIsScanning(true)

    Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start()

    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false)
      scanAnimation.setValue(0)
      if (mode === "receipt") {
        alert("Factura escaneada correctamente")
        setTimeout(() => {
          onNavigate("add-product")
        }, 1000)
      } else {
        alert("Código de barras detectado: 7501234567890")
        setTimeout(() => {
          onNavigate("add-product")
        }, 1000)
      }
    }, 2500)
  }

  const handleManualBarcodeSubmit = () => {
    if (manualBarcode.length > 0) {
      alert(`Código ingresado: ${manualBarcode}`)
      setTimeout(() => {
        onNavigate("add-product")
      }, 1000)
    }
  }

  const scanLineTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 256],
  })

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escáner</Text>
      </View>

      {!isScanning ? (
        <View style={styles.content}>
          {/* Scanner Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => handleStartScan("receipt")} style={styles.optionButton}>
              <Feather name="camera" size={48} color="#FFFFFF" />
              <Text style={styles.optionTitle}>Escanear Factura</Text>
              <Text style={styles.optionDescription}>Captura tu factura para agregar múltiples productos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleStartScan("barcode")} style={styles.optionButton}>
              <Feather name="maximize" size={48} color="#FFFFFF" />
              <Text style={styles.optionTitle}>Escanear Código de Barras</Text>
              <Text style={styles.optionDescription}>Escanea el código del producto para agregarlo rápidamente</Text>
            </TouchableOpacity>
          </View>

          {/* Manual Barcode Input */}
          <View style={styles.manualInputContainer}>
            <Text style={styles.manualInputTitle}>Ingresar código manualmente</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Número de código de barras"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={manualBarcode}
                onChangeText={setManualBarcode}
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={handleManualBarcodeSubmit} style={styles.submitButton}>
                <Feather name="upload" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Consejos</Text>
            <Text style={styles.tipText}>• Asegúrate de tener buena iluminación</Text>
            <Text style={styles.tipText}>• Mantén la cámara estable</Text>
            <Text style={styles.tipText}>• Coloca el código o factura dentro del marco</Text>
          </View>
        </View>
      ) : (
        <View style={styles.scanningContainer}>
          {/* Camera Frame */}
          <View style={styles.cameraFrame}>
            <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineTranslateY }] }]} />

            {/* Corner markers */}
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>

          <Text style={styles.scanningText}>
            {scanMode === "receipt" ? "Escaneando factura..." : "Escaneando código de barras..."}
          </Text>
          <Text style={styles.scanningSubtext}>
            Mantén el {scanMode === "receipt" ? "documento" : "código"} dentro del marco
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  optionDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  manualInputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  manualInputTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#CC0000",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tipsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  scanningContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  cameraFrame: {
    width: 256,
    height: 256,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    marginBottom: 32,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#CC0000",
  },
  corner: {
    position: "absolute",
    width: 32,
    height: 32,
  },
  cornerTopLeft: {
    top: 8,
    left: 8,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#FFFFFF",
  },
  cornerTopRight: {
    top: 8,
    right: 8,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FFFFFF",
  },
  cornerBottomLeft: {
    bottom: 8,
    left: 8,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#FFFFFF",
  },
  cornerBottomRight: {
    bottom: 8,
    right: 8,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FFFFFF",
  },
  scanningText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  scanningSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
})
