import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Notification } from '@/types';
import { NotificationCard } from '@/components/NotificationCard';
import { colors, spacing } from '@/theme';

interface NotificationsScreenProps {
  notifications: Notification[];
}

export function NotificationsScreen({ notifications }: NotificationsScreenProps) {
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Alertas</Text>
      <View style={styles.list}>
        {sortedNotifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
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
    padding: spacing.lg
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg
  },
  list: {}
});
