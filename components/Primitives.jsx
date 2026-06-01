// Primitives.jsx — Button, Chip, Badge, ImageSlot, SectionLabel, StockBadge, money
function money(n) { return '$' + n.toLocaleString('es-MX'); }

function Button({ variant = 'primary', children, onClick, href, full, style = {}, size = 'md' }) {
  const pad = size === 'sm' ? '9px 18px' : size === 'lg' ? '15px 34px' : '12px 28px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 15 : 14;
  const base = {
    fontFamily: 'var(--font-body)', fontSize: fs, fontWeight: 500, letterSpacing: '.2px',
    cursor: 'pointer', borderRadius: 'var(--radius-pill)', padding: variant === 'secondary' ? '12px 4px' : pad,
    transition: 'background .18s ease, color .18s ease, border-color .18s ease',
    width: full ? '100%' : 'auto', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', gap: 8, lineHeight: 1, border: '1px solid transparent',
    textDecoration: variant === 'secondary' ? 'underline' : 'none', textUnderlineOffset: 3,
    boxSizing: 'border-box',
  };
  const variants = {
    primary: { background: 'var(--terracota)', color: '#fff' },
    outline: { background: 'transparent', color: 'var(--terracota)', borderColor: 'var(--terracota)' },
    dark: { background: 'var(--surface-dark)', color: 'var(--on-dark)' },
    light: { background: 'var(--canvas)', color: 'var(--ink)' },
    ghost: { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--hairline)' },
    secondary: { background: 'none', color: 'var(--terracota)', borderRadius: 0 },
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    primary: { background: 'var(--terracota-active)' },
    outline: { background: 'var(--terracota)', color: '#fff' },
    dark: { background: '#000' },
    light: { background: '#fff' },
    ghost: { borderColor: 'var(--ink)' },
    secondary: { color: 'var(--terracota-active)' },
  }[variant] : {};
  const props = {
    onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    style: { ...base, ...variants[variant], ...hoverStyle, ...style },
  };
  if (href) return <a href={href} {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
}

function Chip({ active, children, onClick }) {
  const [hover, setHover] = React.useState(false);
  let s = { background: 'transparent', borderColor: 'var(--hairline)', color: 'var(--muted)' };
  if (hover && !active) s = { background: 'transparent', borderColor: 'var(--terracota-soft)', color: 'var(--terracota)' };
  if (active) s = { background: 'var(--terracota-soft)', borderColor: 'var(--terracota-soft)', color: 'var(--terracota)' };
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ fontFamily: 'var(--font-body)', fontSize: 13, borderRadius: 'var(--radius-xl)',
        padding: '8px 18px', cursor: 'pointer', border: '1px solid', whiteSpace: 'nowrap',
        transition: 'all .15s ease', ...s }}>{children}</button>
  );
}

function Badge({ tone = 'sage', children }) {
  const map = { warning: 'var(--warning)', sage: 'var(--sage)', dark: 'var(--surface-dark)', muted: 'var(--humo)' };
  return (
    <span className="t-caption" style={{ background: map[tone] || tone, color: '#fff',
      borderRadius: 'var(--radius-pill)', padding: '4px 11px', display: 'inline-block', whiteSpace: 'nowrap' }}>{children}</span>
  );
}

function StockBadge({ stock }) {
  if (stock === 'out') return <Badge tone="muted">Agotado</Badge>;
  if (stock === 'low') return <Badge tone="warning">Últimas piezas</Badge>;
  return <Badge tone="sage">En stock</Badge>;
}

// Image placeholder — warm hueso fill, hatch, hints at real photo. Drop a real <img> later.
function ImageSlot({ ratio = '4 / 5', radius = 'var(--radius-sm)', label = 'Fotografía de pieza', scale = 1, tone = 'a' }) {
  const fills = {
    a: 'repeating-linear-gradient(45deg,#e6dccd,#e6dccd 11px,#ece3d6 11px,#ece3d6 22px)',
    b: 'repeating-linear-gradient(45deg,#e0d4c2,#e0d4c2 11px,#e8ddcd 11px,#e8ddcd 22px)',
  };
  return (
    <div style={{ aspectRatio: ratio, borderRadius: radius, overflow: 'hidden',
      background: fills[tone] || fills.a, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ transform: `scale(${scale})`, transition: 'transform .4s ease',
        fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '1.4px',
        textTransform: 'uppercase', color: 'var(--muted-soft)', textAlign: 'center', padding: '0 12px' }}>{label}</span>
    </div>
  );
}

function SectionLabel({ children, color = 'var(--terracota)', style = {} }) {
  return <div className="t-caption" style={{ color, marginBottom: 16, ...style }}>{children}</div>;
}

Object.assign(window, { Button, Chip, Badge, StockBadge, ImageSlot, SectionLabel, money });
