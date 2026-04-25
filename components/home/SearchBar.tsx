import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { hapticLight } from '../../utils/haptics';

type SearchBarProps = {
  value: string;
  onChangeText: (t: string) => void;
  onFiltersPress?: () => void;
  filterCount?: number;
};

export function SearchBar({ value, onChangeText, onFiltersPress, filterCount = 0 }: SearchBarProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search location or place"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          returnKeyType="search"
        />
        <View style={styles.divider} />
        <Pressable
          onPress={() => {
            hapticLight();
            onFiltersPress?.();
          }}
          accessibilityRole="button"
          accessibilityLabel="Filters"
          style={({ pressed }) => [styles.filterBtn, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.filterText}>Filters</Text>
          {filterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filterCount}</Text>
            </View>
          )}
          <Ionicons name="options-outline" size={18} color="#1E3A5F" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 4,
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 10,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingLeft: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  filterBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
