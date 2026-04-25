import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
  onRetry?: () => void;
  sourceLabel?: string;
};

export function RestroomErrorBanner({ message, onRetry, sourceLabel }: Props) {
  return (
    <View style={styles.bar}>
      <Ionicons name="cloud-offline-outline" size={18} color="#B45309" />
      <View style={styles.textCol}>
        <Text style={styles.title}>Using offline / demo data</Text>
        <Text style={styles.sub} numberOfLines={2}>
          {message}
          {sourceLabel ? ` · ${sourceLabel}` : ''}
        </Text>
      </View>
      {onRetry && (
        <Pressable onPress={onRetry} hitSlop={8} style={({ pressed }) => [styles.retry, pressed && { opacity: 0.75 }]}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  sub: {
    marginTop: 2,
    fontSize: 12,
    color: '#B45309',
  },
  retry: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  retryText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E3A5F',
  },
});
