// Utility functions for formatting data - following Single Responsibility Principle

export class CurrencyFormatter {
  private static readonly THB_FORMATTER = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  static formatTHB(amount: number): string {
    return this.THB_FORMATTER.format(amount);
  }

  static formatWithDiscount(originalPrice: number, discountedPrice: number): {
    original: string;
    discounted: string;
    savings: string;
    percentage: number;
  } {
    const percentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    
    return {
      original: this.formatTHB(originalPrice),
      discounted: this.formatTHB(discountedPrice),
      savings: this.formatTHB(originalPrice - discountedPrice),
      percentage
    };
  }
}

export class DateFormatter {
  private static readonly THAI_DATE_FORMATTER = new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  private static readonly THAI_TIME_FORMATTER = new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  private static readonly THAI_DATETIME_FORMATTER = new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  static formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return this.THAI_DATE_FORMATTER.format(dateObj);
  }

  static formatTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return this.THAI_TIME_FORMATTER.format(dateObj);
  }

  static formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return this.THAI_DATETIME_FORMATTER.format(dateObj);
  }

  static formatRelative(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'เมื่อสักครู่';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
    
    return this.formatDate(dateObj);
  }

  static formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) return `${remainingMinutes} นาที`;
    if (remainingMinutes === 0) return `${hours} ชั่วโมง`;
    return `${hours} ชั่วโมง ${remainingMinutes} นาที`;
  }
}

export class StringFormatter {
  static truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  }

  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static capitalizeWords(text: string): string {
    return text.split(' ').map(word => this.capitalize(word)).join(' ');
  }

  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  static parseMarkdown(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
}

export class PhoneFormatter {
  static formatThaiPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('66')) {
      // International format
      return `+66 ${digits.slice(2, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
    } else if (digits.startsWith('0') && digits.length === 10) {
      // Local format
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    return phone;
  }

  static normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('0') && digits.length === 10) {
      return `+66${digits.slice(1)}`;
    }
    
    if (digits.startsWith('66')) {
      return `+${digits}`;
    }
    
    return phone;
  }
}

export class UrlFormatter {
  static buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  static parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    
    params.forEach((value, key) => {
      result[key] = value;
    });
    
    return result;
  }

  static buildUrl(base: string, path: string, params?: Record<string, any>): string {
    const url = new URL(path, base);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }
}