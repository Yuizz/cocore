// about.jsx — El estudio. Historia, proceso, fundadoras y ubicación (Monterrey).
function About() {
  const { isMobile } = useViewport();
  return (
    <Shell active="estudio">
      {() =>
      <main>
          {/* Hero editorial */}
          <header style={{ padding: isMobile ? '40px 20px 48px' : '64px 48px 80px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <SectionLabel>El estudio</SectionLabel>
              <h1 className="t-hero" style={{ margin: 0, maxWidth: 900 }}>Dos diseñadoras, un horno, y la voluntad de que lo cotidiano tenga forma.</h1>
            </div>
          </header>

          <section style={{ padding: isMobile ? '0 20px 56px' : '0 48px 88px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '7fr 5fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <p className="t-body-lg" style={{ margin: 0 }}>
                  Cocore nació en Monterrey de una idea simple: que los objetos con los que convivimos
                  todos los días — la taza del café, el plato de la cena — merecen estar bien hechos y
                  bien pensados.
                </p>
                <p className="t-body" style={{ margin: 0 }}>
                  Empezamos como un espacio de clases y experiencias. Con el tiempo entendimos que lo
                  que más nos movía era hacer piezas, no enseñar a hacerlas. Hoy somos un estudio que
                  diseña y produce cerámica de alta temperatura para venderla directo, sin intermediarios.
                </p>
                <p className="t-body" style={{ margin: 0 }}>
                  Cambiamos de casa pero no de ciudad: seguimos operando desde Monterrey. No tenemos un
                  local abierto al público — somos un taller. Cada pieza se hace por encargo, se cuece por
                  hornadas y se envía a todo México.
                </p>
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                <ImageSlot ratio="4 / 5" radius="var(--radius-lg)" label="Las dos diseñadoras · retrato" />
              </div>
            </div>
          </section>

          {/* Proceso */}
          <section id="proceso" style={{ background: 'var(--surface-barro)', padding: isMobile ? '56px 20px' : '96px 48px', scrollMarginTop: 92 }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <SectionLabel color="var(--sage)">El proceso</SectionLabel>
              <h2 className="t-heading-lg" style={{ margin: '0 0 48px', maxWidth: 560 }}>De un bloque de barro a una pieza para toda la vida.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
                {[
              ['01', 'Torno', 'Cada pieza nace en el torno, moldeada a mano. Es el momento donde se define su carácter — ninguna sale idéntica.', 'Torno'],
              ['02', 'Esmalte', 'Mezclamos nuestros propios esmaltes mate en tonos tierra, hueso y humo. El color final solo se revela tras el fuego.', 'Esmalte'],
              ['03', 'Alta temperatura', 'Cocción a más de 1200°C. El gres y la porcelana se vuelven resistentes, aptos para el uso diario, el microondas y el lavavajillas.', 'Horno']].
              map(([n, t, d, img]) =>
              <div key={n}>
                    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 20 }}>
                      <ImageSlot ratio="4 / 5" radius="var(--radius-md)" label={img} />
                    </div>
                    <div className="t-caption" style={{ color: 'var(--terracota)', marginBottom: 10 }}>{n}</div>
                    <div className="t-title-lg" style={{ marginBottom: 8 }}>{t}</div>
                    <p className="t-body" style={{ margin: 0 }}>{d}</p>
                  </div>
              )}
              </div>
            </div>
          </section>

          {/* Cifras / manifiesto */}
          <section style={{ padding: isMobile ? '56px 20px' : '88px 48px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 28 : 48 }}>
              {[
            ['+1200°C', 'Temperatura de cocción. Lo que hace al gres y la porcelana resistentes.'],
            ['100%', 'Hecho a mano en Monterrey. Sin moldes industriales, sin maquila.'],
            ['1 a 1', 'Cada pieza es única. Pequeñas variaciones son la firma del oficio.']].
            map(([n, d]) =>
            <div key={n} style={{ borderTop: '2px solid var(--terracota)', paddingTop: 20 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 46,
                    lineHeight: 1.05, letterSpacing: '-1.5px', color: 'var(--ink)',
                    fontFeatureSettings: '"tnum" 1' }}>{n}</div>
                  <p className="t-body" style={{ margin: '12px 0 0', maxWidth: 280 }}>{d}</p>
                </div>
            )}
            </div>
          </section>

          {/* Ubicación */}
          <section style={{ background: 'var(--surface-dark)', padding: isMobile ? '56px 20px' : '88px 48px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center' }}>
              <div>
                <SectionLabel color="var(--sage)">Dónde estamos</SectionLabel>
                <h2 className="t-heading-lg" style={{ margin: 0, color: 'var(--on-dark)' }}>Base de operaciones en Monterrey.</h2>
                <p className="t-body-lg" style={{ margin: '20px 0 28px', color: 'var(--on-dark-soft)', maxWidth: 460 }}>
                  Somos un taller, no una tienda física. Producimos y enviamos desde Monterrey a todo
                  México. Si estás en la ciudad, puedes recoger tu pedido por cita.
                </p>
                <div style={{ display: 'flex', gap: 14 }}>
                  <Button href="contacto.html" variant="light">Contáctanos</Button>
                  <Button href="catalogo.html" variant="secondary" style={{ color: 'var(--on-dark)' }}>Ver catálogo</Button>
                </div>
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <ImageSlot ratio="3 / 2" radius="var(--radius-lg)" label="Monterrey · el taller" />
              </div>
            </div>
          </section>

          <CalloutBand />
        </main>
      }
    </Shell>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<About />);