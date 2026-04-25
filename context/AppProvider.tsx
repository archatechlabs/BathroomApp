import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { loadRestrooms, type RestroomLoadResult } from '../services/restroomService';
import type { Restroom } from '../types/restroom';
import type { UnlockEntry } from '../types/unlock';

const KEYS = {
  user: '@restroom_now/user',
  favorites: '@restroom_now/favorites',
  unlocks: '@restroom_now/unlocks',
};

type User = { email: string };

type AppContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
  unlocks: UnlockEntry[];
  addPaymentUnlock: (restroom: Restroom, amountUsd: number) => Promise<void>;
  addCodeUnlock: (code: string, restroomName?: string) => Promise<void>;
  restrooms: Restroom[];
  restroomSource: RestroomLoadResult['source'];
  restroomError: string | null;
  loadingRestrooms: boolean;
  refreshRestrooms: () => Promise<void>;
  pushPermissionStatus: 'unknown' | 'granted' | 'denied';
  requestPushNotifications: () => Promise<boolean>;
};

const AppContext = createContext<AppContextValue | null>(null);

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

async function loadJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [unlocks, setUnlocks] = useState<UnlockEntry[]>([]);
  const [restrooms, setRestrooms] = useState<Restroom[]>([]);
  const [restroomSource, setRestroomSource] = useState<RestroomLoadResult['source']>('mock');
  const [restroomError, setRestroomError] = useState<string | null>(null);
  const [loadingRestrooms, setLoadingRestrooms] = useState(true);
  const [pushPermissionStatus, setPushPermissionStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  useEffect(() => {
    (async () => {
      const [u, fav, un] = await Promise.all([
        loadJson<User | null>(KEYS.user, null),
        loadJson<string[]>(KEYS.favorites, []),
        loadJson<UnlockEntry[]>(KEYS.unlocks, []),
      ]);
      setUser(u);
      setFavorites(Array.isArray(fav) ? fav : []);
      setUnlocks(Array.isArray(un) ? un : []);
      setHydrated(true);
    })();
  }, []);

  const refreshRestrooms = useCallback(async () => {
    setLoadingRestrooms(true);
    setRestroomError(null);
    try {
      const result = await loadRestrooms();
      setRestrooms(result.restrooms);
      setRestroomSource(result.source);
      setRestroomError(result.error);
    } catch (e) {
      setRestroomError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoadingRestrooms(false);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    refreshRestrooms();
  }, [hydrated, refreshRestrooms]);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    Notifications.getPermissionsAsync().then(({ status }) => {
      setPushPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    });
  }, []);

  const persistUser = useCallback(async (next: User | null) => {
    setUser(next);
    if (next) await AsyncStorage.setItem(KEYS.user, JSON.stringify(next));
    else await AsyncStorage.removeItem(KEYS.user);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const e = email.trim().toLowerCase();
      if (!e.includes('@')) {
        return { ok: false, message: 'Enter a valid email.' };
      }
      if (password.length < 6) {
        return { ok: false, message: 'Password must be at least 6 characters.' };
      }
      await persistUser({ email: e });
      return { ok: true };
    },
    [persistUser],
  );

  const logout = useCallback(async () => {
    await persistUser(null);
  }, [persistUser]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleFavorite = useCallback(async (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      void AsyncStorage.setItem(KEYS.favorites, JSON.stringify(next));
      return next;
    });
  }, []);

  const addPaymentUnlock = useCallback(async (restroom: Restroom, amountUsd: number) => {
    const entry: UnlockEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      kind: 'payment',
      createdAt: new Date().toISOString(),
      restroomId: restroom.id,
      restroomName: restroom.name,
      amountUsd,
    };
    setUnlocks((prev) => {
      const next = [entry, ...prev];
      void AsyncStorage.setItem(KEYS.unlocks, JSON.stringify(next));
      return next;
    });
  }, []);

  const addCodeUnlock = useCallback(async (code: string, restroomName?: string) => {
    const entry: UnlockEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      kind: 'code',
      createdAt: new Date().toISOString(),
      code,
      restroomName,
    };
    setUnlocks((prev) => {
      const next = [entry, ...prev];
      void AsyncStorage.setItem(KEYS.unlocks, JSON.stringify(next));
      return next;
    });
  }, []);

  const requestPushNotifications = useCallback(async () => {
    if (Platform.OS === 'web') return false;
    try {
      const { status: existing } = await Notifications.getPermissionsAsync();
      let final = existing;
      if (existing !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        final = status;
      }
      setPushPermissionStatus(final === 'granted' ? 'granted' : 'denied');
      if (final === 'granted' && Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      return final === 'granted';
    } catch {
      setPushPermissionStatus('denied');
      return false;
    }
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      login,
      logout,
      favorites,
      isFavorite,
      toggleFavorite,
      unlocks,
      addPaymentUnlock,
      addCodeUnlock,
      restrooms,
      restroomSource,
      restroomError,
      loadingRestrooms,
      refreshRestrooms,
      pushPermissionStatus,
      requestPushNotifications,
    }),
    [
      user,
      login,
      logout,
      favorites,
      isFavorite,
      toggleFavorite,
      unlocks,
      addPaymentUnlock,
      addCodeUnlock,
      restrooms,
      restroomSource,
      restroomError,
      loadingRestrooms,
      refreshRestrooms,
      pushPermissionStatus,
      requestPushNotifications,
    ],
  );

  if (!hydrated) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" color="#1E3A5F" />
      </View>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
