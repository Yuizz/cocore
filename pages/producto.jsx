// producto.jsx — detalle de pieza. Lee ?id= de la URL.
function Accordion({ rows }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ borderTop: '1px solid var(--hairline)' }}>
      {rows.map(([title, body], i) => {
        const on = open === i;
        return (
          <div key={title} style={{ borderBottom: '1px solid var(--hairline)' }}>
            <button onClick={() => setOpen(on ? -1 : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'none', border: 'none', cursor: 'pointer', padding: '18px 0', textAlign: 'left' }}>
              <span className="t-title-md">{title}</span>
              <span style={{ color: 'var(--muted)', transform: on ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
                <Icon name="chevronDown" size={18} /></span>
            </button>
            {on && <div style={{ paddingBottom: 20 }}><p className="t-body" style={{ margin: 0 }}>{body}</p></div>}
          </div>
        );
      })}
    </div>
  );
}

function Producto() {
  const { isMobile } = useViewport();
  const id = new URLSearchParams(location.search).get('id') || CATALOG[0].id;
  const p = getProduct(id) || CATALOG[0];
  const related = relatedTo(p.id, 3);
  const [qty, setQty] = React.useState(1);

  return (
    <Shell active="tienda">
      {(cart) => (
        <main>
          <section style={{ padding: isMobile ? '20px 20px 0' : '32px 48px 0' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 0 }}>
              <div className="t-body-sm" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="index.html" style={{ textDecoration: 'none', color: 'var(--muted)' }}>Inicio</a>
                <Icon name="chevronRight" size={13} stroke="var(--muted-soft)" />
                <a href="catalogo.html" style={{ textDecoration: 'none', color: 'var(--muted)' }}>Catálogo</a>
                <Icon name="chevronRight" size={13} stroke="var(--muted-soft)" />
                <span style={{ color: 'var(--ink)' }}>{p.name}</span>
              </div>
            </div>
          </section>

          <section style={{ padding: isMobile ? '20px 20px 64px' : '32px 48px 88px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 28 : 64, alignItems: 'start' }}>
              {/* Imagen(es) */}
              <div style={{ position: isMobile ? 'static' : 'sticky', top: 92, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                  <ImageSlot ratio="4 / 5" radius="var(--radius-lg)" label={p.name + ' · 4:5'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <ImageSlot ratio="1 / 1" radius="var(--radius-md)" label="Detalle" tone="b" />
                  <ImageSlot ratio="1 / 1" radius="var(--radius-md)" label="En uso" />
                </div>
              </div>

              {/* Info */}
              <div>
                <SectionLabel>Colección {p.collection}</SectionLabel>
                <h1 className="t-heading-lg" style={{ margin: 0 }}>{p.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '18px 0', flexWrap: 'wrap' }}>
                  <span className="t-heading-md" style={{ whiteSpace: 'nowrap' }}>{money(p.price)} <span className="t-body-sm">MXN</span></span>
                  <StockBadge stock={p.stock} />
                </div>
                <p className="t-body-lg" style={{ margin: '0 0 24px', maxWidth: 480 }}>{p.desc}</p>

                {/* Aviso pieza única */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 18px',
                  background: 'var(--surface-hueso)', borderRadius: 'var(--radius-md)', marginBottom: 28 }}>
                  <span style={{ color: 'var(--terracota)', flex: 'none', marginTop: 2 }}><Icon name="sparkle" size={18} /></span>
                  <p className="t-body-sm" style={{ margin: 0, color: 'var(--body)' }}>
                    <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{p.tagline}.</strong> Recibirás una pieza única,
                    con pequeñas variaciones de color y textura propias de la alta temperatura.
                  </p>
                </div>

                {/* Cantidad + agregar */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14,
                    border: '1px solid var(--hairline)', borderRadius: 'var(--radius-pill)', padding: '10px 16px' }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--body)' }}><Icon name="minus" size={15} /></button>
                    <span className="t-title-md" style={{ minWidth: 18, textAlign: 'center' }}>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--body)' }}><Icon name="plus" size={15} /></button>
                  </div>
                  <Button onClick={() => cart.add(p, qty)} size="lg" style={{ flex: 1 }}>Agregar al carrito</Button>
                </div>

                {/* Producción y envío */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '16px 0 28px' }}>
                  <span className="t-body-sm" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Icon name="clock" size={16} stroke="var(--sage)" /> Producción {p.production}</span>
                  <span className="t-body-sm" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Icon name="truck" size={16} stroke="var(--sage)" /> Envío a todo México</span>
                </div>

                {/* Detalles */}
                <Accordion rows={[
                  ['Material', p.material + '. Cocido a más de 1200°C, apto para uso diario.'],
                  ['Medidas', p.dims + (p.weight ? ' · ' + p.weight : '')],
                  ['Cuidado', p.care],
                  ['Producción y envío', 'Tiempo de producción estimado: ' + p.production + '. Enviamos a todo México con empaque reforzado y número de seguimiento. Recolección en Monterrey disponible por mensaje.'],
                ]} />
              </div>
            </div>
          </section>

          {/* Relacionados */}
          <FeaturedBand surface="hueso" label="También de la colección" title="Piezas que combinan"
            pieces={related} onAdd={cart.add} cta="Ver catálogo" />
          <CalloutBand />
        </main>
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Producto />);
