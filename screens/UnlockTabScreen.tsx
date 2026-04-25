import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useApp } from '../context/AppProvider';
import type { UnlockEntry } from '../types/unlock';

type Props = {
  onBackToMap: () => void;
};

function formatWhen(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

function UnlockRow({ item }: { item: UnlockEntry }) {
  const isPay = item.kind === 'payment';
  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, isPay ? styles.iconPay : styles.iconCode]}>
        <Ionicons name={isPay ? 'card' : 'key'} size={20} color={isPay ? '#CA8A04' : '#2563EB'} />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>
          {isPay ? 'Paid access' : 'Code unlock'}
          {item.restroomName ? ` · ${item.restroomName}` : ''}
        </Text>
        <Text style={styles.rowMeta}>
          {formatWhen(item.createdAt)}
          {isPay && item.amountUsd != null ? ` · $${item.amountUsd.toFixed(2)}` : ''}
          {!isPay && item.code ? ` · ${item.code}` : ''}
        </Text>
      </View>
    </View>
  );
}

export function UnlockTabScreen({ onBackToMap }: Props) {
  const { unlocks } = useApp();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Unlocks</Text>
        <Text style={styles.caption}>Payments and codes applied on this device</Text>
      </View>

      {unlocks.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="lock-open-outline" size={48} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>No unlocks yet</Text>
          <Text style={styles.emptyBody}>
            Pay for a premium spot on the map or enter a partner code from the home screen.
          </Text>
        </View>
      ) : (
        <FlatList
          data={unlocks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <UnlockRow item={item} />}
        />
      )}

      <Text style={styles.legal}>
        Demo only — replace with server-backed entitlements for production.
      </Text>

      <Pressable onPress={onBackToMap} style={({ pressed }) => [styles.cta, pressed && { opacity: 0.92 }]}>
        <Ionicons name="map" size={20} color="#FFFFFF" />
        <Text style={styles.ctaText}>Back to map</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  caption: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
  },
  emptyBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPay: {
    backgroundColor: '#FFFBEB',
  },
  iconCode: {
    backgroundColor: '#EFF6FF',
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },
  legal: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1E3A5F',
    paddingVertical: 16,
    borderRadius: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
