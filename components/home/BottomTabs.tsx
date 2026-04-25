import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { hapticLight } from '../../utils/haptics';

export type HomeTabId = 'find' | 'unlock' | 'favorites' | 'profile';

type Props = {
  active: HomeTabId;
  onChange: (id: HomeTabId) => void;
};

const TABS: {
  id: HomeTabId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: 'find', label: 'Find', icon: 'map-outline', activeIcon: 'map' },
  { id: 'unlock', label: 'Unlock', icon: 'lock-closed-outline', activeIcon: 'lock-closed' },
  { id: 'favorites', label: 'Favorites', icon: 'heart-outline', activeIcon: 'heart' },
  { id: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export function BottomTabs({ active, onChange }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.shell, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.topRule} />
      <View style={styles.bar}>
        {TABS.map((t) => {
          const isActive = active === t.id;
          const iconName = isActive ? t.activeIcon : t.icon;
          return (
            <Pressable
              key={t.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => {
                hapticLight();
                onChange(t.id);
              }}
              style={({ pressed }) => [styles.tabHit, pressed && styles.tabPressed]}
            >
              <View style={[styles.pill, isActive && styles.pillActive]}>
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isActive ? '#FACC15' : '#94A3B8'}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1}>
                  {t.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: '#0B1220',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 16,
  },
  topRule: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1E293B',
    marginBottom: 6,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: 4,
  },
  tabHit: {
    flex: 1,
    alignItems: 'center',
  },
  tabPressed: {
    opacity: 0.88,
  },
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 18,
    minWidth: 72,
  },
  pillActive: {
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.35)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#F8FAFC',
    fontWeight: '800',
  },
});
