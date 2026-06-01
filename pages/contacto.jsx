// contacto.jsx — formulario + datos de contacto. Estado de agradecimiento al enviar.
function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="t-caption" style={{ color: 'var(--muted)' }}>{label}</span>
      {children}
    </label>
  );
}
const inputStyle = {
  border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', padding: '13px 16px',
  fontSize: 15, fontFamily: 'var(--font-body)', background: 'var(--canvas)', color: 'var(--ink)', outline: 'none', width: '100%',
};

function Contacto() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ nombre: '', correo: '', asunto: 'Un pedido', mensaje: '' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const canSend = form.nombre && form.correo && form.mensaje;

  return (
    <Shell active="estudio">
      {() => (
        <main>
          <section style={{ padding: '56px 48px 88px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
              display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 72, alignItems: 'start' }}>
              {/* Form */}
              <div>
                <SectionLabel>Contacto</SectionLabel>
                <h1 className="t-heading-lg" style={{ margin: 0 }}>Escríbenos</h1>
                <p className="t-body-lg" style={{ margin: '14px 0 36px', maxWidth: 480 }}>
                  ¿Un pedido, un encargo a medida o una duda? Cuéntanos y te respondemos en uno o dos días.
                </p>

                {sent ? (
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '24px 26px',
                    background: 'var(--surface-hueso)', borderRadius: 'var(--radius-md)', maxWidth: 480 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--sage)', flex: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="check" size={22} stroke="#fff" /></div>
                    <div>
                      <div className="t-title-lg" style={{ marginBottom: 4 }}>Gracias, {form.nombre.split(' ')[0] || 'gracias'}.</div>
                      <p className="t-body" style={{ margin: 0 }}>Recibimos tu mensaje. Te escribimos pronto a {form.correo}.</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <Field label="Nombre"><input value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" style={inputStyle} /></Field>
                      <Field label="Correo"><input value={form.correo} onChange={set('correo')} placeholder="tu@correo.com" style={inputStyle} /></Field>
                    </div>
                    <Field label="¿Sobre qué?">
                      <select value={form.asunto} onChange={set('asunto')} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option>Un pedido</option>
                        <option>Encargo personalizado</option>
                        <option>Mayoreo / hospitalidad</option>
                        <option>Prensa o colaboración</option>
                        <option>Otro</option>
                      </select>
                    </Field>
                    <Field label="Mensaje"><textarea value={form.mensaje} onChange={set('mensaje')} rows={5} placeholder="Cuéntanos…" style={{ ...inputStyle, resize: 'vertical' }} /></Field>
                    <div>
                      <Button onClick={() => canSend && setSent(true)} size="lg"
                        style={{ opacity: canSend ? 1 : 0.5 }}>Enviar mensaje <Icon name="arrowRight" size={16} /></Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Datos */}
              <div>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
                  <ImageSlot ratio="3 / 2" radius="var(--radius-lg)" label="El taller · Monterrey" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    ['mail', 'Correo', 'hola@cocore.mx'],
                    ['phone', 'WhatsApp', '+52 81 0000 0000'],
                    ['instagram', 'Instagram', '@cocore.mx'],
                    ['mapPin', 'Taller', 'Monterrey, N.L. · visitas por cita'],
                    ['clock', 'Respuesta', 'Lun a vie · 10:00–18:00'],
                  ].map(([ic, t, v]) => (
                    <div key={t} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--hairline)' }}>
                      <span style={{ color: 'var(--terracota)', flex: 'none' }}><Icon name={ic} size={20} /></span>
                      <div>
                        <div className="t-caption" style={{ color: 'var(--muted)', marginBottom: 2 }}>{t}</div>
                        <div className="t-body" style={{ color: 'var(--ink)' }}>{v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Contacto />);
