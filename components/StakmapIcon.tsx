export function StakmapIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <line x1="11" y1="11" x2="18" y2="4"  stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="11" x2="20" y2="12" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="11" x2="14" y2="19" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="11" x2="3"  y2="16" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="11" x2="4"  y2="4"  stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="18" y1="4"  x2="20" y2="12" stroke="#00e5a0" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="3"  y1="16" x2="14" y2="19" stroke="#00e5a0" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="11" cy="11" r="2.5" fill="#00e5a0" />
      <circle cx="18" cy="4"  r="1.7" fill="#00e5a0" />
      <circle cx="20" cy="12" r="1.7" fill="#00e5a0" />
      <circle cx="14" cy="19" r="1.7" fill="#00e5a0" />
      <circle cx="3"  cy="16" r="1.7" fill="#00e5a0" />
      <circle cx="4"  cy="4"  r="1.7" fill="#00e5a0" />
    </svg>
  );
}
