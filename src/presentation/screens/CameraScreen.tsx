"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native"
import { Feather } from "@expo/vector-icons"

interface CameraScreenProps {
  onBack: () => void
  onCapture: (imageData: string) => void
}

export function CameraScreen({ onBack, onCapture }: CameraScreenProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const capturePhoto = () => {
    // Simulate photo capture
    const mockImage = "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400"
    setCapturedImage(mockImage)
  }

  const retakePhoto = () => {
    setCapturedImage(null)
  }

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage)
      Alert.alert("Éxito", "Foto capturada exitosamente")
      onBack()
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tomar Foto</Text>
        <TouchableOpacity disabled={!!capturedImage}>
          <Feather name="rotate-ccw" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Camera View */}
      <View style={styles.cameraView}>
        {capturedImage ? (
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Feather name="camera" size={64} color="#9CA3AF" />
            <Text style={styles.cameraText}>Cámara no disponible en preview</Text>
            <Text style={styles.cameraSubtext}>En la app real, aquí verás la cámara</Text>
          </View>
        )}

        {!capturedImage && (
          <View style={styles.overlay}>
            <View style={styles.guideBorder} />
            <Text style={styles.guideText}>Centra el producto en el cuadro</Text>
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {!capturedImage ? (
          <TouchableOpacity style={styles.captureButton} onPress={capturePhoto}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        ) : (
          <View style={styles.confirmButtons}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Feather name="rotate-ccw" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmPhoto}>
              <Feather name="check" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cameraView: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraPlaceholder: {
    alignItems: "center",
    padding: 24,
  },
  cameraText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  cameraSubtext: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  guideBorder: {
    width: 280,
    height: 280,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
  },
  guideText: {
    position: "absolute",
    bottom: 32,
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  controls: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#AC2C2F",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#AC2C2F",
  },
  confirmButtons: {
    flexDirection: "row",
    gap: 16,
  },
  retakeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#AC2C2F",
    justifyContent: "center",
    alignItems: "center",
  },
})
