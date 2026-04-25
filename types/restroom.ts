export type RestroomMapType = 'verified' | 'paid' | 'standard' | 'premium';

export interface Restroom {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: RestroomMapType;
  price?: number;
  rating: number;
  distance: string;
  tags: string[];
  showPriceLabel?: boolean;
}
