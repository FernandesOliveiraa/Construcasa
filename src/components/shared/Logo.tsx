interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'symbol';
  colorScheme?: 'color' | 'white' | 'mono';
  size?: number;
  className?: string;
}

type SchemeColors = {
  roof: string;
  body: string;
  window: string;
  wordmarkBase: string;
  wordmarkAccent: string;
};

const SCHEME_COLORS: Record<NonNullable<LogoProps['colorScheme']>, SchemeColors> = {
  color: {
    roof: '#E85D26',
    body: '#1B2B4B',
    window: '#E85D26',
    wordmarkBase: '#1B2B4B',
    wordmarkAccent: '#E85D26',
  },
  white: {
    roof: '#FFFFFF',
    body: 'rgba(255,255,255,0.75)',
    window: '#E85D26',
    wordmarkBase: '#FFFFFF',
    wordmarkAccent: '#FFFFFF',
  },
  mono: {
    roof: '#1B2B4B',
    body: '#1B2B4B',
    window: '#FFFFFF',
    wordmarkBase: '#1B2B4B',
    wordmarkAccent: '#1B2B4B',
  },
};

export function LogoSymbol({ size = 36, colorScheme = 'color' }: { size?: number; colorScheme?: NonNullable<LogoProps['colorScheme']> }) {
  const c = SCHEME_COLORS[colorScheme];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Telhado */}
      <polygon points="20,3 37,19 3,19" fill={c.roof} />
      {/* Corpo */}
      <rect x="9" y="19" width="22" height="16" rx="2.5" fill={c.body} />
      {/* Janela / conexão */}
      <rect x="15" y="23" width="10" height="8" rx="1.5" fill={c.window} />
    </svg>
  );
}

export function Logo({
  variant = 'horizontal',
  colorScheme = 'color',
  size = 36,
  className,
}: LogoProps) {
  const c = SCHEME_COLORS[colorScheme];
  const fontSize = Math.round(size * 0.55);

  const wordmark = (
    <span
      style={{
        fontFamily: 'var(--font-display, "Syne", sans-serif)',
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: c.wordmarkBase }}>Constru</span>
      <span style={{ color: colorScheme === 'white' ? '#FFFFFF' : '#E85D26' }}>Casa</span>
    </span>
  );

  if (variant === 'symbol') {
    return (
      <div className={className} role="img" aria-label="ConstruCasa">
        <LogoSymbol size={size} colorScheme={colorScheme} />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div
        className={className}
        role="img"
        aria-label="ConstruCasa"
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <LogoSymbol size={size} colorScheme={colorScheme} />
        {wordmark}
      </div>
    );
  }

  return (
    <div
      className={className}
      role="img"
      aria-label="ConstruCasa"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <LogoSymbol size={size} colorScheme={colorScheme} />
      {wordmark}
    </div>
  );
}
