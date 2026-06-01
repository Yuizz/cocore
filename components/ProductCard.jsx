// ProductCard.jsx — foto 4:5, material sage, precio, "Agregar". Hover lift + image scale. Enlaza al detalle.
function ProductCard({ piece, onAdd, surface = 'hueso', tone = 'a' }) {
  const [hover, setHover] = React.useState(false);
  const href = 'producto.html?id=' + piece.id;
  const bg = surface === 'hueso' ? 'var(--surface-hueso)' : 'var(--canvas)';
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: bg, border: '1px solid var(--hairline)',
        borderRadius: 'var(--radius-md)', padding: 16, position: 'relative',
        boxShadow: hover ? 'var(--shadow-card)' : 'none', transition: 'box-shadow .25s ease, transform .25s ease',
        transform: hover ? 'translateY(-2px)' : 'none' }}>
      <a href={href} style={{ display: 'block', position: 'relative', textDecoration: 'none' }}>
        <ImageSlot label={piece.name} scale={hover ? 1.04 : 1} tone={tone} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <StockBadge stock={piece.stock} />
        </div>
      </a>
      <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div className="t-caption" style={{ color: 'var(--sage)' }}>{piece.material}</div>
        <a href={href} className="t-title-lg" style={{ textDecoration: 'none', color: 'var(--ink)' }}>{piece.name}</a>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <div className="t-heading-md">{money(piece.price)}</div>
          <Button variant="outline" size="sm" onClick={() => onAdd && onAdd(piece)}>Agregar</Button>
        </div>
      </div>
    </div>
  );
}
window.ProductCard = ProductCard;
