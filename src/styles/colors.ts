export const colors = {
  brand: {
    DEFAULT: '#E85D26',
    dark: '#C44A18',
    light: '#F4793F',
    subtle: '#FFF0E8',
  },
  navy: {
    DEFAULT: '#1B2B4B',
    medium: '#2C3E6B',
    light: '#3D5A8A',
  },
  cream: {
    DEFAULT: '#FAF8F5',
    muted: '#F4F2EF',
  },
  surface: '#FFFFFF',
  border: '#E8E4DF',
  slate: {
    DEFAULT: '#64748B',
    light: '#94A3B8',
    dark: '#475569',
  },
  success: { DEFAULT: '#16A34A', light: '#DCFCE7' },
  warning: { DEFAULT: '#D97706', light: '#FEF3C7' },
  danger:  { DEFAULT: '#DC2626', light: '#FEE2E2' },
} as const;

export type ColorToken = typeof colors;
