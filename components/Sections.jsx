// Sections.jsx — bandas compartidas por los homes y otras páginas.

function TrustStrip() {
  const marks = ['Coolhuntermx', 'Diseño MTY', 'Hecho en México', 'Slow Made'];
  return (
    <section style={{ padding: '10px 48px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 56,
        flexWrap: 'wrap', opacity: .9 }}>
        {marks.map((m) =>
        <span key={m} style={{ fontFamily: 'var(--font-display)', fontSize: 19,
          color: 'var(--humo)', letterSpacing: '-.3px' }}>{m}</span>
        )}
      </div>
    </section>);

}

// Tira de propuestas de valor — íconos de línea + texto corto.
function ValueProps({ surface = 'canvas' }) {
  const { isMobile } = useViewport();
  const items = [
  ['flame', 'Alta temperatura', 'Gres y porcelana cocidos a más de 1200°C. Resistentes para el uso diario.'],
  ['sparkle', 'Pieza única', 'Hechas a mano, una por una. No hay dos exactamente iguales.'],
  ['truck', 'Envío a todo México', 'Empaque cuidado para que cada pieza llegue entera. Seguimiento incluido.']];

  const bg = surface === 'hueso' ? 'var(--surface-hueso)' : 'var(--canvas)';
  return (
    <section style={{ background: bg, padding: isMobile ? '36px 24px' : '56px 48px', borderTop: '1px solid var(--hairline-soft)', borderBottom: '1px solid var(--hairline-soft)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 40 }}>
        {items.map(([ic, t, d]) =>
        <div key={t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ flex: 'none', width: 44, height: 44, borderRadius: '50%',
            border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'var(--terracota)' }}>
              <Icon name={ic} size={20} />
            </div>
            <div>
              <div className="t-title-md" style={{ marginBottom: 4 }}>{t}</div>
              <p className="t-body-sm" style={{ margin: 0 }}>{d}</p>
            </div>
          </div>
        )}
      </div>
    </section>);

}

// Banda de colección destacada — header + grid 3-col. cta opcional → catálogo.
function FeaturedBand({ id, surface = 'canvas', label, title, lead, pieces, onAdd, cta, tone = 'a' }) {
  const { isMobile, isTablet } = useViewport();
  const bg = surface === 'hueso' ? 'var(--surface-hueso)' : surface === 'barro' ? 'var(--surface-barro)' : 'var(--canvas)';
  return (
    <section id={id} style={{ background: bg, padding: isMobile ? '64px 20px' : '96px 48px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 32, flexWrap: 'wrap', marginBottom: isMobile ? 28 : 40 }}>
          <div style={{ maxWidth: 560 }}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className="t-heading-lg" style={{ margin: 0 }}>{title}</h2>
            {lead && <p className="t-body-lg" style={{ margin: '16px 0 0' }}>{lead}</p>}
          </div>
          {cta && <Button href="catalogo.html" variant="secondary">{cta} <Icon name="arrowRight" size={16} /></Button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
          {pieces.map((p, i) => <ProductCard key={p.id} piece={p} onAdd={onAdd}
          surface={surface === 'hueso' ? 'canvas' : 'hueso'} tone={i % 2 ? 'b' : 'a'} />)}
        </div>
      </div>
    </section>);

}

// Banda del estudio (preview) — split editorial sobre barro.
function StudioBand({ surface = 'barro' }) {
  const steps = [
  ['01', 'Torno', 'Cada pieza nace en el torno, moldeada a mano.'],
  ['02', 'Esmalte', 'Esmaltes mate en tonos tierra, mezclados en el estudio.'],
  ['03', 'Alta temperatura', 'Cocción a más de 1200°C — gres y porcelana resistentes.']];

  const bg = surface === 'dark' ? 'var(--surface-dark)' : 'var(--surface-barro)';
  const dark = surface === 'dark';
  const { isMobile } = useViewport();
  return (
    <section style={{ background: bg, padding: isMobile ? '64px 24px' : '96px 48px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr', gap: isMobile ? 36 : 64, alignItems: 'center' }}>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <ImageSlot ratio="3 / 4" radius="var(--radius-lg)" label="El estudio · manos trabajando" />
        </div>
        <div>
          <SectionLabel color="var(--sage)">El estudio</SectionLabel>
          <h2 className="t-heading-lg" style={{ margin: 0, color: dark ? 'var(--on-dark)' : 'var(--ink)' }}>Dos diseñadoras, un horno.</h2>
          <p className="t-body-lg" style={{ margin: '20px 0 36px', maxWidth: 520, color: dark ? 'var(--on-dark-soft)' : 'var(--body)' }}>
            Cocore nació de la voluntad de que lo cotidiano tenga forma. Trabajamos
            la cerámica de alta temperatura desde Monterrey, una pieza a la vez.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 32 }}>
            {steps.map(([n, t, d], i) =>
            <div key={n} style={{ display: 'flex', gap: 20, padding: '18px 0',
              borderTop: i === 0 ? 'none' : '1px solid ' + (dark ? 'rgba(221,213,200,.18)' : 'var(--hairline)') }}>
                <span className="t-caption" style={{ color: 'var(--terracota)', paddingTop: 3 }}>{n}</span>
                <div>
                  <div className="t-title-md" style={{ color: dark ? 'var(--on-dark)' : 'var(--ink)' }}>{t}</div>
                  <p className="t-body" style={{ margin: '4px 0 0', color: dark ? 'var(--on-dark-soft)' : 'var(--body)' }}>{d}</p>
                </div>
              </div>
            )}
          </div>
          <Button href="about.html" variant={dark ? 'light' : 'outline'}>Conocer el estudio</Button>
        </div>
      </div>
    </section>);

}

// Banda terracota con newsletter inline.
function CalloutBand() {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const { isMobile } = useViewport();
  return (
    <section style={{ background: 'var(--terracota)', padding: isMobile ? '56px 24px' : '80px 48px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'flex', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 28 : 48, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 560 }}>
          <h2 className="t-section" style={{ margin: 0, color: '#fff' }}>¿Buscas algo específico?</h2>
          <p className="t-body-lg" style={{ margin: '16px 0 0', color: 'rgba(255,255,255,.85)' }}>
            Escríbenos y diseñamos una pieza contigo, o recibe avisos de cada nueva colección.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch',
          background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.35)',
          borderRadius: 'var(--radius-pill)', overflow: 'hidden', minWidth: isMobile ? 0 : 340, width: isMobile ? '100%' : 'auto' }}>
          {done ?
          <div style={{ padding: '14px 28px', color: '#fff', display: 'flex',
            alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 15 }}>
              <Icon name="check" size={18} /> Gracias, te avisamos.
            </div> :

          <>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com"
            style={{ flex: 1, border: 'none', background: 'transparent', color: '#fff',
              padding: '14px 22px', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }} />
              <button onClick={() => email && setDone(true)}
            style={{ border: 'none', background: 'var(--surface-dark)', color: '#fff',
              padding: '0 26px', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-body)' }}>Suscribir</button>
            </>
          }
        </div>
      </div>
    </section>);

}

// Spotlight de una colección — banda oscura destacada (reservada para secciones destacadas).
function SpotlightHumo() {
  const { isMobile } = useViewport();
  return (
    <section style={{ background: 'var(--surface-dark-elev)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'stretch' }}>
        <div style={{ padding: isMobile ? '56px 24px' : '96px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: isMobile ? 2 : 1 }}>
          <SectionLabel color="var(--terracota-soft)">Colección destacada · Humo</SectionLabel>
          <h2 className="t-section" style={{ margin: 0, color: 'var(--on-dark)' }}>El esmalte que se rompe sobre las aristas.</h2>
          <p className="t-body-lg" style={{ margin: '20px 0 32px', color: 'var(--on-dark-soft)', maxWidth: 420 }}>
            Gres en tonos humo, donde el barro se asoma sobre el borde. Una colección con presencia, para la mesa y la repisa.
          </p>
          <div><Button href="catalogo.html">Explorar la colección <Icon name="arrowRight" size={16} /></Button></div>
        </div>
        <div style={{ minHeight: isMobile ? 280 : 460, order: isMobile ? 1 : 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'repeating-linear-gradient(45deg,#e0d4c2,#e0d4c2 11px,#e8ddcd 11px,#e8ddcd 22px)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '1.4px',
            textTransform: 'uppercase', color: 'var(--muted-soft)' }}>Colección Humo · banda</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { TrustStrip, ValueProps, FeaturedBand, StudioBand, CalloutBand, SpotlightHumo });