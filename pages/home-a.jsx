// home-a.jsx — Home A · Editorial Galería. Surface rhythm canvas→hueso→barro→canvas→terracota.
const FEATURED_A = ['taza-barro-mate', 'plato-hondo-hueso', 'vasija-pequena'].map(getProduct);
const PREVIEW_A = ['tazon-desayuno', 'jarra-agua', 'florero-cilindrico'].map(getProduct);

function HeroA() {
  const { isMobile } = useViewport();
  return (
    <header style={{ position: 'relative', padding: isMobile ? '32px 20px 56px' : '64px 48px 88px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr .95fr', gap: isMobile ? 36 : 56, alignItems: 'center' }}>
        <div>
          <SectionLabel>Cerámica de alta temperatura · Monterrey</SectionLabel>
          <h1 className="t-hero" style={{ margin: 0 }}>Piezas hechas a mano, con voluntad de diseño.</h1>
          <p className="t-body-lg" style={{ margin: '24px 0 36px', maxWidth: 460 }}>
            Tazas, platos y vasijas de gres y porcelana, cocidas a alta temperatura
            en Monterrey. Cada objeto, una pieza única.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button href="catalogo.html">Ver piezas <Icon name="arrowRight" size={17} /></Button>
            <Button href="about.html" variant="secondary">Conocer el estudio</Button>
          </div>
        </div>
        <div style={{ position: 'relative', order: isMobile ? -1 : 0 }}>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(26,21,16,0.07)' }}>
            <ImageSlot ratio="3 / 4" radius="var(--radius-xl)" label="Composición de piezas · 3:4" />
          </div>
          <div style={{ position: 'absolute', bottom: -18, left: -18, width: 130,
            borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '4px solid var(--canvas)' }}>
            <ImageSlot ratio="1 / 1" radius="0" label="Detalle" tone="b" />
          </div>
        </div>
      </div>
    </header>
  );
}

function HomeA() {
  return (
    <Shell active="tienda">
      {(cart) => (
        <main>
          <HeroA />
          <ValueProps surface="hueso" />
          <FeaturedBand surface="canvas" label="Selección de temporada" title="Piezas del mes"
            lead="Una curaduría corta: lo que torneamos y esmaltamos esta temporada. Rota cada mes."
            pieces={FEATURED_A} onAdd={cart.add} cta="Ver todo" />
          <SpotlightHumo />
          <StudioBand surface="barro" />
          <FeaturedBand surface="hueso" label="Disponible ahora" title="Listas para enviar"
            lead="Piezas en stock que salen del taller en cuanto haces el pedido, sin espera de producción."
            pieces={PREVIEW_A} onAdd={cart.add} cta="Ver todo el catálogo" />
          <CalloutBand />
        </main>
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomeA />);
