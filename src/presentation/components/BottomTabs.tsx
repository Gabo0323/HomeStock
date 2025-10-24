import { View, Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';
import { ReactNode } from 'react';

interface TabItem {
  key: string;
  label: string;
  icon: ReactNode;
}

interface BottomTabsProps {
  tabs: TabItem[];
  activeKey: string;
  onTabPress: (key: string) => void;
}

export function BottomTabs({ tabs, activeKey, onTabPress }: BottomTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <View style={styles.icon}>{tab.icon}</View>
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e8f0'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm
  },
  activeTab: {
    backgroundColor: colors.primaryMuted
  },
  icon: {
    marginBottom: spacing.xs
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500'
  },
  activeLabel: {
    color: colors.primary
  }
});
