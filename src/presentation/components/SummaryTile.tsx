import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { ReactNode } from 'react';

interface SummaryTileProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export function SummaryTile({ title, value, subtitle, icon, tone = 'default' }: SummaryTileProps) {
  const toneStyles = toneMap[tone];
  return (
    <View style={[styles.container, toneStyles.container]}>
      {icon && <View style={[styles.icon, toneStyles.icon]}>{icon}</View>}
      <Text style={[styles.title, toneStyles.title]}>{title}</Text>
      <Text style={[styles.value, toneStyles.value]}>{value}</Text>
      {subtitle && <Text style={[styles.subtitle, toneStyles.subtitle]}>{subtitle}</Text>}
    </View>
  );
}

const toneMap = {
  default: StyleSheet.create({
    container: { backgroundColor: colors.card },
    icon: {},
    title: { color: colors.textMuted },
    value: { color: colors.text },
    subtitle: { color: colors.textMuted }
  }),
  success: StyleSheet.create({
    container: { backgroundColor: '#dcfce7' },
    icon: {},
    title: { color: colors.success },
    value: { color: colors.text },
    subtitle: { color: colors.textMuted }
  }),
  warning: StyleSheet.create({
    container: { backgroundColor: '#fef3c7' },
    icon: {},
    title: { color: colors.warning },
    value: { color: colors.text },
    subtitle: { color: colors.textMuted }
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: '#fee2e2' },
    icon: {},
    title: { color: colors.danger },
    value: { color: colors.text },
    subtitle: { color: colors.textMuted }
  })
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radii.md,
    height: '100%'
  },
  icon: {
    alignSelf: 'flex-start',
    marginBottom: spacing.xs
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs / 2
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.xs / 2
  },
  subtitle: {
    fontSize: 12
  }
});
