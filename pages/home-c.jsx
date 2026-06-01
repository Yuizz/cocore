// home-c.jsx — Home C · Catálogo-first / Minimal. Tipográfico, shop-forward, mucho aire.
function HeroC() {
  const { isMobile } = useViewport();
  return (
    <header style={{ padding: isMobile ? '24px 20px 16px' : '40px 48px 24px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: isMobile ? 16 : 32 }}>
          <div style={{ maxWidth: 760 }}>
            <SectionLabel>Estudio cerámico · Monterrey</SectionLabel>
            <h1 className="t-hero" style={{ margin: 0 }}>Objetos cotidianos,<br />cocidos a alta temperatura.</h1>
          </div>
          <p className="t-body-lg" style={{ margin: 0, maxWidth: 300 }}>
            Hecho a mano en Monterrey. Cada pieza es única y se envía a todo México.
          </p>
        </div>
      </div>
    </header>
  );
}

function CategoryGrid({ onAdd }) {
  const { isMobile, isTablet } = useViewport();
  const tabs = ['Todo', ...CATEGORIES];
  const [tab, setTab] = React.useState('Todo');
  const shown = tab === 'Todo' ? CATALOG : CATALOG.filter(p => p.category === tab);
  return (
    <section style={{ padding: isMobile ? '20px 20px 56px' : '24px 48px 64px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--hairline)', paddingBottom: 18, marginBottom: isMobile ? 28 : 36, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  fontSize: 15, padding: '6px 2px', color: tab === t ? 'var(--terracota)' : 'var(--muted)',
                  borderBottom: '2px solid ' + (tab === t ? 'var(--terracota)' : 'transparent'),
                  fontWeight: tab === t ? 500 : 400, transition: 'all .15s' }}>{t}</button>
            ))}
          </div>
          <Button href="catalogo.html" variant="secondary">Ir al catálogo completo <Icon name="arrowRight" size={15} /></Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
          {shown.map((p, i) => <ProductCard key={p.id} piece={p} onAdd={onAdd} surface="canvas" tone={i % 2 ? 'b' : 'a'} />)}
        </div>
      </div>
    </section>
  );
}

// Tira mínima del estudio — una línea + enlace.
function StudioStripC() {
  const { isMobile } = useViewport();
  return (
    <section style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: isMobile ? '48px 20px' : '64px 48px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 24 : 40, flexWrap: 'wrap' }}>
        <h2 className="t-heading-lg" style={{ margin: 0, maxWidth: 680 }}>
          Dos diseñadoras, un horno, y la voluntad de que lo cotidiano tenga forma.
        </h2>
        <Button href="about.html" variant="outline">Conocer el estudio</Button>
      </div>
    </section>
  );
}

function HomeC() {
  return (
    <Shell active="tienda">
      {(cart) => (
        <main>
          <HeroC />
          <CategoryGrid onAdd={cart.add} />
          <StudioStripC />
          <ValueProps surface="canvas" />
          <CalloutBand />
        </main>
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomeC />);
