import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Usamos Feather
import { colors, spacing, radii } from '@/theme';
import { CATEGORIES, STORES } from '@/types';

interface AddProductScreenProps {
  onBack: () => void;
  onAdd: (product: any) => void;
  onNavigate: (screen: 'camera' | 'scanner') => void;
  capturedImage?: string | null;
}

export function AddProductScreen({ onBack, onAdd, onNavigate, capturedImage }: AddProductScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[1], // Valor por defecto
    quantity: '',
    unit: 'unidades',
    expirationDate: '',
    price: '',
    brand: '',
    store: STORES[0], // Valor por defecto
    barcode: ''
  });
  const [productImage, setProductImage] = useState<string | null>(capturedImage || null);
  
  // Nota: En RN, la selección de archivos e imágenes es asíncrona y requiere módulos de Expo/RN.
  // Aquí simulamos la acción con los botones de navegación.

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.quantity) {
      alert('Por favor completa los campos requeridos: Nombre, Categoría, Cantidad');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      expirationDate: formData.expirationDate,
      price: parseFloat(formData.price) || 0,
      brand: formData.brand,
      store: formData.store,
      barcode: formData.barcode,
      // Usar imagen capturada o una imagen de placeholder
      image: productImage || 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400',
      status: 'good' as const
    };

    onAdd(newProduct);
  };

  const handleRemoveImage = () => {
    setProductImage(null);
  };
  
  const handleTextChange = (field: keyof typeof formData, text: string) => {
    setFormData(prev => ({ ...prev, [field]: text }));
  };
  
  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.heading}>Agregar Producto</Text>
      </View>

      <View style={styles.form}>
        {/* Image Upload */}
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            {productImage ? (
              <>
                <Image 
                  source={{ uri: productImage }} 
                  style={styles.productImage} 
                />
                <Pressable
                  onPress={handleRemoveImage}
                  style={styles.removeImageButton}
                >
                  <Feather name="x" size={16} color={colors.card} />
                </Pressable>
              </>
            ) : (
              <Feather name="camera" size={32} color={colors.textMuted} />
            )}
          </View>
          <View style={styles.imageButtons}>
            <Pressable 
              onPress={() => onNavigate('camera')}
              style={[styles.actionButton, { backgroundColor: '#AC2C2F' }]}
            >
              <Feather name="camera" size={16} color={colors.card} />
              <Text style={styles.actionButtonText}>Tomar Foto</Text>
            </Pressable>
            <Pressable 
              // En RN, esto abriría un selector de galería (requiere expo-image-picker)
              onPress={() => alert('Abrir galería (Requiere implementación nativa)')}
              style={[styles.actionButton, styles.galleryButton]}
            >
              <Text style={styles.galleryButtonText}>Galería</Text>
            </Pressable>
          </View>
        </View>

        {/* Barcode Scanner */}
        <View style={styles.barcodeSection}>
          <TextInput
            style={[styles.input, { flex: 1, paddingLeft: spacing.md }]}
            placeholder="Código de barras"
            placeholderTextColor={colors.textMuted}
            value={formData.barcode}
            onChangeText={(text) => handleTextChange('barcode', text)}
            keyboardType="numeric"
          />
          <Pressable
            onPress={() => onNavigate('scanner')}
            style={styles.scannerButton}
          >
            <Feather name="barcode" size={20} color={colors.card} />
          </Pressable>
        </View>

        {/* Form Fields */}
        <View style={styles.formFields}>
          {/* Nombre */}
          <Text style={styles.label}>Nombre del producto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Leche"
            placeholderTextColor={colors.textMuted}
            value={formData.name}
            onChangeText={(text) => handleTextChange('name', text)}
          />

          {/* Categoría (Simplified Select) */}
          <Text style={styles.label}>Categoría *</Text>
          <Pressable onPress={() => alert('Selector de categoría: ' + CATEGORIES.filter(c => c !== 'Todos').join(', '))} style={styles.selectTrigger}>
            <Text style={styles.selectValue}>{formData.category || 'Seleccionar categoría'}</Text>
            <Feather name="chevron-down" size={20} color={colors.textMuted} />
          </Pressable>
          
          {/* Cantidad y Unidad */}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Cantidad *</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                value={formData.quantity}
                onChangeText={(text) => handleTextChange('quantity', text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Unidad</Text>
              <Pressable onPress={() => alert('Selector de unidad: ' + ['unidades', 'kilogramos', 'litros', 'paquetes'].join(', '))} style={styles.selectTrigger}>
                <Text style={styles.selectValue}>{formData.unit}</Text>
                <Feather name="chevron-down" size={20} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          {/* Fecha de vencimiento */}
          <Text style={styles.label}>Fecha de vencimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textMuted}
            value={formData.expirationDate}
            onChangeText={(text) => handleTextChange('expirationDate', text)}
            // Nota: En RN se usaría un date picker nativo o de la comunidad
          />
          
          {/* Precio */}
          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            value={formData.price}
            onChangeText={(text) => handleTextChange('price', text)}
            keyboardType="numeric"
          />

          {/* Marca */}
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Dos Pinos"
            placeholderTextColor={colors.textMuted}
            value={formData.brand}
            onChangeText={(text) => handleTextChange('brand', text)}
          />

          {/* Lugar de compra (Simplified Select) */}
          <Text style={styles.label}>Lugar de compra</Text>
          <Pressable onPress={() => alert('Selector de tienda: ' + STORES.join(', '))} style={styles.selectTrigger}>
            <Text style={styles.selectValue}>{formData.store}</Text>
            <Feather name="chevron-down" size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Submit Button */}
        <Pressable onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Agregar Producto</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.card
  },
  contentContainer: {
    paddingBottom: spacing.xl * 4, // Espacio extra para el BottomNavigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card
  },
  backButton: {
    paddingRight: spacing.md
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text
  },
  form: {
    padding: spacing.lg,
    gap: spacing.lg * 1.5,
  },
  imageSection: {
    alignItems: 'center',
    gap: spacing.md
  },
  imagePlaceholder: {
    width: 128,
    height: 128,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: radii.md,
  },
  removeImageButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: '#AC2C2F',
    padding: spacing.xs / 2,
    borderRadius: radii.full,
    zIndex: 10
  },
  imageButtons: {
    flexDirection: 'row',
    gap: spacing.md
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    gap: spacing.xs
  },
  actionButtonText: {
    color: colors.card,
    fontWeight: '600'
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: '#AC2C2F',
    backgroundColor: colors.card,
  },
  galleryButtonText: {
    color: '#AC2C2F',
    fontWeight: '600'
  },
  barcodeSection: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  scannerButton: {
    backgroundColor: '#AC2C2F',
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formFields: {
    gap: spacing.lg
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border
  },
  selectTrigger: {
    backgroundColor: colors.background,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectValue: {
    fontSize: 16,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md
  },
  col: {
    flex: 1,
    gap: spacing.xs
  },
  submitButton: {
    backgroundColor: '#AC2C2F',
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm
  },
  submitButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700'
  }
});