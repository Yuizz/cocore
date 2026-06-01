// Shell.jsx — envoltura compartida: Nav + CartDrawer + Footer + estado de carrito.
// Uso: <Shell active="tienda" navTheme="light">{(cart) => <main>…</main>}</Shell>
function Shell({ active, navTheme = 'light', hideFooter = false, children }) {
  const cart = useCart();
  const [drawer, setDrawer] = React.useState(false);
  const api = { ...cart, openCart: () => setDrawer(true),
    add: (p, q) => { cart.add(p, q); setDrawer(true); } };
  return (
    <div>
      <Nav active={active} theme={navTheme} cartCount={cart.count} onCartClick={() => setDrawer(true)} />
      {typeof children === 'function' ? children(api) : children}
      {!hideFooter && <Footer />}
      <CartDrawer open={drawer} items={cart.items} onClose={() => setDrawer(false)}
        onQty={cart.setQty} onRemove={cart.remove} />
    </div>
  );
}
window.Shell = Shell;
