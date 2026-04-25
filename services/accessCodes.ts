/** Demo codes — replace with API validation in production. */
const VALID = new Set(
  ['CLEAN24', 'DEMO2026', 'RESTROOM', 'TESTFLIGHT', 'SKIPLINE', 'PARTNER1'].map((c) => c.toUpperCase()),
);

export function validateAccessCode(raw: string): boolean {
  return VALID.has(raw.trim().toUpperCase());
}
