// Simple in-memory LRU cache with TTL for server runtime
// Not suitable for multi-instance deployments without a shared store.

export type CacheKey = string;
export type CacheValue<T> = { value: T; expiresAt: number };

export class LruTtlCache<T = unknown> {
  private store = new Map<CacheKey, CacheValue<T>>();
  constructor(private maxEntries = 100, private ttlMs = 5 * 60 * 1000) {}

  get(key: CacheKey): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    // LRU bump
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.value;
  }

  set(key: CacheKey, value: T): void {
    // Evict if needed
    if (this.store.size >= this.maxEntries) {
      const first = this.store.keys().next().value;
      if (first) this.store.delete(first);
    }
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  has(key: CacheKey): boolean {
    return this.get(key) !== undefined;
  }
}

// Singleton cache for API routes
export const apiCache = new LruTtlCache<string>(100, Number(process.env.REPLYIFY_CACHE_TTL_MS || 120000));

// Helper to build a stable key
export function stableKey(obj: unknown): string {
  type Jsonish = string | number | boolean | null | Jsonish[] | { [k: string]: Jsonish };
  function normalize(o: unknown): Jsonish {
    if (o === null) return null;
    const t = typeof o;
    if (t === "string" || t === "number" || t === "boolean") return o as Jsonish;
    if (Array.isArray(o)) return (o as unknown[]).map((v) => normalize(v));
    if (t === "object") {
      const rec = o as Record<string, unknown>;
      const out: Record<string, Jsonish> = {};
      for (const k of Object.keys(rec).sort()) {
        const v = rec[k];
        if (v === undefined || v === "") continue; // omit empties
        out[k] = normalize(v);
      }
      return out;
    }
    return String(o);
  }
  return JSON.stringify(normalize(obj));
}
