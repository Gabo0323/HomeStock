import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SummaryTile } from '@/components/SummaryTile';
import { Notification, Product, Purchase } from '@/types';
import { colors, spacing } from '@/theme';
import { Feather } from '@expo/vector-icons';

interface DashboardScreenProps {
  products: Product[];
  notifications: Notification[];
  purchases: Purchase[];
}

function formatCurrency(amount: number) {
  // Nota: Asegúrate de que tu entorno React Native soporte Intl.NumberFormat
  return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(amount);
}

export function DashboardScreen({ products, notifications, purchases }: DashboardScreenProps) {
  const lowStockCount = products.filter((product) => product.status !== 'good').length;
  const expiringCount = products.filter((product) => product.status === 'warning' || product.status === 'expired').length;
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;
  const monthlySpend = purchases.reduce((total, purchase) => total + purchase.total, 0);
  const upcomingExpirations = products.filter((product) => product.status === 'warning').slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Resumen</Text>
      <View style={styles.tileGrid}>
        <View style={styles.tile}>
          <SummaryTile
            title="Productos totales"
            value={`${products.length}`}
            icon={<Feather name="archive" size={20} color={colors.primary} />}
          />
        </View>
        <View style={styles.tile}>
          <SummaryTile
            title="Stock crítico"
            value={`${lowStockCount}`}
            subtitle="Revisa antes de la próxima compra"
            icon={<Feather name="alert-triangle" size={20} color={colors.warning} />}
            tone={lowStockCount > 0 ? 'warning' : 'default'}
          />
        </View>
        <View style={styles.tile}>
          <SummaryTile
            title="Por vencer"
            value={`${expiringCount}`}
            icon={<Feather name="clock" size={20} color={colors.warning} />}
            tone={expiringCount > 0 ? 'danger' : 'default'}
          />
        </View>
        <View style={styles.tile}>
          <SummaryTile
            title="Gasto mensual"
            value={formatCurrency(monthlySpend)}
            icon={<Feather name="credit-card" size={20} color={colors.primary} />}
          />
        </View>
        <View style={styles.tile}>
          <SummaryTile
            title="Alertas sin leer"
            value={`${unreadNotifications}`}
            icon={<Feather name="bell" size={20} color={colors.primary} />}
            tone={unreadNotifications > 0 ? 'warning' : 'default'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos vencimientos</Text>
        {upcomingExpirations.length === 0 ? (
          <Text style={styles.emptyText}>No tienes productos próximos a vencer.</Text>
        ) : (
          upcomingExpirations.map((product) => (
            <View key={product.id} style={styles.expiringItem}>
              <View style={styles.expiringBullet} />
              <View style={styles.expiringContent}>
                <Text style={styles.expiringName}>{product.name}</Text>
                <Text style={styles.expiringMeta}>Caduca {product.expirationDate}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimas alertas</Text>
        {notifications.slice(0, 3).map((notification) => (
          <View key={notification.id} style={styles.notificationRow}>
            <Feather name="bell" size={18} color={colors.primary} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gasto reciente</Text>
        {purchases.slice(0, 2).map((purchase) => (
          <View key={purchase.id} style={styles.purchaseRow}>
            <View>
              <Text style={styles.purchaseStore}>{purchase.store}</Text>
              <Text style={styles.purchaseMeta}>{new Date(purchase.date).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.purchaseTotal}>{formatCurrency(purchase.total)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.lg
  },
  tile: {
    width: '48%',
    marginBottom: spacing.md
  },
  section: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 16,
    marginTop: spacing.lg
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted
  },
  expiringItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm
  },
  expiringBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
    marginRight: spacing.sm
  },
  expiringContent: {
    flex: 1
  },
  expiringName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text
  },
  expiringMeta: {
    fontSize: 12,
    color: colors.textMuted
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm
  },
  notificationContent: {
    flex: 1,
    marginLeft: spacing.sm
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text
  },
  notificationMessage: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2
  },
  purchaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm
  },
  purchaseStore: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text
  },
  purchaseMeta: {
    fontSize: 12,
    color: colors.textMuted
  },
  purchaseTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary
  }
});