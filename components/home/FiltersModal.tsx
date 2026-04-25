import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type FilterOptions = {
  verifiedOnly: boolean;
  accessibleOnly: boolean;
  paidOnly: boolean;
};

type Props = {
  visible: boolean;
  value: FilterOptions;
  onChange: (next: FilterOptions) => void;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
};

export function FiltersModal({
  visible,
  value,
  onChange,
  onClose,
  onApply,
  onReset,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 20) }]} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={styles.title}>Filters</Text>
          <Text style={styles.caption}>Refine what shows on the map</Text>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Verified only</Text>
              <Text style={styles.hint}>Partner-checked locations</Text>
            </View>
            <Switch
              value={value.verifiedOnly}
              onValueChange={(v) => onChange({ ...value, verifiedOnly: v })}
              trackColor={{ false: '#E2E8F0', true: '#86EFAC' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Accessible</Text>
              <Text style={styles.hint}>Wheelchair-friendly</Text>
            </View>
            <Switch
              value={value.accessibleOnly}
              onValueChange={(v) => onChange({ ...value, accessibleOnly: v })}
              trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Paid access</Text>
              <Text style={styles.hint}>Premium / pay-to-enter</Text>
            </View>
            <Switch
              value={value.paidOnly}
              onValueChange={(v) => onChange({ ...value, paidOnly: v })}
              trackColor={{ false: '#E2E8F0', true: '#FDE047' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.actions}>
            <Pressable onPress={onReset} style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}>
              <Text style={styles.btnGhostText}>Reset</Text>
            </Pressable>
            <Pressable
              onPress={onApply}
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
            >
              <Text style={styles.btnPrimaryText}>Apply filters</Text>
              <Ionicons name="checkmark-circle" size={20} color="#0F172A" />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  caption: {
    marginTop: 4,
    marginBottom: 20,
    fontSize: 14,
    color: '#64748B',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  hint: {
    marginTop: 2,
    fontSize: 13,
    color: '#94A3B8',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  btnGhost: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  btnPrimary: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FACC15',
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});
