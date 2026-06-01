// Footer.jsx — banda oscura, wordmark + tagline, columnas de enlaces. Sin "Barrio Antiguo".
function Footer() {
  const { isMobile, isTablet } = useViewport();
  const cols = [
    ['Tienda', [['Todo el catálogo', 'catalogo.html'], ['Tazas', 'catalogo.html'], ['Platos', 'catalogo.html'], ['Vasijas', 'catalogo.html'], ['Sets', 'catalogo.html']]],
    ['Estudio', [['Sobre Cocore', 'about.html'], ['El proceso', 'about.html#proceso'], ['Preguntas frecuentes', 'faq.html'], ['Pedidos y envíos', 'pedidos.html']]],
    ['Contacto', [['Monterrey, México', 'contacto.html'], ['hola@cocore.mx', 'contacto.html'], ['Instagram', 'contacto.html'], ['WhatsApp', 'contacto.html']]],
  ];
  return (
    <footer style={{ background: 'var(--surface-dark)', padding: isMobile ? '56px 24px 32px' : '80px 48px 40px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1.4fr 1fr 1fr 1fr', gap: isMobile ? 32 : 48 }}>
        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <a href="index.html" style={{ fontFamily: 'var(--font-display)', fontSize: 30, letterSpacing: '-1px',
            color: 'var(--on-dark)', textDecoration: 'none' }}>cocore</a>
          <p className="t-body" style={{ color: 'var(--on-dark-soft)', margin: '14px 0 0', maxWidth: 240 }}>
            Cerámica de alta temperatura, hecha a mano en Monterrey.
          </p>
        </div>
        {cols.map(([title, items]) => (
          <div key={title}>
            <div className="t-caption" style={{ color: 'var(--on-dark-soft)', marginBottom: 18 }}>{title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(([label, href]) => (
                <a key={label} href={href} style={{ fontFamily: 'var(--font-body)', fontSize: 14,
                  color: 'var(--on-dark-soft)', cursor: 'pointer', transition: 'color .15s', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--on-dark)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--on-dark-soft)'}>{label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: isMobile ? '40px auto 0' : '56px auto 0', paddingTop: 24,
        borderTop: '1px solid rgba(221,213,200,0.18)', display: 'flex',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span className="t-micro" style={{ color: 'var(--muted-soft)' }}>© 2026 Cocore Atelier · Hecho en México.</span>
        <span className="t-micro" style={{ color: 'var(--muted-soft)' }}>Aviso de privacidad · Términos</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
