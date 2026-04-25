import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { MOCK_RESTROOMS } from '../data/mockRestrooms';
import type { Restroom } from '../types/restroom';

const CACHE_KEY = '@restroom_now/restrooms_cache';
const CACHE_TS_KEY = '@restroom_now/restrooms_cache_ts';
const TTL_MS = 60 * 60 * 1000;

function getApiUrl(): string | undefined {
  const fromExtra = Constants.expoConfig?.extra?.restroomApiUrl as string | undefined;
  if (fromExtra?.trim()) return fromExtra.trim();
  return process.env.EXPO_PUBLIC_RESTROOM_API_URL?.trim() || undefined;
}

function normalizePayload(json: unknown): Restroom[] | null {
  if (!json || typeof json !== 'object') return null;
  const o = json as Record<string, unknown>;
  const list = o.restrooms ?? o.data ?? o.results;
  if (!Array.isArray(list)) return null;
  const out: Restroom[] = [];
  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    const id = String(r.id ?? '');
    const name = String(r.name ?? '');
    const lat = Number(r.latitude ?? r.lat);
    const lng = Number(r.longitude ?? r.lng ?? r.lon);
    if (!id || !name || Number.isNaN(lat) || Number.isNaN(lng)) continue;
    const typeRaw = String(r.type ?? 'standard');
    const type = (['verified', 'paid', 'standard', 'premium'].includes(typeRaw)
      ? typeRaw
      : 'standard') as Restroom['type'];
    out.push({
      id,
      name,
      latitude: lat,
      longitude: lng,
      type,
      price: r.price != null ? Number(r.price) : undefined,
      rating: r.rating != null ? Number(r.rating) : 4,
      distance: String(r.distance ?? '—'),
      tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
      showPriceLabel: Boolean(r.showPriceLabel),
    });
  }
  return out.length ? out : null;
}

async function readCache(): Promise<Restroom[] | null> {
  try {
    const [raw, ts] = await AsyncStorage.multiGet([CACHE_KEY, CACHE_TS_KEY]);
    const data = raw[1];
    const t = ts[1] ? Number(ts[1]) : 0;
    if (!data || Date.now() - t > TTL_MS) return null;
    const parsed = JSON.parse(data) as Restroom[];
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

async function writeCache(list: Restroom[]) {
  try {
    await AsyncStorage.multiSet([
      [CACHE_KEY, JSON.stringify(list)],
      [CACHE_TS_KEY, String(Date.now())],
    ]);
  } catch {
    /* ignore */
  }
}

export type RestroomLoadResult = {
  restrooms: Restroom[];
  source: 'network' | 'cache' | 'mock';
  error: string | null;
};

export async function loadRestrooms(): Promise<RestroomLoadResult> {
  const url = getApiUrl();

  if (url) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const list = normalizePayload(json);
      if (list?.length) {
        await writeCache(list);
        return { restrooms: list, source: 'network', error: null };
      }
      throw new Error('Invalid API response shape');
    } catch (e) {
      const cached = await readCache();
      if (cached?.length) {
        return {
          restrooms: cached,
          source: 'cache',
          error: e instanceof Error ? e.message : 'Network error',
        };
      }
      return {
        restrooms: MOCK_RESTROOMS,
        source: 'mock',
        error: e instanceof Error ? e.message : 'Network error',
      };
    }
  }

  const cached = await readCache();
  if (cached?.length) {
    return { restrooms: cached, source: 'cache', error: null };
  }

  return { restrooms: MOCK_RESTROOMS, source: 'mock', error: null };
}
