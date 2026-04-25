import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '../../context/AppProvider';
import { hapticLight, hapticSuccess } from '../../utils/haptics';

const ITEMS = [
  {
    id: '1',
    title: 'Welcome to Restroom Now',
    body: 'Verified partners near you are ready when you need them.',
    time: 'Just now',
    icon: 'star' as const,
    color: '#2563EB',
  },
  {
    id: '2',
    title: 'Skip the line',
    body: 'Pay $2 for instant access at Premium Lounge — tap Pay & Unlock.',
    time: '2h ago',
    icon: 'flash' as const,
    color: '#CA8A04',
  },
  {
    id: '3',
    title: 'Inclusive spaces',
    body: 'Filter for accessible restrooms anytime from the map filters.',
    time: 'Yesterday',
    icon: 'heart' as const,
    color: '#DB2777',
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function NotificationsModal({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { requestPushNotifications, pushPermissionStatus } = useApp();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 20) }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <Pressable onPress={onClose} hitSlop={12} style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}>
              <Ionicons name="close" size={26} color="#0F172A" />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
            {ITEMS.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.item, pressed && { backgroundColor: '#F8FAFC' }]}
              >
                <View style={[styles.itemIcon, { backgroundColor: `${item.color}18` }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemText}>{item.body}</Text>
                  <Text style={styles.itemTime}>{item.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.pushSection}>
            <Text style={styles.pushLabel}>Device permission: {pushPermissionStatus}</Text>
            <Pressable
              onPress={async () => {
                hapticLight();
                const ok = await requestPushNotifications();
                if (ok) hapticSuccess();
              }}
              style={({ pressed }) => [styles.pushBtn, pressed && { opacity: 0.9 }]}
            >
              <Ionicons name="notifications" size={18} color="#0F172A" />
              <Text style={styles.pushBtnText}>Enable notification permission</Text>
            </Pressable>
            <Text style={styles.pushFoot}>
              Remote push requires APNs/FCM setup. This only requests OS permission.
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  list: {
    paddingBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBody: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemText: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  itemTime: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  pushSection: {
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
    marginBottom: 8,
  },
  pushLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 10,
  },
  pushBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FACC15',
    paddingVertical: 14,
    borderRadius: 14,
  },
  pushBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  pushFoot: {
    marginTop: 10,
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
});
