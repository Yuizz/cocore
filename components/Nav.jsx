// Nav.jsx — barra compartida multi-página. Logo · enlaces · buscar · carrito · CTA.
// theme: 'light' (texto oscuro sobre canvas) | 'dark' (texto claro sobre banda oscura).
function Nav({ active, theme = 'light', cartCount = 0, onCartClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { key: 'tienda', label: 'Tienda', href: 'catalogo.html' },
    { key: 'estudio', label: 'El estudio', href: 'about.html' },
    { key: 'pedidos', label: 'Pedidos', href: 'pedidos.html' },
    { key: 'ayuda', label: 'Ayuda', href: 'faq.html' },
  ];
  // En reposo sobre banda oscura, texto claro. Al hacer scroll siempre adobe + texto oscuro.
  const onDark = theme === 'dark' && !scrolled;
  const txt = onDark ? 'var(--on-dark)' : 'var(--body)';
  const txtActive = onDark ? '#fff' : 'var(--ink)';
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px',
      background: scrolled ? 'rgba(250,246,240,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'background .25s ease, border-color .25s ease, color .25s ease' }}>
      <a href="index.html" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26,
        letterSpacing: '-1px', color: onDark ? 'var(--on-dark)' : 'var(--ink)', textDecoration: 'none' }}>cocore</a>
      <div style={{ display: 'flex', gap: 32 }}>
        {links.map(l => (
          <a key={l.key} href={l.href}
            style={{ fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer', textDecoration: 'none',
              color: active === l.key ? txtActive : txt,
              fontWeight: active === l.key ? 500 : 400,
              borderBottom: active === l.key ? '1px solid currentColor' : '1px solid transparent',
              paddingBottom: 2, transition: 'color .2s' }}>{l.label}</a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="catalogo.html" style={{ color: txt, display: 'flex' }} aria-label="Buscar"><Icon name="search" size={19} /></a>
        <button onClick={onCartClick} style={{ background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 7, color: txt,
          fontFamily: 'var(--font-body)', fontSize: 14, position: 'relative' }}>
          <Icon name="cart" size={19} />
          {cartCount > 0 && <span style={{ position: 'absolute', top: -8, left: 12,
            background: 'var(--terracota)', color: '#fff', fontSize: 10, fontWeight: 600,
            borderRadius: '9999px', minWidth: 16, height: 16, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
        </button>
        <Button href="catalogo.html" size="sm">Ver piezas</Button>
      </div>
    </nav>
  );
}
window.Nav = Nav;
