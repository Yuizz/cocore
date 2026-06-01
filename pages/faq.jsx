// faq.jsx — preguntas frecuentes agrupadas. Copy representativo (envíos por definir).
function QA({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--hairline)' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', textAlign: 'left' }}>
        <span className="t-title-lg" style={{ fontSize: 18 }}>{q}</span>
        <span style={{ color: 'var(--terracota)', flex: 'none', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
          <Icon name="plus" size={20} /></span>
      </button>
      {open && <div style={{ paddingBottom: 24, maxWidth: 680 }}><p className="t-body" style={{ margin: 0 }}>{a}</p></div>}
    </div>
  );
}

const GROUPS = [
  ['Pedidos y envíos', [
    ['¿Hacen envíos a todo México?', 'Sí. Enviamos a todo el país con empaque reforzado y número de guía para que rastrees tu pieza. El costo y el tiempo de entrega se calculan al finalizar la compra según tu código postal.'],
    ['¿Cuánto tarda en llegar mi pedido?', 'Cada pieza se hace por encargo. El tiempo de producción es de 2 a 4 semanas según la pieza, más el envío (normalmente 2 a 5 días hábiles). En la página de cada producto verás su tiempo estimado.'],
    ['¿Puedo recoger en Monterrey?', 'Sí. Somos un taller en Monterrey, sin tienda abierta al público, pero puedes recoger tu pedido por cita una vez que esté listo. Escríbenos para coordinar.'],
    ['¿Cómo sigo mi pedido?', 'Desde la página de Pedidos puedes consultar el estado con tu número de pedido. Te escribimos en cada etapa: confirmación, producción, envío y entrega.'],
  ]],
  ['Producto y cuidado', [
    ['¿Las piezas son aptas para microondas y lavavajillas?', 'La mayoría sí — están cocidas a alta temperatura. Las piezas con esmalte mate recomendamos lavarlas a mano para conservar su acabado. Cada producto indica su cuidado específico.'],
    ['¿Por qué mi pieza se ve distinta a la foto?', 'Porque es única. Al ser hechas a mano y cocidas a alta temperatura, hay pequeñas variaciones de color, textura y forma. No son defectos: son la firma del proceso.'],
    ['¿De qué material están hechas?', 'Trabajamos gres y porcelana de alta temperatura, con esmaltes mate mezclados en el estudio. Cada pieza especifica su material y medidas.'],
  ]],
  ['Cambios y devoluciones', [
    ['¿Puedo cambiar o devolver una pieza?', 'Si tu pieza llega con algún daño de envío, escríbenos dentro de los primeros 7 días con fotos y la reponemos o reembolsamos. Por ser piezas hechas a mano por encargo, no aceptamos devoluciones por cambio de opinión, salvo acuerdo previo.'],
    ['¿Qué pasa si mi pieza llega rota?', 'Lo resolvemos. Empacamos con doble protección, pero si algo llega dañado, mándanos fotos a hola@cocore.mx con tu número de pedido y coordinamos la reposición sin costo.'],
  ]],
  ['Encargos y mayoreo', [
    ['¿Hacen piezas personalizadas o por encargo?', 'Sí. Diseñamos piezas a medida y trabajamos con restaurantes, cafeterías y proyectos de hospitalidad. Cuéntanos qué buscas desde la página de Contacto.'],
    ['¿Venden a mayoreo?', 'Para pedidos grandes o de mayoreo, escríbenos directamente y armamos una cotización con tiempos de producción realistas.'],
  ]],
];

function Faq() {
  const { isMobile } = useViewport();
  const [active, setActive] = React.useState(0);
  return (
    <Shell active="ayuda">
      {() => (
        <main>
          <section style={{ padding: isMobile ? '40px 20px 24px' : '56px 48px 40px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <SectionLabel>Ayuda</SectionLabel>
              <h1 className="t-heading-lg" style={{ margin: 0 }}>Preguntas frecuentes</h1>
              <p className="t-body-lg" style={{ margin: '14px 0 0', maxWidth: 560 }}>
                Lo que más nos preguntan sobre pedidos, envíos y el cuidado de las piezas.
              </p>
            </div>
          </section>

          <section style={{ padding: isMobile ? '0 20px 64px' : '0 48px 88px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 28 : 56, alignItems: 'start' }}>
              <aside style={{ position: isMobile ? 'static' : 'sticky', top: 92, display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? 8 : 4, flexWrap: 'wrap' }}>
                {GROUPS.map(([title], i) => (
                  <button key={title} onClick={() => { setActive(i); document.getElementById('g' + i)?.scrollIntoView({ block: 'start' }); }}
                    style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontSize: 15,
                      color: active === i ? 'var(--terracota)' : 'var(--body)',
                      background: active === i ? 'var(--terracota-soft)' : 'transparent', transition: 'all .15s' }}>{title}</button>
                ))}
                <div style={{ marginTop: isMobile ? 0 : 24, padding: '18px', background: 'var(--surface-hueso)', borderRadius: 'var(--radius-md)', display: isMobile ? 'none' : 'block' }}>
                  <div className="t-title-md" style={{ marginBottom: 6 }}>¿No encuentras tu respuesta?</div>
                  <p className="t-body-sm" style={{ margin: '0 0 14px' }}>Escríbenos y te ayudamos.</p>
                  <Button href="contacto.html" variant="outline" size="sm">Contacto</Button>
                </div>
              </aside>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                {GROUPS.map(([title, items], i) => (
                  <div key={title} id={'g' + i}>
                    <h2 className="t-heading-md" style={{ margin: '0 0 8px' }}>{title}</h2>
                    <div>{items.map(([q, a]) => <QA key={q} q={q} a={a} />)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <CalloutBand />
        </main>
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Faq />);
