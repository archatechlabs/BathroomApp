import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { Restroom } from '../../data/mockRestrooms';

type Props = {
  restroom: Restroom;
};

const PIN_BG: Record<Restroom['type'], string> = {
  verified: '#22C55E',
  paid: '#EAB308',
  standard: '#1E3A5F',
  premium: '#86EFAC',
};

function MarkerIcon({ restroom }: Props) {
  if (restroom.type === 'standard') {
    return <MaterialCommunityIcons name="toilet" size={16} color="#FFFFFF" />;
  }
  if (restroom.type === 'verified') {
    return <Ionicons name="checkmark" size={18} color="#FFFFFF" />;
  }
  if (restroom.type === 'paid') {
    return <Ionicons name="lock-closed" size={16} color="#FFFFFF" />;
  }
  return <Ionicons name="lock-closed" size={16} color="#14532D" />;
}

export function MapMarker({ restroom }: Props) {
  const bg = PIN_BG[restroom.type];

  return (
    <View style={styles.anchor}>
      {restroom.showPriceLabel && restroom.price != null && (
        <View style={styles.priceBubble}>
          <Text style={styles.priceText}>${restroom.price}</Text>
        </View>
      )}
      <View style={[styles.pin, { backgroundColor: bg }]}>
        <MarkerIcon restroom={restroom} />
      </View>
      <View style={[styles.tail, { borderTopColor: bg }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    alignItems: 'center',
  },
  priceBubble: {
    marginBottom: 4,
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  pin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
});
