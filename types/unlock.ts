export type UnlockEntry = {
  id: string;
  kind: 'payment' | 'code';
  createdAt: string;
  restroomId?: string;
  restroomName?: string;
  amountUsd?: number;
  code?: string;
};
