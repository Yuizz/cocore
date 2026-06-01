// home-b.jsx — Home B · Color & Contraste. Hero claro; el fondo oscuro se reserva a la sección destacada (Humo).
const FEATURED_B = ['jarra-agua', 'taza-barro-mate', 'cuenco-hondo'].map(getProduct);
const PREVIEW_B = ['florero-cilindrico', 'plato-hondo-hueso', 'set-dos-tazas'].map(getProduct);

function HeroB() {
  const { isMobile } = useViewport();
  return (
    <header style={{ padding: isMobile ? '32px 20px 56px' : '56px 48px 88px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr .9fr', gap: isMobile ? 32 : 56, alignItems: 'end' }}>
          <div>
            <SectionLabel>Cerámica de alta temperatura · Monterrey</SectionLabel>
            <h1 className="t-hero" style={{ margin: 0 }}>Barro,<br />fuego<br />y diseño.</h1>
            <p className="t-body-lg" style={{ margin: '28px 0 36px', maxWidth: 420 }}>
              Tazas, platos y vasijas de gres y porcelana, hechas a mano en Monterrey
              y cocidas a más de 1200°C. Cada objeto, una pieza única.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button href="catalogo.html">Ver piezas <Icon name="arrowRight" size={17} /></Button>
              <Button href="about.html" variant="secondary">Conocer el estudio</Button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              <ImageSlot ratio="4 / 3" radius="var(--radius-lg)" label="Composición en barro · 4:3" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}><ImageSlot ratio="1 / 1" radius="var(--radius-md)" label="Detalle" /></div>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}><ImageSlot ratio="1 / 1" radius="var(--radius-md)" label="Esmalte" tone="b" /></div>
            </div>
          </div>
        </div>
      </div>
    </header>);
}

function HomeB() {
  return (
    <Shell active="tienda">
      {(cart) =>
      <main>
          <HeroB />
          <ValueProps surface="hueso" />
          <FeaturedBand surface="canvas" label="Lo nuevo" title="Recién salido del horno"
            lead="Las piezas de la hornada más reciente. Edición de temporada, mientras duren."
            pieces={FEATURED_B} onAdd={cart.add} cta="Ver todo" />
          <SpotlightHumo />
          <StudioBand surface="barro" />
          <FeaturedBand surface="hueso" label="Disponible ahora" title="Listas para enviar"
            lead="En stock y sin espera de producción: salen del taller en cuanto haces el pedido."
            pieces={PREVIEW_B} onAdd={cart.add} cta="Ver todo el catálogo" />
          <CalloutBand />
        </main>
      }
    </Shell>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomeB />);
