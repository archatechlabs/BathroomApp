import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { hapticLight } from '../../utils/haptics';

const THUMB =
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=240&q=80';

const TAGS = [
  { key: 'clean', label: 'Super Clean', icon: 'checkmark-circle' as const, color: '#16A34A' },
  { key: 'wait', label: 'No Wait', icon: 'checkmark-circle' as const, color: '#16A34A' },
  { key: 'acc', label: 'Accessible', icon: 'accessibility' as const, color: '#2563EB' },
];

type Props = {
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function FeaturedCard({ onPress, isFavorite, onToggleFavorite }: Props) {
  const open = () => {
    hapticLight();
    onPress?.();
  };

  return (
    <View style={styles.card}>
      <View style={styles.thumbWrap}>
        <Pressable onPress={open} accessibilityLabel="Open featured location on map">
          <Image source={{ uri: THUMB }} style={styles.thumb} />
        </Pressable>
        {onToggleFavorite && (
          <Pressable
            onPress={() => {
              hapticLight();
              onToggleFavorite();
            }}
            hitSlop={8}
            style={({ pressed }) => [styles.favFab, pressed && { opacity: 0.85 }]}
            accessibilityLabel={isFavorite ? 'Remove favorite' : 'Add favorite'}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavorite ? '#DB2777' : '#FFFFFF'}
            />
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={open}
        style={({ pressed }) => [styles.body, pressed && styles.bodyPressed]}
        accessibilityRole="button"
        accessibilityLabel="Featured location, Starbucks Times Square"
      >
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            Starbucks Times Square
          </Text>
          <View style={styles.stars}>
            <Ionicons name="moon-outline" size={14} color="#64748B" />
            <StarRow filled={3} total={5} />
          </View>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location" size={14} color="#22C55E" />
          <Text style={styles.meta}>Verified Partner • 350 ft Away</Text>
        </View>
        <View style={styles.tags}>
          {TAGS.map((t) => (
            <View key={t.key} style={styles.tag}>
              <Ionicons name={t.icon} size={14} color={t.color} />
              <Text style={styles.tagText}>{t.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chevronRow}>
          <Text style={styles.tapHint}>Tap to view on map</Text>
          <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </View>
      </Pressable>
    </View>
  );
}

function StarRow({ filled, total }: { filled: number; total: number }) {
  return (
    <View style={styles.starRow}>
      {Array.from({ length: total }, (_, i) => (
        <Ionicons
          key={i}
          name={i < filled ? 'star' : 'star-outline'}
          size={14}
          color={i < filled ? '#EAB308' : '#CBD5E1'}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  thumbWrap: {
    position: 'relative',
  },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  favFab: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  bodyPressed: {
    opacity: 0.96,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  stars: {
    alignItems: 'flex-end',
    gap: 4,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  meta: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  chevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 8,
  },
  tapHint: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
