import { View, Text, StyleSheet, Image } from 'react-native';
import { Product } from '@/types';
import { colors, radii, spacing } from '@/theme';

interface ProductListItemProps {
  product: Product;
}

const statusColors: Record<Product['status'], string> = {
  good: colors.success,
  warning: colors.warning,
  low: '#f97316',
  expired: colors.danger
};

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={[styles.badge, { backgroundColor: statusColors[product.status] }]}>
            <Text style={styles.badgeText}>{product.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{product.brand}</Text>
        <Text style={styles.meta}>Quedan {product.quantity} {product.unit}</Text>
        <Text style={styles.meta}>Caduca {product.expirationDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    overflow: 'hidden',
    marginBottom: spacing.sm
  },
  image: {
    width: 72,
    height: 72
  },
  content: {
    flex: 1,
    padding: spacing.sm
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text
  },
  badge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radii.full
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700'
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2
  }
});
