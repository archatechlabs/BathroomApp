import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionCard } from '../components/home/ActionCard';
import { BottomTabs, type HomeTabId } from '../components/home/BottomTabs';
import { EnterCodeModal } from '../components/home/EnterCodeModal';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { FiltersModal, type FilterOptions } from '../components/home/FiltersModal';
import { Header } from '../components/home/Header';
import { MapEmptyState } from '../components/home/MapEmptyState';
import { MapViewSection } from '../components/home/MapViewSection';
import { NotificationsModal } from '../components/home/NotificationsModal';
import { QuickActions } from '../components/home/QuickActions';
import { RestroomErrorBanner } from '../components/home/RestroomErrorBanner';
import { SearchBar } from '../components/home/SearchBar';
import { useApp } from '../context/AppProvider';
import { validateAccessCode } from '../services/accessCodes';
import type { Restroom } from '../types/restroom';
import { FavoritesTabScreen } from './FavoritesTabScreen';
import { ProfileTabScreen } from './ProfileTabScreen';
import { UnlockTabScreen } from './UnlockTabScreen';
import { hapticLight, hapticSuccess } from '../utils/haptics';

const DEFAULT_FILTERS: FilterOptions = {
  verifiedOnly: false,
  accessibleOnly: false,
  paidOnly: false,
};

function matchesFilters(r: Restroom, f: FilterOptions): boolean {
  if (f.verifiedOnly && r.type !== 'verified') return false;
  if (f.paidOnly && r.type !== 'paid' && r.type !== 'premium') return false;
  if (f.accessibleOnly) {
    const ok = r.tags.some((t) => t.toLowerCase().includes('access'));
    if (!ok) return false;
  }
  return true;
}

export function HomeMapScreen() {
  const insets = useSafeAreaInsets();
  const {
    restrooms: allRestrooms,
    restroomError,
    restroomSource,
    loadingRestrooms,
    refreshRestrooms,
    addPaymentUnlock,
    addCodeUnlock,
    isFavorite,
    toggleFavorite,
  } = useApp();

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<HomeTabId>('find');
  const [selected, setSelected] = useState<Restroom | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [filterDraft, setFilterDraft] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const privacyUrl =
    (Constants.expoConfig?.extra?.privacyPolicyUrl as string) || 'https://www.example.com/privacy';

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.verifiedOnly) n += 1;
    if (filters.accessibleOnly) n += 1;
    if (filters.paidOnly) n += 1;
    return n;
  }, [filters]);

  const restrooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allRestrooms.filter((r) => matchesFilters(r, filters));
    if (q) {
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    return list;
  }, [query, filters, allRestrooms]);

  const nearbyCount = restrooms.length;

  const handleMarkerPress = useCallback((r: Restroom) => {
    hapticLight();
    setTab('find');
    setSelected(r);
  }, []);

  const handleMapPress = useCallback(() => {
    setSelected(null);
  }, []);

  const openFilters = useCallback(() => {
    setFilterDraft(filters);
    setFiltersOpen(true);
  }, [filters]);

  const applyFilters = useCallback(() => {
    setFilters(filterDraft);
    setFiltersOpen(false);
    hapticSuccess();
  }, [filterDraft]);

  const resetFilterDraft = useCallback(() => {
    setFilterDraft(DEFAULT_FILTERS);
    hapticLight();
  }, []);

  const clearFiltersAndSearch = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setFilterDraft(DEFAULT_FILTERS);
    setQuery('');
    hapticLight();
  }, []);

  const handlePay = useCallback(() => {
    if (!selected) return;
    const amount = selected.price ?? 2;
    Alert.alert(
      'Confirm payment',
      `Charge $${amount.toFixed(2)} for instant access to ${selected.name}?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => hapticLight() },
        {
          text: 'Pay now',
          onPress: async () => {
            await addPaymentUnlock(selected, amount);
            hapticSuccess();
            Alert.alert('You’re in', 'Pass saved on this device. Door unlock would activate in production.');
          },
        },
      ],
    );
  }, [selected, addPaymentUnlock]);

  const handleFeaturedPress = useCallback(() => {
    const featured = allRestrooms.find((r) => r.id === '1');
    if (featured) {
      setTab('find');
      setSelected(featured);
    }
  }, [allRestrooms]);

  const handleTabChange = useCallback((id: HomeTabId) => {
    setTab(id);
    if (id !== 'find') {
      setSelected(null);
    }
  }, []);

  const handleSelectFromFavorites = useCallback((r: Restroom) => {
    setTab('find');
    setSelected(r);
  }, []);

  const focusCoordinate = selected
    ? { latitude: selected.latitude, longitude: selected.longitude }
    : null;

  const sourceLabel =
    restroomSource === 'network'
      ? 'Live API'
      : restroomSource === 'cache'
        ? 'Cached'
        : 'Built-in demo';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header onNotificationsPress={() => setNotificationsOpen(true)} />

      {tab === 'find' ? (
        <>
          {restroomError ? (
            <RestroomErrorBanner
              message={restroomError}
              sourceLabel={sourceLabel}
              onRetry={refreshRestrooms}
            />
          ) : null}
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFiltersPress={openFilters}
            filterCount={activeFilterCount}
          />
          <View style={styles.mapBlock}>
            <MapViewSection
              restrooms={restrooms}
              onMarkerPress={handleMarkerPress}
              onMapPress={handleMapPress}
              nearbyCount={nearbyCount}
              focusCoordinate={focusCoordinate}
            >
              {selected != null && (
                <ActionCard
                  selected={selected}
                  visible
                  isFavorite={isFavorite(selected.id)}
                  onToggleFavorite={() => void toggleFavorite(selected.id)}
                  onPayPress={handlePay}
                  onDismiss={() => setSelected(null)}
                />
              )}
            </MapViewSection>
            {loadingRestrooms && allRestrooms.length === 0 ? (
              <View style={styles.mapLoading}>
                <ActivityIndicator size="large" color="#1E3A5F" />
              </View>
            ) : null}
            {!loadingRestrooms && restrooms.length === 0 ? (
              <MapEmptyState
                onClearFilters={
                  query.trim() || activeFilterCount > 0 ? clearFiltersAndSearch : undefined
                }
                onRefresh={refreshRestrooms}
              />
            ) : null}
          </View>
          <FeaturedCard
            onPress={handleFeaturedPress}
            isFavorite={isFavorite('1')}
            onToggleFavorite={() => void toggleFavorite('1')}
          />
          <QuickActions
            onPayForAccess={() => {
              const paid = allRestrooms.find((r) => r.type === 'premium' || r.type === 'paid');
              if (paid) {
                setTab('find');
                setSelected(paid);
              } else {
                Alert.alert('Pay for access', 'No paid locations in the current list.');
              }
            }}
            onEnterCode={() => setCodeOpen(true)}
            onSafeInclusive={async () => {
              hapticLight();
              await WebBrowser.openBrowserAsync(privacyUrl);
            }}
          />
        </>
      ) : tab === 'favorites' ? (
        <View style={styles.altBlock}>
          <FavoritesTabScreen onBackToMap={() => setTab('find')} onSelectRestroom={handleSelectFromFavorites} />
        </View>
      ) : tab === 'unlock' ? (
        <View style={styles.altBlock}>
          <UnlockTabScreen onBackToMap={() => setTab('find')} />
        </View>
      ) : (
        <View style={styles.altBlock}>
          <ProfileTabScreen onBackToMap={() => setTab('find')} />
        </View>
      )}

      <BottomTabs active={tab} onChange={handleTabChange} />

      <FiltersModal
        visible={filtersOpen}
        value={filterDraft}
        onChange={setFilterDraft}
        onClose={() => setFiltersOpen(false)}
        onApply={applyFilters}
        onReset={resetFilterDraft}
      />

      <EnterCodeModal
        visible={codeOpen}
        onClose={() => setCodeOpen(false)}
        onSubmit={async (code) => {
          if (!validateAccessCode(code)) {
            Alert.alert(
              'Invalid code',
              'Try CLEAN24, DEMO2026, RESTROOM, TESTFLIGHT, SKIPLINE, or PARTNER1.',
            );
            return false;
          }
          await addCodeUnlock(code);
          hapticSuccess();
          Alert.alert('Code accepted', `Pass saved for “${code}”. Enjoy your visit.`);
          return true;
        }}
      />

      <NotificationsModal visible={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mapBlock: {
    flex: 1,
    minHeight: 280,
    marginBottom: 4,
    position: 'relative',
  },
  mapLoading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.65)',
    zIndex: 2,
  },
  altBlock: {
    flex: 1,
    minHeight: 280,
  },
});
