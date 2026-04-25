import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import type { Restroom } from '../../data/mockRestrooms';
import { NYC_REGION } from '../../data/mockRestrooms';
import { MapMarker } from './MapMarker';

type Props = {
  restrooms: Restroom[];
  onMarkerPress: (r: Restroom) => void;
  onMapPress: () => void;
  nearbyCount?: number;
  /** When set, map animates to center this point (e.g. after marker tap). */
  focusCoordinate?: { latitude: number; longitude: number } | null;
  children?: React.ReactNode;
};

export function MapViewSection({
  restrooms,
  onMarkerPress,
  onMapPress,
  nearbyCount = 17,
  focusCoordinate,
  children,
}: Props) {
  const mapRef = useRef<MapView>(null);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setTracksViewChanges(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!focusCoordinate) return;
    mapRef.current?.animateToRegion(
      {
        latitude: focusCoordinate.latitude,
        longitude: focusCoordinate.longitude,
        latitudeDelta: 0.014,
        longitudeDelta: 0.014,
      },
      380,
    );
  }, [focusCoordinate?.latitude, focusCoordinate?.longitude]);

  return (
    <View style={styles.mapShell}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={NYC_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        onPress={onMapPress}
        mapPadding={{ top: 8, right: 8, bottom: 140, left: 8 }}
      >
        {restrooms.map((r) => (
          <Marker
            key={r.id}
            coordinate={{ latitude: r.latitude, longitude: r.longitude }}
            onPress={() => onMarkerPress(r)}
            tracksViewChanges={tracksViewChanges}
            anchor={{ x: 0.5, y: 1 }}
          >
            <MapMarker restroom={r} />
          </Marker>
        ))}
      </MapView>

      <View style={styles.statusChip} pointerEvents="box-none">
        <View style={styles.statusInner}>
          <Ionicons name="compass" size={16} color="#FFFFFF" />
          <Text style={styles.statusText}>{nearbyCount} Available Nearby</Text>
          <View style={styles.glowDot} />
        </View>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mapShell: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 12,
    backgroundColor: '#E2E8F0',
  },
  statusChip: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 2,
  },
  statusInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E3A5F',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  glowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FB923C',
    shadowColor: '#FB923C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 6,
    elevation: 2,
  },
});
