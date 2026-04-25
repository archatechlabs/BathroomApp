import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { Restroom, RestroomMapType } from '../../data/mockRestrooms';

type Props = {
  selected: Restroom | null;
  visible: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPayPress?: () => void;
  onDismiss?: () => void;
};

function typeMeta(type: RestroomMapType): { label: string; color: string } {
  switch (type) {
    case 'verified':
      return { label: 'Verified', color: '#16A34A' };
    case 'standard':
      return { label: 'Standard', color: '#2563EB' };
    case 'paid':
      return { label: 'Paid', color: '#CA8A04' };
    case 'premium':
      return { label: 'Premium', color: '#15803D' };
  }
}

function openDirections(lat: number, lng: number, label: string) {
  const q = encodeURIComponent(label);
  const fallback = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const url =
    Platform.OS === 'ios'
      ? `maps:0,0?q=${q}&ll=${lat},${lng}`
      : `geo:0,0?q=${lat},${lng}(${q})`;
  Linking.openURL(url).catch(() => Linking.openURL(fallback));
}

function StarRow({ value }: { value: number }) {
  const full = Math.round(Math.min(5, Math.max(0, value)));
  return (
    <View style={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Ionicons
          key={i}
          name={i < full ? 'star' : 'star-outline'}
          size={14}
          color={i < full ? '#EAB308' : '#CBD5E1'}
        />
      ))}
    </View>
  );
}

export function ActionCard({
  selected,
  visible,
  isFavorite,
  onToggleFavorite,
  onPayPress,
  onDismiss,
}: Props) {
  const translateY = useRef(new Animated.Value(140)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 140,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }
    translateY.setValue(56);
    opacity.setValue(0);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 220,
        mass: 0.8,
      }),
    ]).start();
  }, [visible, selected?.id, translateY, opacity]);

  if (!selected) return null;

  const meta = typeMeta(selected.type);
  const needsPay = selected.type === 'paid' || selected.type === 'premium';
  const price = selected.price ?? (needsPay ? 2 : 0);
  const primaryLabel = needsPay ? 'PAY & UNLOCK' : 'GET DIRECTIONS';

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={[styles.typePill, { backgroundColor: `${meta.color}18` }]}>
            <View style={[styles.typeDot, { backgroundColor: meta.color }]} />
            <Text style={[styles.typeText, { color: meta.color }]}>{meta.label}</Text>
          </View>
          <View style={styles.cardTopActions}>
            {onToggleFavorite && (
              <Pressable
                onPress={onToggleFavorite}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.65 }]}
              >
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? '#DB2777' : '#64748B'} />
              </Pressable>
            )}
            <Pressable
              onPress={onDismiss}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.65 }]}
            >
              <Ionicons name="close" size={22} color="#64748B" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.name}>{selected.name}</Text>

        <View style={styles.metaRow}>
          <Ionicons name="navigate-outline" size={15} color="#64748B" />
          <Text style={styles.metaText}>{selected.distance} away</Text>
          <Text style={styles.metaDot}>·</Text>
          <StarRow value={selected.rating} />
          {needsPay && (
            <>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.priceInline}>${price.toFixed(2)}</Text>
            </>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsScroll}
        >
          {selected.tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagChipText}>{tag}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.rule} />

        <Text style={styles.sectionLabel}>
          {needsPay ? 'Pay now · skip the line' : 'Open in Maps'}
        </Text>
        <Text style={styles.sectionHint}>
          {needsPay
            ? 'Instant entry after a one-tap test payment (demo).'
            : 'Free access — we’ll drop a pin for this location.'}
        </Text>

        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <Pressable
            onPress={() => {
              if (needsPay) onPayPress?.();
              else if (selected) openDirections(selected.latitude, selected.longitude, selected.name);
            }}
            onPressIn={() => {
              Animated.spring(btnScale, {
                toValue: 0.97,
                useNativeDriver: true,
                damping: 18,
                stiffness: 220,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(btnScale, {
                toValue: 1,
                useNativeDriver: true,
                damping: 18,
                stiffness: 220,
              }).start();
            }}
            style={({ pressed }) => [styles.cta, needsPay ? styles.ctaPay : styles.ctaBlue, pressed && styles.ctaPressed]}
          >
            <Text style={[styles.ctaText, !needsPay && styles.ctaTextLight]}>
              {primaryLabel}
            </Text>
            <Ionicons
              name={needsPay ? 'card-outline' : 'arrow-forward-circle'}
              size={20}
              color={needsPay ? '#1E3A5F' : '#FFFFFF'}
            />
          </Pressable>
        </Animated.View>

        {needsPay && (
          <Pressable
            onPress={() => selected && openDirections(selected.latitude, selected.longitude, selected.name)}
            style={({ pressed }) => [styles.secondaryLink, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.secondaryLinkText}>Directions only</Text>
            <Ionicons name="map-outline" size={16} color="#2563EB" />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    zIndex: 3,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardTopActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  name: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  metaDot: {
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '700',
  },
  priceInline: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  tagsScroll: {
    gap: 8,
    paddingVertical: 12,
    paddingRight: 4,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  tagChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E8F0',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  sectionHint: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaPay: {
    backgroundColor: '#FACC15',
  },
  ctaBlue: {
    backgroundColor: '#1E3A5F',
  },
  ctaPressed: {
    opacity: 0.94,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1E3A5F',
    letterSpacing: 0.4,
  },
  ctaTextLight: {
    color: '#FFFFFF',
  },
  secondaryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 8,
  },
  secondaryLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
});
