import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useApp } from '../context/AppProvider';
import type { Restroom } from '../types/restroom';
import { hapticLight } from '../utils/haptics';

type Props = {
  onBackToMap: () => void;
  onSelectRestroom: (r: Restroom) => void;
};

export function FavoritesTabScreen({ onBackToMap, onSelectRestroom }: Props) {
  const { favorites, restrooms, toggleFavorite } = useApp();

  const saved = restrooms.filter((r) => favorites.includes(r.id));

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.caption}>Places you’ve saved from the map</Text>
      </View>

      {saved.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={48} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>No saved places yet</Text>
          <Text style={styles.emptyBody}>
            Open the map, tap a restroom, and tap the heart on the detail card to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.row, pressed && { opacity: 0.92 }]}
              onPress={() => {
                hapticLight();
                onSelectRestroom(item);
              }}
            >
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>{item.name}</Text>
                <Text style={styles.rowMeta}>{item.distance} · ★ {item.rating}</Text>
              </View>
              <Pressable
                onPress={() => toggleFavorite(item.id)}
                hitSlop={10}
                accessibilityLabel="Remove favorite"
              >
                <Ionicons name="heart" size={22} color="#DB2777" />
              </Pressable>
            </Pressable>
          )}
        />
      )}

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
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
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
