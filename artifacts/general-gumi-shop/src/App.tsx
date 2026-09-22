import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronRight, CircleUserRound, Filter, Minus, PackageCheck, Plus, Search, ShoppingBag, SlidersHorizontal, Truck, X, Wrench } from 'lucide-react';
import { PartnerBrands } from '@/components/PartnerBrands';

type Product = {
  id: number;
  image: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  tag?: string;
  description: string;
};

type CartLine = Product & { quantity: number };

const products: Product[] = [
  { id: 1, image: '/images/asset-26.jpg', brand: 'General Gumi', name: 'Kerékjavító gumiabroncs folt', category: 'Javítóanyagok', price: 1290, unit: 'db', tag: 'Újdonság', description: 'Megbízható, professzionális javítófolt személyautó és kisteher abroncsokhoz.' },
  { id: 2, image: '/images/asset-27.jpg', brand: 'General Gumi', name: 'Tubeless szelep, krómozott', category: 'Szelepek', price: 390, unit: 'db', description: 'Tartós, krómozott tubeless szelep a mindennapi műhelymunkához.' },
  { id: 3, image: '/images/asset-28.jpg', brand: 'TRUFLEX/PANG', name: 'TRUFLEX univerzális folt', category: 'Javítóanyagok', price: 850, unit: 'db', tag: 'Bestseller', description: 'Praktikus univerzális javítófolt hideg javításhoz, stabil tapadással.' },
  { id: 4, image: '/images/asset-29.jpg', brand: 'PANG', name: 'Pillanatragasztó gumihoz', category: 'Vegyi anyagok', price: 2190, unit: 'db', description: 'Gyors kötésű műhelyragasztó gumifelületek tartós javításához.' },
  { id: 5, image: '/images/asset-30.jpg', brand: 'Perfect Equipment', name: 'Centrírozó súly 5 g', category: 'Centrírozó súlyok', price: 5490, unit: 'doboz', description: 'Öntapadó centrírozó súly precíz kerékkiegyensúlyozáshoz.' },
  { id: 6, image: '/images/asset-31.jpg', brand: 'General Gumi', name: 'Gumiabroncs szerelőpaszta', category: 'Vegyi anyagok', price: 3890, unit: 'kg', description: 'Műhelyben jól kezelhető szerelőpaszta a gyorsabb és kíméletesebb munkához.' },
  { id: 7, image: '/images/asset-32.jpg', brand: 'PANG', name: 'Defektjavító tüske', category: 'Javítóanyagok', price: 2790, unit: 'csomag', description: 'Defektjavító tüskék tömlő nélküli abroncsok gyors javításához.' },
  { id: 8, image: '/images/asset-33.jpg', brand: 'Hofmann', name: 'Szelepbetét készlet', category: 'Szelepek', price: 1590, unit: 'készlet', description: 'Szelepbetétek és kupakok rendezett készletben, műhelyeknek.' },
];

const categories = [
  { name: 'Javítóanyagok', count: '195 termék', icon: '01' },
  { name: 'Szelepek', count: '24 termék', icon: '02' },
  { name: 'Centrírozó súlyok', count: '38 termék', icon: '03' },
  { name: 'Műhelyeszközök', count: '62 termék', icon: '04' },
];

const formatPrice = (value: number) => `${new Intl.NumberFormat('hu-HU').format(value)} Ft`;

function BrandMark() {
  return <div className="brand"><img className="brand-logo-image" src="/images/general-gumi-logo.png" alt="General Gumi – A járművek szakértője" /></div>;
}

function Header({ cartCount, onCart, onSearch }: { cartCount: number; onCart: () => void; onSearch: (value: string) => void }) {
  const [search, setSearch] = useState('');
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    onSearch(search);
    document.getElementById('termekek')?.scrollIntoView({ behavior: 'smooth' });
  };
  return <>
    <div className="top-strip"><div className="container top-strip-inner"><span>Magyarország egyik legnagyobb műhelyellátója</span><div className="top-links"><button type="button">Ügyfélszolgálat</button><button type="button">Szállítás és fizetés</button><button type="button">Belépés</button></div></div></div>
    <header className="main-header"><div className="container header-inner">
      <BrandMark />
      <div className="header-contact"><div><div className="contact-label">Kérdésed van?</div><div className="contact-value">+36 70 381 6087</div></div><div><div className="contact-label">Írj nekünk</div><div className="contact-value">generalgumi@generalgumi.hu</div></div></div>
      <div className="header-tools">
        <form className="search-form" onSubmit={submitSearch}><Search size={16} /><input data-testid="input-search" value={search} onChange={(event) => { setSearch(event.target.value); onSearch(event.target.value); }} placeholder="Keresés termékek között" /></form>
        <button className="icon-button" data-testid="button-account" type="button" aria-label="Fiókom"><CircleUserRound size={19} /></button>
        <button className="cart-button" data-testid="button-open-cart" type="button" onClick={onCart}><ShoppingBag size={17} /><span className="cart-label">Kosár</span><span className="cart-count">{cartCount}</span></button>
      </div>
    </div></header>
    <nav className="nav-bar"><div className="container nav-inner"><a className="nav-link" href="#termekek">Termékek</a><a className="nav-link" href="#kategoria">Kategóriák</a><a className="nav-link" href="#markak">Márkáink</a><a className="nav-link" href="#rolunk">Rólunk</a><a className="nav-link" href="#kapcsolat">Kapcsolat</a><span style={{ marginLeft:'auto' }} /><button className="icon-button mobile-menu" type="button" aria-label="Menü"><SlidersHorizontal size={18} /></button></div></nav>
  </>;
}

function ProductCard({ product, onAdd, onOpen }: { product: Product; onAdd: (product: Product) => void; onOpen: (product: Product) => void }) {
  return <article className="product-card" data-testid={`card-product-${product.id}`} onClick={() => onOpen(product)}>
    <div className="product-media"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button className="quick-add" type="button" data-testid={`button-add-product-${product.id}`} aria-label={`${product.name} kosárba`} onClick={(event) => { event.stopPropagation(); onAdd(product); }}><Plus size={18} /></button></div>
    <div className="product-info"><div className="product-brand">{product.brand}</div><h3 className="product-name">{product.name}</h3><div className="product-meta"><div><div className="product-price">{formatPrice(product.price)}</div><div className="product-unit">/ {product.unit}</div></div><div className="availability">Készleten</div></div></div>
  </article>;
}

function CartDrawer({ lines, onClose, onChange, onRemove, onCheckout }: { lines: CartLine[]; onClose: () => void; onChange: (id: number, delta: number) => void; onRemove: (id: number) => void; onCheckout: () => void }) {
  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  return <><div className="drawer-overlay" onClick={onClose} /><aside className="cart-drawer" aria-label="Kosár"><div className="drawer-head"><h2>A kosarad <span style={{ color:'var(--coral)' }}>({lines.length})</span></h2><button className="icon-button" type="button" data-testid="button-close-cart" onClick={onClose} aria-label="Kosár bezárása"><X size={18} /></button></div><div className="drawer-body">{lines.length === 0 ? <div className="cart-empty"><ShoppingBag size={34} /><h3>A kosár még üres</h3><p>Válassz a műhelyedhez szükséges termékekből.</p><button className="button button-primary" type="button" onClick={onClose}>Vásárlás folytatása</button></div> : lines.map((line) => <div className="cart-item" key={line.id}><img src={line.image} alt="" /><div><div className="cart-item-name">{line.name}</div><div className="cart-item-price">{formatPrice(line.price)}</div><div className="quantity"><button type="button" data-testid={`button-decrease-${line.id}`} onClick={() => onChange(line.id, -1)}><Minus size={13} /></button><span>{line.quantity}</span><button type="button" data-testid={`button-increase-${line.id}`} onClick={() => onChange(line.id, 1)}><Plus size={13} /></button></div></div><button className="remove-item" type="button" onClick={() => onRemove(line.id)} aria-label="Termék eltávolítása"><X size={15} /></button></div>)}</div>{lines.length > 0 && <div className="drawer-footer"><div className="subtotal"><span>Részösszeg</span><span>{formatPrice(total)}</span></div><div className="shipping-note">A szállítási díj a pénztárnál kerül kiszámításra.</div><button className="button button-primary full-width" type="button" onClick={onCheckout}>Tovább a pénztárhoz <ArrowRight size={16} /></button></div>}</aside></>;
}

function ProductDetail({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (product: Product) => void }) {
  return <div className="detail-overlay" onClick={onClose}><div className="detail-modal" onClick={(event) => event.stopPropagation()}><div className="detail-head"><button className="icon-button" type="button" data-testid="button-close-detail" onClick={onClose} aria-label="Bezárás"><X size={18} /></button></div><div className="detail-content"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><div className="product-brand">{product.brand}</div><h2>{product.name}</h2><p>{product.description}</p><div className="detail-price">{formatPrice(product.price)} <span style={{ fontFamily:'var(--font-body)', fontSize:12, fontWeight:400, color:'var(--ink-soft)' }}>/ {product.unit}</span></div><div className="availability" style={{ marginBottom:20 }}>Raktáron, azonnal rendelhető</div><button className="button button-primary" type="button" data-testid={`button-detail-add-${product.id}`} onClick={() => { onAdd(product); onClose(); }}>Kosárba teszem <ShoppingBag size={16} /></button></div></div></div></div>;
}

function App() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Összes termék');
  const [sort, setSort] = useState('Ajánlott');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState('');

  const filteredProducts = useMemo(() => {
    const term = query.toLocaleLowerCase('hu-HU');
    const result = products.filter((product) => (selectedCategory === 'Összes termék' || product.category === selectedCategory) && (!term || `${product.name} ${product.brand} ${product.category}`.toLocaleLowerCase('hu-HU').includes(term)));
    if (sort === 'Ár szerint növekvő') return [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Ár szerint csökkenő') return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [query, selectedCategory, sort]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      return existing ? current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} a kosárba került`);
    window.setTimeout(() => setToast(''), 2200);
  };
  const changeQuantity = (id: number, delta: number) => setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line).filter((line) => line.quantity > 0));
  const removeLine = (id: number) => setCart((current) => current.filter((line) => line.id !== id));
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return <div className="site-shell">
    <Header cartCount={cartCount} onCart={() => setCartOpen(true)} onSearch={setQuery} />
    <main>
      <section className="hero-wrap"><div className="container"><div className="hero"><div className="hero-copy"><div className="eyebrow">A műhelyed biztos pontja</div><h1>Alkatrész.<br /><em>Javítás.</em><br />Bizalom.</h1><p>Professzionális abroncsjavító anyagok és műhelyfelszerelések, több mint 20 év szakértelemmel.</p><div className="hero-actions"><a className="button button-primary" href="#termekek">Termékek böngészése <ArrowRight size={16} /></a><a className="button button-ghost" href="#rolunk">Miért General Gumi?</a></div></div><div className="hero-image"><img src="/images/asset-03.png" alt="General Gumi műhelytermékek" /><div className="hero-note">Minden, ami egy műhelyben szükséges</div></div></div></div></section>
      <section className="container"><div className="trust-row"><div className="trust-item"><Truck size={18} /><span>Gyors szállítás<br />raktárról</span></div><div className="trust-item"><Check size={18} /><span>Megbízható<br />minőség</span></div><div className="trust-item"><Wrench size={18} /><span>Műhelytapasztalat<br />2002 óta</span></div><div className="trust-item"><PackageCheck size={18} /><span>Szakértői<br />segítség</span></div></div></section>
      <section className="section container" id="kategoria"><div className="section-head"><div><div className="section-kicker">Találd meg gyorsan</div><h2>Mire van szükséged?</h2></div><p className="section-intro">A legfontosabb műhelytermékek logikus kategóriákba rendezve. Keresd ki, tedd a kosárba, dolgozz tovább.</p></div><div className="category-row">{categories.map((category, index) => <button type="button" key={category.name} className="category-card" onClick={() => { setSelectedCategory(category.name); document.getElementById('termekek')?.scrollIntoView({ behavior:'smooth' }); }}><div className="category-num">{category.icon}</div><div><h3>{category.name}</h3><p>{category.count}</p></div><ChevronRight size={17} style={{ alignSelf:'end' }} /></button>)}</div></section>
      <section className="section container" id="termekek"><div className="section-head"><div><div className="section-kicker">Webshop</div><h2>Ajánlott termékek</h2></div><p className="section-intro">A műhelyben bevált alapdarabok, kényelmesen elérhető áron.</p></div><div className="shop-layout"><aside className="filter-panel"><div className="filter-title"><span><Filter size={15} style={{ verticalAlign:'-2px', marginRight:7 }} /> Szűrés</span><button type="button" style={{ background:'none', border:0, color:'var(--coral)', fontSize:11 }} onClick={() => { setSelectedCategory('Összes termék'); setQuery(''); }}>Törlés</button></div><div className="filter-group"><h4>Kategória</h4><label className="check-row"><input type="radio" name="category" checked={selectedCategory === 'Összes termék'} onChange={() => setSelectedCategory('Összes termék')} /> Összes termék</label>{categories.map((category) => <label className="check-row" key={category.name}><input type="radio" name="category" checked={selectedCategory === category.name} onChange={() => setSelectedCategory(category.name)} /> {category.name}</label>)}</div><div className="filter-group"><h4>Elérhetőség</h4><label className="check-row"><input type="checkbox" defaultChecked /> Csak raktáron</label></div></aside><div><div className="results-bar"><div className="results-count"><strong>{filteredProducts.length}</strong> termék található {selectedCategory !== 'Összes termék' && `· ${selectedCategory}`}</div><div className="sort-wrap"><span>Rendezés:</span><select className="select" value={sort} onChange={(event) => setSort(event.target.value)} data-testid="select-sort"><option>Ajánlott</option><option>Ár szerint növekvő</option><option>Ár szerint csökkenő</option></select></div></div><div className="product-grid">{filteredProducts.length ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onOpen={setSelectedProduct} />) : <div className="empty-state"><h3>Nincs ilyen termék</h3><p>Próbálj másik keresést vagy töröld a szűrőket.</p><button className="button button-primary" type="button" onClick={() => { setSelectedCategory('Összes termék'); setQuery(''); }}>Szűrők törlése</button></div>}</div></div></div></section>
       <PartnerBrands title="Ismerős márkák. Műhelybiztos választás." subtitle="Olyan gyártókkal dolgozunk, akikben mi is megbízunk nap mint nap." />
      <section className="section container" id="rolunk"><div className="story"><div className="story-art"><img src="/images/asset-12.jpg" alt="" /><div className="story-art-copy"><div className="eyebrow" style={{ color:'var(--ink)' }}>A műhely mögött</div><h3>Nem csak<br />eladjuk.<br />Értünk is<br />hozzá.</h3></div></div><div className="story-copy"><div className="section-kicker">General Gumi / 2002 —</div><h2>Amikor számít,<br />hogy működjön.</h2><p>Mi nem egy általános webshop vagyunk. A General Gumi csapata évtizedek óta abroncsjavító szakembereknek segít: ismerjük az anyagokat, a gépeket és azt a tempót is, amiben egy műhely dolgozik.</p><div className="story-list"><div className="story-point"><strong>20+</strong><span>év szakmai tapasztalat</span></div><div className="story-point"><strong>1 nap</strong><span>átlagos szállítási idő</span></div></div></div></div></section>
    </main>
    <footer className="footer" id="kapcsolat"><div className="container"><div className="footer-grid"><div><BrandMark /><p style={{ marginTop:18 }}>A járművek szakértője. Műhelyanyagok és abroncsszerviz-kellékek egy helyen.</p></div><div><h4>Webshop</h4><div className="footer-links"><a href="#termekek">Termékek</a><a href="#kategoria">Kategóriák</a><a href="#markak">Márkáink</a><a href="#termekek">Akciók</a></div></div><div><h4>Segítség</h4><div className="footer-links"><a href="#kapcsolat">Szállítás és fizetés</a><a href="#kapcsolat">Elállási tájékoztató</a><a href="#kapcsolat">Adatkezelés</a><a href="#kapcsolat">Kapcsolat</a></div></div><div><h4>Elérhetőség</h4><div className="footer-links"><span>+36 70 381 6087</span><span>generalgumi@generalgumi.hu</span><span>H–P: 8:00–16:00</span></div></div></div><div className="copyright"><span>© 2024 General Gumi Kft. Minden jog fenntartva.</span><span>Made for people who keep things moving.</span></div></div></footer>
    {toast && <div className="toast-message"><Check size={15} /> {toast}</div>}
    {isCartOpen && <CartDrawer lines={cart} onClose={() => setCartOpen(false)} onChange={changeQuantity} onRemove={removeLine} onCheckout={() => setToast('A pénztár demó módban érhető el')} />}
    {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
  </div>;
}

export default App;
