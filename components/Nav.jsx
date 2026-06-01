// Nav.jsx — barra compartida multi-página. Logo · enlaces · buscar · carrito · CTA.
// theme: 'light' (texto oscuro sobre canvas) | 'dark' (texto claro sobre banda oscura).
function Nav({ active, theme = 'light', cartCount = 0, onCartClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const { isMobile } = useViewport();
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => { if (!isMobile) setMenu(false); }, [isMobile]);
  const links = [
    { key: 'tienda', label: 'Tienda', href: 'catalogo.html' },
    { key: 'estudio', label: 'El estudio', href: 'about.html' },
    { key: 'pedidos', label: 'Pedidos', href: 'pedidos.html' },
    { key: 'ayuda', label: 'Ayuda', href: 'faq.html' },
  ];
  const onDark = theme === 'dark' && !scrolled && !menu;
  const txt = onDark ? 'var(--on-dark)' : 'var(--body)';
  const txtActive = onDark ? '#fff' : 'var(--ink)';
  const solid = scrolled || menu;
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '16px 20px' : '20px 48px',
      background: solid ? 'rgba(250,246,240,0.92)' : 'transparent',
      backdropFilter: solid ? 'blur(12px)' : 'none',
      borderBottom: solid ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'background .25s ease, border-color .25s ease, color .25s ease' }}>
      <a href="index.html" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 23 : 26,
        letterSpacing: '-1px', color: onDark ? 'var(--on-dark)' : 'var(--ink)', textDecoration: 'none' }}>cocore</a>

      {!isMobile && (
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
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 20 }}>
        {!isMobile && <a href="catalogo.html" style={{ color: txt, display: 'flex' }} aria-label="Buscar"><Icon name="search" size={19} /></a>}
        <button onClick={onCartClick} style={{ background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 7, color: txt, padding: 0,
          fontFamily: 'var(--font-body)', fontSize: 14, position: 'relative' }} aria-label="Carrito">
          <Icon name="cart" size={20} />
          {cartCount > 0 && <span style={{ position: 'absolute', top: -8, left: 12,
            background: 'var(--terracota)', color: '#fff', fontSize: 10, fontWeight: 600,
            borderRadius: '9999px', minWidth: 16, height: 16, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
        </button>
        {isMobile ? (
          <button onClick={() => setMenu(m => !m)} aria-label="Menú" style={{ background: 'none', border: 'none',
            cursor: 'pointer', color: txt, display: 'flex', padding: 0 }}>
            <Icon name={menu ? 'x' : 'menu'} size={24} />
          </button>
        ) : (
          <Button href="catalogo.html" size="sm">Ver piezas</Button>
        )}
      </div>

      {/* Panel móvil */}
      {isMobile && menu && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--canvas)', borderBottom: '1px solid var(--hairline)',
          padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 12px 28px rgba(26,21,16,0.10)' }}>
          {links.map(l => (
            <a key={l.key} href={l.href} style={{ fontFamily: 'var(--font-body)', fontSize: 17,
              color: active === l.key ? 'var(--terracota)' : 'var(--ink)', textDecoration: 'none',
              padding: '14px 4px', borderBottom: '1px solid var(--hairline-soft)' }}>{l.label}</a>
          ))}
          <div style={{ marginTop: 16 }}><Button href="catalogo.html" full>Ver piezas</Button></div>
        </div>
      )}
    </nav>
  );
}
window.Nav = Nav;
