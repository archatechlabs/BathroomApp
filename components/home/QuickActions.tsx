import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { hapticLight } from '../../utils/haptics';

type Props = {
  onPayForAccess?: () => void;
  onEnterCode?: () => void;
  onSafeInclusive?: () => void;
};

export function QuickActions({ onPayForAccess, onEnterCode, onSafeInclusive }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Pay for access"
        onPress={() => {
          hapticLight();
          onPayForAccess?.();
        }}
        style={({ pressed }) => [styles.pill, styles.pillPay, pressed && styles.pillPressed]}
      >
        <Text style={styles.pIcon}>P</Text>
        <Text style={styles.label} numberOfLines={1}>
          Pay for Access
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Enter code"
        onPress={() => {
          hapticLight();
          onEnterCode?.();
        }}
        style={({ pressed }) => [styles.pill, styles.pillCode, pressed && styles.pillPressed]}
      >
        <Ionicons name="qr-code-outline" size={18} color="#1E3A5F" />
        <Text style={styles.label} numberOfLines={1}>
          Enter Code
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Safe and inclusive"
        onPress={() => {
          hapticLight();
          onSafeInclusive?.();
        }}
        style={({ pressed }) => [styles.pill, styles.pillSafe, pressed && styles.pillPressed]}
      >
        <Ionicons name="heart" size={18} color="#DB2777" />
        <Text style={styles.label} numberOfLines={1}>
          Safe & Inclusive
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  pillPay: {
    backgroundColor: '#FFFBEB',
  },
  pillCode: {
    backgroundColor: '#EFF6FF',
  },
  pillSafe: {
    backgroundColor: '#FDF2F8',
  },
  pillPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  pIcon: {
    fontSize: 16,
    fontWeight: '900',
    color: '#CA8A04',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    flexShrink: 1,
  },
});
