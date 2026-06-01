// store.jsx — catálogo representativo + carrito persistente (localStorage) compartido entre páginas.

// ---------- CATÁLOGO ----------
// Catálogo representativo coherente con la marca. Reemplazar por data real / proveedor.
const CATALOG = [
  {
    id: 'taza-barro-mate', name: 'Taza Barro Mate', category: 'Tazas',
    material: 'Gres · Esmalte mate', materialKey: 'Gres', price: 480, stock: 'in',
    collection: 'Tierra', dims: 'Ø 8.5 cm · alto 9 cm · 280 ml', weight: '320 g',
    care: 'Apta para microondas y lavavajillas. Recomendamos lavado a mano para cuidar el esmalte mate.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Una taza de uso diario con esmalte mate en tono tierra. El barro se siente en la mano: cada una varía ligeramente en color y textura según la cocción.',
  },
  {
    id: 'plato-hondo-hueso', name: 'Plato Hondo Hueso', category: 'Platos',
    material: 'Porcelana', materialKey: 'Porcelana', price: 620, stock: 'in',
    collection: 'Hueso', dims: 'Ø 21 cm · alto 4.5 cm', weight: '480 g',
    care: 'Apto para microondas, horno y lavavajillas. Porcelana de alta temperatura.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Plato hondo de porcelana cocida a alta temperatura, de acabado liso color hueso. Para sopas, pastas y caldos.',
  },
  {
    id: 'vasija-pequena', name: 'Vasija Pequeña', category: 'Vasijas',
    material: 'Gres · Alta temperatura', materialKey: 'Gres', price: 940, stock: 'low',
    collection: 'Humo', dims: 'Ø 12 cm · alto 16 cm', weight: '760 g',
    care: 'Decorativa. Resiste agua; limpiar con paño húmedo.',
    production: '3–4 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Vasija de gres con esmalte humo, torneada a mano. Una pieza escultórica para flores secas o como objeto en sí mismo.',
  },
  {
    id: 'tazon-desayuno', name: 'Tazón de Desayuno', category: 'Cuencos',
    material: 'Gres', materialKey: 'Gres', price: 540, stock: 'in',
    collection: 'Tierra', dims: 'Ø 14 cm · alto 7 cm · 450 ml', weight: '410 g',
    care: 'Apto para microondas y lavavajillas.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Tazón amplio para avena, fruta o café con leche. Gres resistente con un borde generoso para sostener con ambas manos.',
  },
  {
    id: 'jarra-agua', name: 'Jarra de Agua', category: 'Jarras',
    material: 'Porcelana', materialKey: 'Porcelana', price: 1180, stock: 'in',
    collection: 'Hueso', dims: 'Alto 22 cm · 1.2 L', weight: '900 g',
    care: 'Apta para lavavajillas. No exponer a cambios bruscos de temperatura.',
    production: '3–4 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Jarra de porcelana con vertedor preciso y asa cómoda. Para la mesa diaria o para servir con cierta ceremonia.',
  },
  {
    id: 'set-dos-tazas', name: 'Set de Dos Tazas', category: 'Sets',
    material: 'Gres · Esmalte mate', materialKey: 'Esmalte mate', price: 860, stock: 'low',
    collection: 'Tierra', dims: 'Ø 8 cm · alto 8.5 cm · 240 ml c/u', weight: '600 g (par)',
    care: 'Lavado a mano recomendado para el esmalte mate.',
    production: '2–3 semanas', tagline: 'Hecho a mano · piezas hermanas',
    desc: 'Dos tazas hermanas, cocidas en la misma hornada. Comparten carácter pero no son idénticas — así es la alta temperatura.',
  },
  {
    id: 'plato-llano', name: 'Plato Llano', category: 'Platos',
    material: 'Porcelana', materialKey: 'Porcelana', price: 460, stock: 'in',
    collection: 'Hueso', dims: 'Ø 26 cm · alto 2.5 cm', weight: '520 g',
    care: 'Apto para microondas, horno y lavavajillas.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Plato llano de porcelana para el plato fuerte. Borde limpio, superficie lisa color hueso.',
  },
  {
    id: 'cuenco-hondo', name: 'Cuenco Hondo', category: 'Cuencos',
    material: 'Gres', materialKey: 'Gres', price: 580, stock: 'in',
    collection: 'Humo', dims: 'Ø 16 cm · alto 8 cm · 600 ml', weight: '470 g',
    care: 'Apto para microondas y lavavajillas.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Cuenco profundo para ramen, ensaladas o guisos. Gres en tono humo con interior esmaltado.',
  },
  {
    id: 'florero-cilindrico', name: 'Florero Cilíndrico', category: 'Vasijas',
    material: 'Gres · Alta temperatura', materialKey: 'Gres', price: 1320, stock: 'in',
    collection: 'Humo', dims: 'Ø 11 cm · alto 24 cm', weight: '1.1 kg',
    care: 'Resiste agua. Limpiar interior con cuidado.',
    production: '3–4 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Florero alto y recto, de líneas sobrias. El esmalte humo se rompe sobre las aristas, revelando el barro.',
  },
  {
    id: 'taza-espresso', name: 'Taza Espresso', category: 'Tazas',
    material: 'Porcelana', materialKey: 'Porcelana', price: 360, stock: 'in',
    collection: 'Hueso', dims: 'Ø 6 cm · alto 6 cm · 90 ml', weight: '180 g',
    care: 'Apta para lavavajillas.',
    production: '2 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Pequeña taza para espresso o cortado. Paredes finas de porcelana que conservan el calor.',
  },
  {
    id: 'plato-postre', name: 'Plato de Postre', category: 'Platos',
    material: 'Gres · Esmalte mate', materialKey: 'Esmalte mate', price: 420, stock: 'in',
    collection: 'Tierra', dims: 'Ø 18 cm · alto 2 cm', weight: '340 g',
    care: 'Lavado a mano recomendado.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Plato pequeño para postre, pan o como bajoplato. Esmalte mate cálido con borde irregular sutil.',
  },
  {
    id: 'set-cena-cuatro', name: 'Set de Cena para Cuatro', category: 'Sets',
    material: 'Gres', materialKey: 'Gres', price: 2980, stock: 'low',
    collection: 'Tierra', dims: '4 platos llanos + 4 hondos', weight: '3.8 kg',
    care: 'Apto para microondas y lavavajillas.',
    production: '4–5 semanas', tagline: 'Hecho por encargo',
    desc: 'Vajilla completa para cuatro personas: cuatro platos llanos y cuatro hondos, cocidos en la misma temporada para que dialoguen entre sí.',
  },
  {
    id: 'mug-grande', name: 'Mug Grande', category: 'Tazas',
    material: 'Gres', materialKey: 'Gres', price: 520, stock: 'in',
    collection: 'Humo', dims: 'Ø 9 cm · alto 11 cm · 400 ml', weight: '420 g',
    care: 'Apto para microondas y lavavajillas.',
    production: '2–3 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Mug de buen tamaño para café largo o té. Asa amplia, gres en tono humo.',
  },
  {
    id: 'ensaladera', name: 'Ensaladera', category: 'Cuencos',
    material: 'Gres · Alta temperatura', materialKey: 'Gres', price: 1480, stock: 'in',
    collection: 'Tierra', dims: 'Ø 28 cm · alto 12 cm', weight: '1.9 kg',
    care: 'Apto para lavavajillas.',
    production: '3–4 semanas', tagline: 'Pieza única, hecha a mano',
    desc: 'Ensaladera amplia para el centro de la mesa. Gres robusto que aguanta el uso diario y el de los días de fiesta.',
  },
];

const COLLECTIONS = [
  { key: 'Tierra', name: 'Tierra', desc: 'Esmaltes mate en tonos cálidos, terrosos.' },
  { key: 'Hueso', name: 'Hueso', desc: 'Porcelana lisa, color hueso, líneas limpias.' },
  { key: 'Humo', name: 'Humo', desc: 'Gres con esmalte que se rompe sobre las aristas.' },
];

const CATEGORIES = ['Tazas', 'Platos', 'Cuencos', 'Jarras', 'Vasijas', 'Sets'];

function getProduct(id) { return CATALOG.find(p => p.id === id); }
function relatedTo(id, n = 3) {
  const p = getProduct(id);
  if (!p) return CATALOG.slice(0, n);
  const same = CATALOG.filter(x => x.id !== id && (x.collection === p.collection || x.category === p.category));
  const rest = CATALOG.filter(x => x.id !== id && !same.includes(x));
  return [...same, ...rest].slice(0, n);
}

// ---------- CARRITO (localStorage) ----------
const CART_KEY = 'cocore_cart_v1';
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cocore-cart'));
}
function useCart() {
  const [items, setItems] = React.useState(readCart);
  React.useEffect(() => {
    const sync = () => setItems(readCart());
    window.addEventListener('cocore-cart', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('cocore-cart', sync); window.removeEventListener('storage', sync); };
  }, []);
  const add = (piece, qty = 1) => {
    const cur = readCart();
    const found = cur.find(i => i.id === piece.id);
    let next;
    if (found) next = cur.map(i => i.id === piece.id ? { ...i, qty: i.qty + qty } : i);
    else next = [...cur, { id: piece.id, name: piece.name, material: piece.material, price: piece.price, qty }];
    writeCart(next);
  };
  const setQty = (id, delta) => {
    const next = readCart().map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0);
    writeCart(next);
  };
  const remove = (id) => writeCart(readCart().filter(i => i.id !== id));
  const clear = () => writeCart([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return { items, add, setQty, remove, clear, count, total };
}

Object.assign(window, { CATALOG, COLLECTIONS, CATEGORIES, getProduct, relatedTo, useCart });

// ---------- VIEWPORT ----------
function useViewport() {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return { w, isMobile: w <= 760, isTablet: w <= 1024 };
}
window.useViewport = useViewport;
