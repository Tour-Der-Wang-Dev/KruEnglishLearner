// Performance utilities following Single Responsibility Principle

export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();

  static startMark(name: string): void {
    if (typeof performance !== 'undefined') {
      this.marks.set(name, performance.now());
    }
  }

  static endMark(name: string, logResult: boolean = false): number {
    if (typeof performance === 'undefined') return 0;
    
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`Performance mark "${name}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(name);

    if (logResult) {
      console.log(`Performance "${name}": ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  static measureFunction<T extends (...args: any[]) => any>(
    fn: T,
    name?: string
  ): T {
    return ((...args: any[]) => {
      const markName = name || fn.name || 'anonymous';
      this.startMark(markName);
      
      try {
        const result = fn(...args);
        
        // Handle async functions
        if (result instanceof Promise) {
          return result.finally(() => {
            this.endMark(markName, true);
          });
        }
        
        this.endMark(markName, true);
        return result;
      } catch (error) {
        this.endMark(markName, true);
        throw error;
      }
    }) as T;
  }
}

export class CacheManager {
  private static cache: Map<string, { data: any; expiry: number }> = new Map();

  static set(key: string, data: any, ttlMs: number = 5 * 60 * 1000): void {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  static has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) return false;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  static delete(key: string): boolean {
    return this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  static cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate?: boolean
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return ((...args: any[]) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  }) as T;
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}

// Lazy loading utility
export class LazyLoader {
  private static observer: IntersectionObserver | null = null;
  private static callbacks: Map<Element, () => void> = new Map();

  static observe(element: Element, callback: () => void): void {
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback();
              this.unobserve(entry.target);
            }
          }
        });
      });
    }

    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  static unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
    }
    this.callbacks.delete(element);
  }

  static disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.callbacks.clear();
  }
}

// Image optimization utility
export class ImageOptimizer {
  static createWebPSource(src: string, quality: number = 80): string {
    if (src.includes('api/placeholder')) {
      return `${src}?format=webp&quality=${quality}`;
    }
    return src;
  }

  static createSrcSet(baseSrc: string, sizes: number[]): string {
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  }

  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }

  static preloadImages(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map(src => this.preloadImage(src)));
  }
}