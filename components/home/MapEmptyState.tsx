import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onClearFilters?: () => void;
  onRefresh?: () => void;
};

export function MapEmptyState({ onClearFilters, onRefresh }: Props) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.card}>
        <Ionicons name="map-outline" size={40} color="#94A3B8" />
        <Text style={styles.title}>No restrooms match</Text>
        <Text style={styles.body}>
          Try clearing search, widening filters, or refreshing data from your source.
        </Text>
        <View style={styles.row}>
          {onClearFilters && (
            <Pressable onPress={onClearFilters} style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.pressed]}>
              <Text style={styles.btnGhostText}>Clear filters</Text>
            </Pressable>
          )}
          {onRefresh && (
            <Pressable onPress={onRefresh} style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.pressed]}>
              <Ionicons name="refresh" size={18} color="#FFFFFF" />
              <Text style={styles.btnPrimaryText}>Refresh</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  body: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  btnGhost: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnGhostText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  btnPrimary: {
    backgroundColor: '#1E3A5F',
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.88,
  },
});
