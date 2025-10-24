import { View, Text, StyleSheet } from 'react-native';
import { Notification } from '@/types';
import { colors, radii, spacing } from '@/theme';

interface NotificationCardProps {
  notification: Notification;
}

const priorityColors: Record<Notification['priority'], string> = {
  high: colors.danger,
  medium: colors.warning,
  low: colors.success
};

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.priority, { backgroundColor: priorityColors[notification.priority] }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.meta}>{new Date(notification.date).toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'flex-start'
  },
  priority: {
    width: 6,
    borderRadius: radii.full,
    alignSelf: 'stretch'
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2
  }
});
