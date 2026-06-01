// pedidos.jsx — seguimiento de pedido dentro del sitio. Estados con línea de tiempo.
const STATES = ['Confirmado', 'En producción', 'En camino', 'Entregado'];
// Pedidos de ejemplo (placeholder representativo — luego se conecta a logística real).
const ORDERS = {
  'CC-1042': {
    email: 'ana@correo.com', date: '18 may 2026', state: 1,
    items: [{ id: 'taza-barro-mate', name: 'Taza Barro Mate', material: 'Gres · Esmalte mate', price: 480, qty: 2 },
    { id: 'tazon-desayuno', name: 'Tazón de Desayuno', material: 'Gres', price: 540, qty: 1 }],
    eta: '5–8 jun 2026', address: 'Col. Del Valle, San Pedro, N.L.',
    note: 'En el torno esta semana. Te avisamos cuando salga del horno.'
  },
  'CC-1031': {
    email: 'luis@correo.com', date: '2 may 2026', state: 2,
    items: [{ id: 'jarra-agua', name: 'Jarra de Agua', material: 'Porcelana', price: 1180, qty: 1 }],
    eta: '1–3 jun 2026', address: 'Centro, Monterrey, N.L.', guide: 'Estafeta · 7700 1234 5678',
    note: 'Tu pieza va en camino. Empacada con doble protección.'
  },
  'CC-0998': {
    email: 'mara@correo.com', date: '12 abr 2026', state: 3,
    items: [{ id: 'florero-cilindrico', name: 'Florero Cilíndrico', material: 'Gres · Alta temperatura', price: 1320, qty: 1 }],
    eta: 'Entregado 20 abr 2026', address: 'Obispado, Monterrey, N.L.',
    note: 'Entregado. Gracias por darle casa a esta pieza.'
  }
};

function Timeline({ state }) {
  const { isMobile } = useViewport();
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '4px 0' }}>
        {STATES.map((s, i) => {
          const done = i <= state;
          const isLast = i === STATES.length - 1;
          return (
            <div key={s} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', flex: 'none',
                  background: done ? 'var(--terracota)' : 'var(--surface-hueso)',
                  border: '1px solid ' + (done ? 'var(--terracota)' : 'var(--hairline)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {done && <Icon name="check" size={13} stroke="#fff" strokeWidth={2.5} />}
                </div>
                {!isLast && <div style={{ width: 2, height: 22, background: i < state ? 'var(--terracota)' : 'var(--hairline)' }} />}
              </div>
              <span className="t-body-sm" style={{ color: done ? 'var(--ink)' : 'var(--muted)', paddingTop: 2,
                paddingBottom: isLast ? 0 : 18, fontWeight: i === state ? 500 : 400 }}>{s}</span>
            </div>);
        })}
      </div>);
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, margin: '8px 0 4px' }}>
      {STATES.map((s, i) => {
        const done = i <= state;
        const isLast = i === STATES.length - 1;
        return (
          <div key={s} style={{ flex: isLast ? '0 0 auto' : 1, display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: isLast ? 'auto' : 0, minWidth: 96 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', flex: 'none',
                background: done ? 'var(--terracota)' : 'var(--surface-hueso)',
                border: '1px solid ' + (done ? 'var(--terracota)' : 'var(--hairline)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {done && <Icon name="check" size={14} stroke="#fff" strokeWidth={2.5} />}
              </div>
              <span className="t-body-sm" style={{ textAlign: 'center', color: done ? 'var(--ink)' : 'var(--muted)', maxWidth: 90 }}>{s}</span>
            </div>
            {!isLast && <div style={{ flex: 1, height: 2, marginTop: 12,
              background: i < state ? 'var(--terracota)' : 'var(--hairline)' }} />}
          </div>);

      })}
    </div>);

}

function OrderCard({ id, order }) {
  const { isMobile } = useViewport();
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--canvas)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        padding: '22px 28px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-hueso)' }}>
        <div>
          <div className="t-caption" style={{ color: 'var(--muted)' }}>Pedido</div>
          <div className="t-title-lg">#{id}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="t-body-sm">Realizado el {order.date}</div>
          <Badge tone={order.state === 3 ? 'sage' : order.state === 2 ? 'warning' : 'dark'}>{STATES[order.state]}</Badge>
        </div>
      </div>
      <div style={{ padding: '28px' }}>
        <Timeline state={order.state} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '20px 0 28px',
          padding: '14px 18px', background: 'var(--surface-hueso)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ color: 'var(--terracota)', flex: 'none', marginTop: 1 }}><Icon name="package" size={18} /></span>
          <p className="t-body-sm" style={{ margin: 0, color: 'var(--body)' }}>{order.note}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 28 }}>
          <div>
            <div className="t-caption" style={{ color: 'var(--muted)', marginBottom: 8 }}>Entrega estimada</div>
            <div className="t-body" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name="truck" size={16} stroke="var(--sage)" /> {order.eta}</div>
            {order.guide && <div className="t-body-sm" style={{ marginTop: 6 }}>Guía: {order.guide}</div>}
          </div>
          <div>
            <div className="t-caption" style={{ color: 'var(--muted)', marginBottom: 8 }}>Envío a</div>
            <div className="t-body" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name="mapPin" size={16} stroke="var(--sage)" /> {order.address}</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 20 }}>
          {order.items.map((it) =>
          <div key={it.id} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '8px 0' }}>
              <div style={{ width: 52, flex: 'none' }}><ImageSlot ratio="1 / 1" radius="var(--radius-sm)" label="" /></div>
              <div style={{ flex: 1 }}>
                <div className="t-title-md">{it.name}</div>
                <div className="t-body-sm">{it.material} · ×{it.qty}</div>
              </div>
              <div className="t-title-md">{money(it.price * it.qty)}</div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hairline)' }}>
            <span className="t-body">Total</span>
            <span className="t-heading-md" style={{ whiteSpace: 'nowrap' }}>{money(total)} <span className="t-body-sm">MXN</span></span>
          </div>
        </div>
      </div>
    </div>);

}

function Pedidos() {
  const { isMobile } = useViewport();
  const [num, setNum] = React.useState('');
  const [found, setFound] = React.useState(null);
  const [error, setError] = React.useState('');
  const search = (n) => {
    const key = (n || num).trim().toUpperCase().replace(/^#/, '');
    if (ORDERS[key]) {setFound(key);setError('');} else
    {setFound(null);setError('No encontramos ese pedido. Revisa el número o escríbenos.');}
  };

  return (
    <Shell active="pedidos">
      {() =>
      <main>
          <section style={{ padding: isMobile ? '40px 20px 24px' : '56px 48px 32px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
              <SectionLabel style={{ display: 'inline-block' }}>Seguimiento</SectionLabel>
              <h1 className="t-heading-lg" style={{ margin: 0 }}>Sigue tu pedido</h1>
              <p className="t-body-lg" style={{ margin: '14px auto 0', maxWidth: 520 }}>
                Cada pieza se hace por encargo. Aquí ves en qué etapa va la tuya, del torno a tu puerta.
              </p>
            </div>
          </section>

          <section style={{ padding: isMobile ? '0 20px 40px' : '0 48px 40px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'stretch',
              background: 'var(--surface-hueso)', border: '1px solid var(--hairline)',
              borderRadius: 'var(--radius-lg)', padding: 16 }}>
                <input value={num} onChange={(e) => setNum(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search()}
              placeholder="Número de pedido (ej. CC-1042)"
              style={{ flex: '1 1 220px', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-pill)',
                padding: '13px 22px', fontSize: 15, fontFamily: 'var(--font-body)', background: 'var(--canvas)',
                color: 'var(--ink)', outline: 'none' }} />
                <input placeholder="Correo del pedido"
              style={{ flex: '1 1 220px', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-pill)',
                padding: '13px 22px', fontSize: 15, fontFamily: 'var(--font-body)', background: 'var(--canvas)',
                color: 'var(--ink)', outline: 'none' }} />
                <Button onClick={() => search()} size="md">Buscar pedido</Button>
              </div>
              {error && <p className="t-body-sm" style={{ color: 'var(--error)', margin: '14px 4px 0' }}>{error}</p>}
              <div className="t-body-sm" style={{ margin: '14px 4px 0', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                Prueba con:
                {Object.keys(ORDERS).map((k) =>
              <button key={k} onClick={() => {setNum(k);search(k);}}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--terracota)',
                fontFamily: 'var(--font-body)', fontSize: 14, padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>#{k}</button>
              )}
              </div>
            </div>
          </section>

          {found &&
        <section style={{ padding: isMobile ? '8px 20px 56px' : '8px 48px 64px' }}>
              <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <OrderCard id={found} order={ORDERS[found]} />
              </div>
            </section>
        }

          {/* Cómo funciona */}
          <section style={{ background: 'var(--surface-barro)', padding: isMobile ? '56px 20px' : '80px 48px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <SectionLabel color="var(--sage)">Cómo funciona</SectionLabel>
              <h2 className="t-heading-lg" style={{ margin: '0 0 40px' }}>Del torno a tu puerta</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 16, alignItems: 'stretch' }}>
                {[
              ['package', 'Confirmamos', 'Recibimos tu pedido y te lo confirmamos por correo.', false],
              ['flame', 'Horneamos', 'Torneado, esmaltado y cocción a alta temperatura. De 2 a 4 semanas.', true],
              ['truck', 'Enviamos', 'Empaque reforzado y guía de rastreo a todo México.', false],
              ['sparkle', 'Disfrutas', 'Una pieza única en tus manos. Cuéntanos cómo te llegó.', false]].
              map(([ic, t, d, hot], i) =>
              <div key={t} style={{ position: 'relative', padding: '20px 18px',
                borderRadius: 'var(--radius-md)',
                background: hot ? 'rgba(181,88,58,0.07)' : 'transparent',
                border: hot ? '1px solid var(--terracota)' : '1px solid transparent' }}>
                    {hot && <div className="t-caption" style={{ color: 'var(--terracota)', position: 'absolute',
                      top: -10, left: 16, background: 'var(--surface-barro)', padding: '0 8px' }}>Solo por encargo</div>}
                    <div className="t-caption" style={{ color: 'var(--terracota)', marginBottom: 12 }}>0{i + 1}</div>
                    <div style={{ color: hot ? 'var(--terracota)' : 'var(--ink)', marginBottom: 12 }}><Icon name={ic} size={22} stroke={hot ? 'var(--terracota)' : 'var(--ink)'} /></div>
                    <div className="t-title-md" style={{ marginBottom: 6 }}>{t}</div>
                    <p className="t-body-sm" style={{ margin: 0 }}>{d}</p>
                  </div>
              )}
              </div>
              <p className="t-body-sm" style={{ margin: '32px 0 0' }}>
                ¿Algo con tu pedido? Escríbenos a <a href="contacto.html" style={{ color: 'var(--terracota)' }}>hola@cocore.mx</a> con tu número de pedido.
              </p>
            </div>
          </section>
        </main>
      }
    </Shell>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<Pedidos />);