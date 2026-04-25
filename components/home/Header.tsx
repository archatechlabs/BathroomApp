import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { hapticLight } from '../../utils/haptics';

type Props = {
  onNotificationsPress?: () => void;
};

export function Header({ onNotificationsPress }: Props) {
  return (
    <LinearGradient
      colors={['#F8FAFC', '#F1F5F9']}
      style={styles.gradient}
    >
      <View style={styles.row}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <MaterialCommunityIcons name="toilet" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.title}>Restroom Now</Text>
            <Text style={styles.subtitle}>Find Clean & Verified Restrooms</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() => {
            hapticLight();
            onNotificationsPress?.();
          }}
          style={({ pressed }) => [styles.bell, pressed && styles.bellPressed]}
        >
          <Ionicons name="notifications-outline" size={22} color="#1E3A5F" />
          <View style={styles.badge} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E40AF',
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  bell: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  bellPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FB923C',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
