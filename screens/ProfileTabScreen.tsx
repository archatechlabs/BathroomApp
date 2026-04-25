import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useApp } from '../context/AppProvider';
import { hapticLight, hapticSuccess } from '../utils/haptics';

type Props = {
  onBackToMap: () => void;
};

export function ProfileTabScreen({ onBackToMap }: Props) {
  const {
    user,
    login,
    logout,
    refreshRestrooms,
    loadingRestrooms,
    restroomSource,
    pushPermissionStatus,
    requestPushNotifications,
  } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const version = Constants.expoConfig?.version ?? '—';
  const privacyUrl =
    (Constants.expoConfig?.extra?.privacyPolicyUrl as string) || 'https://www.example.com/privacy';

  const onLogin = async () => {
    setErr(null);
    setBusy(true);
    const r = await login(email, password);
    setBusy(false);
    if (!r.ok) setErr(r.message ?? 'Could not sign in');
    else {
      hapticSuccess();
      setPassword('');
    }
  };

  const onOpenPrivacy = async () => {
    hapticLight();
    await WebBrowser.openBrowserAsync(privacyUrl);
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.caption}>Account, data, and notifications</Text>

      {user ? (
        <View style={styles.card}>
          <Text style={styles.label}>Signed in</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Pressable
            onPress={async () => {
              hapticLight();
              await logout();
            }}
            style={({ pressed }) => [styles.outlineBtn, pressed && { opacity: 0.88 }]}
          >
            <Text style={styles.outlineBtnText}>Sign out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Sign in (demo)</Text>
          <Text style={styles.hint}>Local only — wire to your auth provider later.</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password (min 6 chars)"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {err ? <Text style={styles.err}>{err}</Text> : null}
          <Pressable
            onPress={onLogin}
            disabled={busy}
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]}
          >
            {busy ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryBtnText}>Continue</Text>}
          </Pressable>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Restroom data</Text>
        <Text style={styles.metaLine}>Source: {restroomSource}</Text>
        <Pressable
          onPress={() => {
            hapticLight();
            refreshRestrooms();
          }}
          disabled={loadingRestrooms}
          style={({ pressed }) => [styles.rowBtn, pressed && { opacity: 0.88 }]}
        >
          <Ionicons name="refresh" size={20} color="#1E3A5F" />
          <Text style={styles.rowBtnText}>{loadingRestrooms ? 'Refreshing…' : 'Refresh from API'}</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Push notifications</Text>
        <Text style={styles.metaLine}>Status: {pushPermissionStatus}</Text>
        <Pressable
          onPress={async () => {
            hapticLight();
            const ok = await requestPushNotifications();
            if (ok) hapticSuccess();
          }}
          style={({ pressed }) => [styles.rowBtn, pressed && { opacity: 0.88 }]}
        >
          <Ionicons name="notifications-outline" size={20} color="#1E3A5F" />
          <Text style={styles.rowBtnText}>Request permission</Text>
        </Pressable>
        <Text style={styles.hint}>
          Remote push needs APNs/FCM setup. This enables local permission + channels.
        </Text>
      </View>

      <Pressable onPress={onOpenPrivacy} style={({ pressed }) => [styles.rowBtn, pressed && { opacity: 0.88 }]}>
        <Ionicons name="document-text-outline" size={20} color="#1E3A5F" />
        <Text style={styles.rowBtnText}>Privacy policy</Text>
      </Pressable>

      <Text style={styles.version}>Restroom Now · v{version}</Text>

      <Pressable onPress={onBackToMap} style={({ pressed }) => [styles.mapCta, pressed && { opacity: 0.92 }]}>
        <Ionicons name="map" size={20} color="#FFFFFF" />
        <Text style={styles.mapCtaText}>Back to map</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
  },
  content: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  caption: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
    color: '#64748B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
  },
  hint: {
    marginTop: 6,
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  email: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
  },
  err: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  primaryBtn: {
    marginTop: 14,
    backgroundColor: '#1E3A5F',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  outlineBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  outlineBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748B',
  },
  metaLine: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
  },
  rowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingVertical: 8,
  },
  rowBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  version: {
    marginTop: 8,
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  mapCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    backgroundColor: '#1E3A5F',
    paddingVertical: 16,
    borderRadius: 16,
  },
  mapCtaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
