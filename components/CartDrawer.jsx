// CartDrawer.jsx — drawer derecho sobre overlay oscuro. Pago se delega a pasarela externa.
function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [confirmed, setConfirmed] = React.useState(false);
  React.useEffect(() => {if (open) setConfirmed(false);}, [open]);
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(30,26,23,0.45)', opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none', transition: 'opacity .3s ease' }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 51, width: 420,
        maxWidth: '92vw', background: 'var(--canvas)', borderTopLeftRadius: 'var(--radius-lg)',
        borderBottomLeftRadius: 'var(--radius-lg)', transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .32s cubic-bezier(.4,0,.2,1)', display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(26,21,16,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 28px', borderBottom: '1px solid var(--hairline)' }}>
          <span className="t-title-lg">Tu carrito{count > 0 && ` (${count})`}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--body)', display: 'flex' }}><Icon name="x" size={22} /></button>
        </div>

        {confirmed ?
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: 40, textAlign: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--sage)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={28} stroke="#fff" /></div>
            <div className="t-heading-md">Te llevamos al pago</div>
            <p className="t-body" style={{ margin: 0 }}>El cobro y el envío se procesan en nuestra pasarela segura. Podrás seguir tu pedido desde <a href="pedidos.html" style={{ color: 'var(--terracota)' }}>Pedidos</a>.</p>
          </div> :
        items.length === 0 ?
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: 40, textAlign: 'center', gap: 12 }}>
            <Icon name="cart" size={32} stroke="var(--muted-soft)" />
            <p className="t-body" style={{ margin: 0 }}>Tu carrito está vacío.</p>
            <Button href="catalogo.html" variant="outline" size="sm">Explorar catálogo</Button>
          </div> :

        <>
            <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex',
            flexDirection: 'column', gap: 14 }}>
              {items.map((it) =>
            <div key={it.id} style={{ display: 'flex', gap: 14, padding: 12,
              border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)',
              background: 'var(--surface-hueso)' }}>
                  <a href={'producto.html?id=' + it.id} style={{ width: 64, flex: 'none' }}>
                    <ImageSlot ratio="1 / 1" label="" /></a>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <div className="t-caption" style={{ color: 'var(--sage)' }}>{it.material}</div>
                      <button onClick={() => onRemove(it.id)} title="Quitar" style={{ background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--muted-soft)', display: 'flex', padding: 0 }}><Icon name="x" size={15} /></button>
                    </div>
                    <a href={'producto.html?id=' + it.id} className="t-title-md" style={{ textDecoration: 'none', color: 'var(--ink)' }}>{it.name}</a>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10,
                    border: '1px solid var(--hairline)', borderRadius: 'var(--radius-pill)', padding: '4px 10px' }}>
                        <button onClick={() => onQty(it.id, -1)} style={{ background: 'none', border: 'none',
                      cursor: 'pointer', display: 'flex', color: 'var(--body)' }}><Icon name="minus" size={14} /></button>
                        <span className="t-body" style={{ minWidth: 14, textAlign: 'center' }}>{it.qty}</span>
                        <button onClick={() => onQty(it.id, 1)} style={{ background: 'none', border: 'none',
                      cursor: 'pointer', display: 'flex', color: 'var(--body)' }}><Icon name="plus" size={14} /></button>
                      </div>
                      <span className="t-title-md">{money(it.price * it.qty)}</span>
                    </div>
                  </div>
                </div>
            )}
            </div>
            <div style={{ padding: 24, borderTop: '1px solid var(--hairline)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span className="t-body">Subtotal</span>
                <span className="t-heading-md" style={{ whiteSpace: 'nowrap' }}>{money(total)} <span className="t-body-sm">MXN</span></span>
              </div>
              <p className="t-micro" style={{ margin: '0 0 16px' }}>Envío calculado en el pago · producción 2–4 semanas.</p>
              <Button variant="dark" full onClick={() => setConfirmed(true)}>Ir a pagar</Button>
            </div>
          </>
        }
      </aside>
    </>);

}
window.CartDrawer = CartDrawer;