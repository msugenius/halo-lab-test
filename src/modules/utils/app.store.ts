interface CacheValue<T> {
  value: T;
  expiry: number;
}

class AppStore<T> {
  constructor(private readonly cleanupIntervalS: number = 5) {
    setInterval(() => {
      this.cleanup();
    }, cleanupIntervalS * 1000);
  }
  private store: Record<string, CacheValue<T>> = {};

  private cleanup(): void {
    for (const key in this.store) {
      const cachedValue = this.store[key];

      if (cachedValue && cachedValue.expiry < Date.now()) {
        delete this.store[key];
      }
    }
  }

  get(key: string): T | undefined {
    const cachedValue = this.store[key];

    if (!cachedValue || cachedValue.expiry < Date.now()) {
      delete this.store[key];
      return undefined;
    }

    return cachedValue.value;
  }

  set(key: string, value: T, expirySeconds: number = 15): void {
    this.store[key] = {
      value,
      expiry: Date.now() + expirySeconds * 1000,
    };
  }

  refresh(key: string, value: T, expirySeconds: number = 15): boolean {
    if (this.get(key) == undefined) {
      this.set(key, value, expirySeconds * 1000);
      return true;
    }

    const cachedValue = this.store[key];

    if (cachedValue && cachedValue.expiry >= Date.now()) {
      cachedValue.expiry = Date.now() + expirySeconds * 1000;
      return true;
    }

    return false;
  }
}

export default AppStore;
