interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observer?: PerformanceObserver;

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializeObserver();
    }
  }

  private initializeObserver() {
    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.recordMetrics({
              loadTime: entry.duration,
              renderTime: (entry as PerformanceNavigationTiming).loadEventEnd - (entry as PerformanceNavigationTiming).responseStart,
              memoryUsage: this.getMemoryUsage()
            });
          }
        });
      });

      this.observer.observe({ entryTypes: ['navigation', 'paint'] });
    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }
  }

  private getMemoryUsage(): number | undefined {
    // @ts-ignore - performance.memory is not standard but exists in Chrome
    return (performance as any).memory?.usedJSHeapSize;
  }

  recordMetrics(metrics: PerformanceMetrics) {
    this.metrics.push(metrics);
    
    // Keep only last 10 metrics to prevent memory bloat
    if (this.metrics.length > 10) {
      this.metrics.shift();
    }

    // Log performance warnings
    if (metrics.loadTime > 3000) {
      console.warn('Slow page load detected:', metrics.loadTime + 'ms');
    }
  }

  getAverageMetrics(): PerformanceMetrics | null {
    if (this.metrics.length === 0) return null;

    const avg = this.metrics.reduce(
      (acc, metric) => ({
        loadTime: acc.loadTime + metric.loadTime,
        renderTime: acc.renderTime + metric.renderTime,
        memoryUsage: (acc.memoryUsage || 0) + (metric.memoryUsage || 0)
      }),
      { loadTime: 0, renderTime: 0, memoryUsage: 0 }
    );

    return {
      loadTime: avg.loadTime / this.metrics.length,
      renderTime: avg.renderTime / this.metrics.length,
      memoryUsage: avg.memoryUsage / this.metrics.length
    };
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Performance utility functions
export const measureRenderTime = <T extends any[], R>(
  fn: (...args: T) => R,
  name: string
) => {
  return (...args: T): R => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (end - start > 16) { // Longer than one frame
      console.warn(`Slow render detected in ${name}: ${end - start}ms`);
    }
    
    return result;
  };
};

export const throttle = <T extends any[]>(
  func: (...args: T) => void,
  limit: number
): ((...args: T) => void) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return (...args: T) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
