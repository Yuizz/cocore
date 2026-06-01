// catalogo.jsx — listado completo con filtros (categoría, material, colección) + orden.
function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--hairline)' }}>
      <div className="t-caption" style={{ color: 'var(--muted)', marginBottom: 14 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {options.map(opt => {
          const on = selected.includes(opt);
          return (
            <button key={opt} onClick={() => onToggle(opt)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none',
                cursor: 'pointer', padding: '7px 0', textAlign: 'left', fontFamily: 'var(--font-body)',
                fontSize: 15, color: on ? 'var(--ink)' : 'var(--body)' }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, flex: 'none',
                border: '1px solid ' + (on ? 'var(--terracota)' : 'var(--hairline)'),
                background: on ? 'var(--terracota)' : 'transparent', display: 'flex',
                alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
                {on && <Icon name="check" size={11} stroke="#fff" strokeWidth={2.5} />}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Catalogo() {
  const [cats, setCats] = React.useState([]);
  const [mats, setMats] = React.useState([]);
  const [cols, setCols] = React.useState([]);
  const [sort, setSort] = React.useState('Destacados');
  const toggle = (setter) => (v) => setter(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  let shown = CATALOG.filter(p =>
    (cats.length === 0 || cats.includes(p.category)) &&
    (mats.length === 0 || mats.includes(p.materialKey)) &&
    (cols.length === 0 || cols.includes(p.collection)));
  if (sort === 'Precio: menor a mayor') shown = [...shown].sort((a, b) => a.price - b.price);
  if (sort === 'Precio: mayor a menor') shown = [...shown].sort((a, b) => b.price - a.price);

  const active = cats.length + mats.length + cols.length;
  const clearAll = () => { setCats([]); setMats([]); setCols([]); };

  return (
    <Shell active="tienda">
      {(cart) => (
        <main>
          {/* Encabezado */}
          <section style={{ padding: '48px 48px 32px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <SectionLabel>Catálogo</SectionLabel>
              <h1 className="t-heading-lg" style={{ margin: 0 }}>Todas las piezas</h1>
              <p className="t-body-lg" style={{ margin: '14px 0 0', maxWidth: 560 }}>
                Cada pieza es única y se cuece por hornadas. Lo que ves disponible se envía a todo México.
              </p>
            </div>
          </section>

          <section style={{ padding: '0 48px 96px' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
              display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' }}>
              {/* Rail de filtros */}
              <aside style={{ position: 'sticky', top: 92 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                  <span className="t-title-md" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name="sliders" size={17} /> Filtros</span>
                  {active > 0 && <button onClick={clearAll} className="t-body-sm"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--terracota)', padding: 0 }}>Limpiar</button>}
                </div>
                <FilterGroup title="Categoría" options={CATEGORIES} selected={cats} onToggle={toggle(setCats)} />
                <FilterGroup title="Material" options={['Gres', 'Porcelana', 'Esmalte mate']} selected={mats} onToggle={toggle(setMats)} />
                <FilterGroup title="Colección" options={COLLECTIONS.map(c => c.key)} selected={cols} onToggle={toggle(setCols)} />
              </aside>

              {/* Grid */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                  <span className="t-body-sm">{shown.length} {shown.length === 1 ? 'pieza' : 'piezas'}</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="t-body-sm">Ordenar</span>
                    <select value={sort} onChange={e => setSort(e.target.value)}
                      style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)',
                        border: '1px solid var(--hairline)', borderRadius: 'var(--radius-pill)',
                        padding: '8px 16px', background: 'var(--canvas)', cursor: 'pointer' }}>
                      <option>Destacados</option>
                      <option>Precio: menor a mayor</option>
                      <option>Precio: mayor a menor</option>
                    </select>
                  </label>
                </div>
                {shown.length === 0 ? (
                  <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <p className="t-body-lg" style={{ margin: 0 }}>No hay piezas con estos filtros.</p>
                    <div style={{ marginTop: 16 }}><Button variant="outline" size="sm" onClick={clearAll}>Limpiar filtros</Button></div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {shown.map((p, i) => <ProductCard key={p.id} piece={p} onAdd={cart.add} tone={i % 2 ? 'b' : 'a'} />)}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Catalogo />);
