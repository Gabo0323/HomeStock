import { View, Text, StyleSheet } from 'react-native';
import { ShoppingList } from '@/types';
import { colors, radii, spacing } from '@/theme';

interface ShoppingListCardProps {
  list: ShoppingList;
}

export function ShoppingListCard({ list }: ShoppingListCardProps) {
  const checked = list.items.filter((item) => item.checked).length;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.name}</Text>
      <Text style={styles.meta}>{new Date(list.createdAt).toLocaleDateString()}</Text>
      <View style={styles.footer}>
        <Text style={styles.summary}>
          {checked}/{list.items.length} artículos
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4
  },
  footer: {
    marginTop: spacing.xs
  },
  summary: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary
  }
});
