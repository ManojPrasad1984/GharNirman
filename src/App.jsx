import { useMemo, useState } from 'react';
import { Search, MapPin, Bell, Plus, ArrowUpRight, Star, Clock3, SlidersHorizontal, HardHat, Users, Package, CalendarDays, BriefcaseBusiness, ChevronDown, Check, Menu, X, MessageCircle, Bookmark, Hammer, Paintbrush, Zap, Droplets, LayoutDashboard, ClipboardList, Settings, CircleHelp, BadgeCheck, Sparkles } from 'lucide-react';

const providers = [
  { name: 'Ramesh Patil', trade: 'Mason crew', detail: 'Residential masonry · 8 years', price: '₹850 / day', rating: '4.9', reviews: 42, available: 'Available tomorrow', initials: 'RP', color: 'sage', verified: true, area: 'Manish Nagar' },
  { name: 'Shree Ganesh Electricals', trade: 'Electrician', detail: 'Wiring, fittings & repairs · 11 years', price: 'From ₹650 / day', rating: '4.8', reviews: 36, available: 'Available this week', initials: 'SG', color: 'peach', verified: true, area: 'Dharampeth' },
  { name: 'Aamir Khan', trade: 'Plumber', detail: 'Pipelines, bathrooms & water tanks · 6 years', price: '₹700 / day', rating: '4.7', reviews: 28, available: 'Available today', initials: 'AK', color: 'blue', verified: false, area: 'Sadar' },
  { name: 'Om Sai Tile Works', trade: 'Tile worker', detail: 'Flooring, walls & stonework · 9 years', price: 'Quote per project', rating: '4.9', reviews: 51, available: 'Available next week', initials: 'OS', color: 'lilac', verified: true, area: 'Pratap Nagar' },
];

const categories = [
  { label: 'Mason', icon: Hammer, count: '24 providers', color: 'sand' },
  { label: 'Electrician', icon: Zap, count: '18 providers', color: 'yellow' },
  { label: 'Plumber', icon: Droplets, count: '16 providers', color: 'sky' },
  { label: 'Painter', icon: Paintbrush, count: '12 providers', color: 'rose' },
  { label: 'More trades', icon: BriefcaseBusiness, count: 'View all', color: 'mint' },
];

const initialRequests = [
  { title: 'Mason crew for ground floor', category: 'Masonry', date: 'Starts 24 Nov', status: 'Finding people', statusTone: 'amber', count: 5 },
  { title: 'Electrical rough-in', category: 'Electrical', date: 'Starts 28 Nov', status: '2 offers', statusTone: 'green', count: 2 },
];

function App() {
  const [active, setActive] = useState('Discover');
  const [category, setCategory] = useState('All trades');
  const [query, setQuery] = useState('');
  const [showRequest, setShowRequest] = useState(false);
  const [toast, setToast] = useState('');
  const [requests, setRequests] = useState(initialRequests);
  const [saved, setSaved] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => providers.filter((p) => {
    const matchesCategory = category === 'All trades' || p.trade.toLowerCase().includes(category.toLowerCase());
    const text = `${p.name} ${p.trade} ${p.detail} ${p.area}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [category, query]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const toggleSaved = (name) => setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const nav = [{ label: 'Discover', icon: LayoutDashboard }, { label: 'My requests', icon: ClipboardList, badge: requests.length }, { label: 'Messages', icon: MessageCircle }, { label: 'My project', icon: HardHat }];

  function submitRequest(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setRequests((items) => [{ title: data.get('title') || 'New construction request', category: data.get('category') || 'General work', date: data.get('date') ? `Starts ${data.get('date')}` : 'Date flexible', status: 'Finding people', statusTone: 'amber', count: 0 }, ...items]);
    setShowRequest(false);
    setActive('My requests');
    notify('Your request is live for Nagpur providers');
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><span>G</span><i /></div><div><b>GharNirman</b><small>BUILDING TOGETHER</small></div><button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={19}/></button></div>
      <button className="project-switch"><span className="project-icon"><HardHat size={17}/></span><span className="project-copy"><b>My home project</b><small>Nagpur, Maharashtra</small></span><ChevronDown size={15}/></button>
      <div className="nav-caption">WORKSPACE</div>
      <nav>{nav.map(({ label, icon: Icon, badge }) => <button key={label} className={`nav-item ${active === label ? 'selected' : ''}`} onClick={() => { setActive(label); setMobileMenu(false); }}><Icon size={18}/><span>{label}</span>{badge && <em>{badge}</em>}</button>)}</nav>
      <div className="nav-caption explore-caption">FIND PEOPLE</div>
      <button className="nav-item" onClick={() => { setActive('Providers'); setMobileMenu(false); }}><Users size={18}/><span>Workers & crews</span></button>
      <button className="nav-item" onClick={() => { setActive('Suppliers'); setMobileMenu(false); }}><Package size={18}/><span>Materials & supplies</span></button>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Need a hand?</b><p>Our team can help you find the right people.</p><button onClick={() => notify('Support will be available soon')}>Get help <ArrowUpRight size={13}/></button></div><button className="nav-item muted" onClick={() => notify('Settings are coming soon')}><Settings size={18}/><span>Settings</span></button><div className="user-row"><div className="user-avatar">AM</div><div><b>Arjun Mehta</b><small>Homeowner</small></div><button aria-label="Account options"><ChevronDown size={15}/></button></div></div>
    </aside>

    {mobileMenu && <button className="scrim" onClick={() => setMobileMenu(false)} aria-label="Close navigation"/>}
    <main className="main-content">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={20}/></button><div className="crumb"><span>My home project</span><span className="crumb-slash">/</span><b>{active}</b></div></div><div className="top-actions"><button className="location-pill" onClick={() => notify('Showing providers in Nagpur')}><MapPin size={15}/><span>Nagpur</span><ChevronDown size={13}/></button><button className="icon-button notification" onClick={() => notify('You’re all caught up')} aria-label="Notifications"><Bell size={18}/><i/></button><div className="top-avatar">AM</div></div></header>
      {active === 'Discover' || active === 'Providers' ? <>
        <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"/>YOUR CONSTRUCTION HUB</div><h1>Build your home,<br/><span>with the right people.</span></h1><p className="welcome-copy">Find trusted local talent and services for every step of your build.</p><div className="hero-actions"><button className="primary-button" onClick={() => setShowRequest(true)}><Plus size={17}/> Post a requirement</button><button className="text-button" onClick={() => document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' })}>Explore providers <ArrowUpRight size={15}/></button></div></div><div className="hero-art" aria-hidden="true"><div className="sun-disc"/><div className="house-back"/><div className="house-main"><div className="roof"/><div className="house-body"><div className="window window-one"/><div className="window window-two"/><div className="door"/></div></div><div className="plant plant-one"><i/><i/><i/><b/></div><div className="plant plant-two"><i/><i/><i/><b/></div><div className="hero-ground"/><div className="floating-chip"><span className="chip-check"><Check size={12}/></span><span><b>Good people,</b><small>building good homes</small></span><span className="chip-spark"><Sparkles size={14}/></span></div></div></section>
        <section className="stats-row"><div className="stat-item"><span className="stat-symbol"><Users size={18}/></span><div><b>186</b><small>local providers</small></div></div><div className="stat-divider"/><div className="stat-item"><span className="stat-symbol green-symbol"><BadgeCheck size={18}/></span><div><b>124</b><small>community reviewed</small></div></div><div className="stat-divider"/><div className="stat-note"><span className="online-dot"/> Growing across Nagpur <span className="note-arrow">↗</span></div><div className="stats-scribble" aria-hidden="true">✳</div></section>
        <section className="category-section"><div className="section-heading"><div><div className="eyebrow tiny">START WITH WHAT YOU NEED</div><h2>Find the right hands</h2></div><button className="see-all" onClick={() => { setCategory('All trades'); setActive('Providers'); }}>All categories <ArrowUpRight size={14}/></button></div><div className="category-grid">{categories.map(({ label, icon: Icon, count, color }) => <button className="category-card" key={label} onClick={() => { setCategory(label === 'More trades' ? 'All trades' : label); setActive('Providers'); document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' }); }}><span className={`category-icon ${color}`}><Icon size={19}/></span><span className="category-label">{label}</span><small>{count}</small><ArrowUpRight className="category-arrow" size={14}/></button>)}</div></section>
        <section className="provider-section" id="providers"><div className="section-heading provider-heading"><div><div className="eyebrow tiny">GOOD PEOPLE NEAR YOU</div><h2>Available in Nagpur <span className="live-pill"><i/> LIVE</span></h2></div><button className="see-all" onClick={() => notify('You’re viewing all available providers')}>View all providers <ArrowUpRight size={14}/></button></div><div className="provider-toolbar"><div className="provider-tabs"><button className={category === 'All trades' ? 'tab-active' : ''} onClick={() => setCategory('All trades')}>For you</button><button className={category === 'Mason' ? 'tab-active' : ''} onClick={() => setCategory('Mason')}>Top rated</button><button onClick={() => setCategory('All trades')}>Available soon</button></div><div className="provider-tools"><label className="search-box"><Search size={16}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a trade or name" /></label><button className="filter-button" onClick={() => notify('Filters: trade, availability, and price')}><SlidersHorizontal size={15}/><span>Filters</span></button></div></div><div className="provider-list">{filtered.length ? filtered.slice(0, 3).map((person) => <ProviderCard key={person.name} person={person} saved={saved.includes(person.name)} onSave={() => toggleSaved(person.name)} onConnect={() => notify(`Connection request sent to ${person.name}`)}/>) : <div className="empty-state">No providers match that search yet. Try another trade or name.</div>}</div></section>
        <section className="bottom-banner"><span className="banner-icon"><Sparkles size={18}/></span><div><b>Have a skill to share?</b><p>Join the Nagpur community and find your next project.</p></div><button onClick={() => notify('Provider registration is coming soon')}>Join as a provider <ArrowUpRight size={14}/></button></section>
      </> : <WorkspacePage active={active} requests={requests} onNew={() => setShowRequest(true)} onToast={notify} />}
      <footer className="footer"><span>© 2026 GharNirman</span><span>Made for building homes, together <span className="footer-heart">♥</span></span><button onClick={() => notify('Help center is coming soon')}>Help & feedback</button></footer>
    </main>
    {showRequest && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowRequest(false); }}><form className="request-modal" onSubmit={submitRequest}><div className="modal-head"><div><div className="eyebrow tiny">NEW PROJECT REQUEST</div><h2>What do you need?</h2></div><button type="button" className="icon-button" onClick={() => setShowRequest(false)} aria-label="Close"><X size={18}/></button></div><p className="modal-intro">Tell local providers what you’re looking for. You can review offers before choosing anyone.</p><label className="field-label">What work needs to be done?<input name="title" required placeholder="e.g. Mason crew for foundation work" /></label><div className="field-grid"><label className="field-label">Type of work<select name="category"><option>Masonry</option><option>Electrical</option><option>Plumbing</option><option>Painting</option><option>Carpentry</option><option>Materials</option><option>Other</option></select></label><label className="field-label">When do you need it?<input name="date" type="date" /></label></div><label className="field-label">A few details<textarea name="details" rows="3" placeholder="Share the work scope, quantity, or anything providers should know."/></label><div className="modal-location"><MapPin size={15}/><span>Project location</span><b>Nagpur, Maharashtra</b></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowRequest(false)}>Cancel</button><button type="submit" className="primary-button">Post requirement <ArrowUpRight size={15}/></button></div></form></div>}
    {toast && <div className="toast"><Check size={15}/>{toast}</div>}
  </div>;
}

function ProviderCard({ person, saved, onSave, onConnect }) {
  return <article className="provider-card"><div className={`provider-avatar ${person.color}`}>{person.initials}<span className="avatar-status"/></div><div className="provider-info"><div className="provider-title-row"><h3>{person.name}</h3>{person.verified && <span className="verified"><BadgeCheck size={13}/> Checked</span>}</div><div className="provider-trade">{person.trade}<span>·</span>{person.area}, Nagpur</div><div className="provider-detail">{person.detail}</div><div className="provider-meta"><span className="rating"><Star size={13} fill="currentColor"/>{person.rating} <small>({person.reviews})</small></span><span className="meta-dot">·</span><span className="availability"><Clock3 size={13}/>{person.available}</span></div></div><div className="provider-right"><div className="provider-price">{person.price}</div><small>Indicative pricing</small><div className="card-actions"><button className="connect-button" onClick={onConnect}>Connect <ArrowUpRight size={14}/></button><button className={`save-button ${saved ? 'saved' : ''}`} aria-label={saved ? 'Remove saved provider' : 'Save provider'} onClick={onSave}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'}/></button></div></div></article>;
}

function WorkspacePage({ active, requests, onNew, onToast }) {
  const title = active === 'My requests' ? 'Your open requests' : active === 'Messages' ? 'Conversations' : active === 'My project' ? 'My home project' : active === 'Suppliers' ? 'Materials & supplies' : 'Workers & crews';
  return <section className="workspace-page"><div className="eyebrow"><span className="eyebrow-dot"/>GHARNIRMAN WORKSPACE</div><div className="workspace-title-row"><div><h1>{title}</h1><p>Keep your construction work moving, one step at a time.</p></div><button className="primary-button" onClick={onNew}><Plus size={17}/> Post a requirement</button></div>
    {active === 'My requests' ? <div className="workspace-card"><div className="workspace-card-head"><div><h2>Requests in progress</h2><p>Track responses and next steps from providers.</p></div><span className="count-pill">{requests.length} active</span></div>{requests.map((request, index) => <div className="request-row" key={`${request.title}-${index}`}><div className="request-icon"><ClipboardList size={18}/></div><div className="request-copy"><b>{request.title}</b><small>{request.category} <i>·</i> {request.date}</small></div><span className={`request-status ${request.statusTone}`}><i/>{request.status}</span><span className="offer-count">{request.count} offers</span><button className="row-arrow" onClick={() => onToast('Request details will open here')} aria-label="Open request"><ArrowUpRight size={16}/></button></div>)}<button className="add-request-row" onClick={onNew}><Plus size={15}/> Add another requirement</button></div> : active === 'Messages' ? <div className="empty-panel"><div className="empty-panel-icon"><MessageCircle size={24}/></div><h2>Your conversations will show up here</h2><p>Connect with a provider to discuss scope, timing, and pricing.</p><button className="secondary-button" onClick={() => onToast('Explore providers from the Discover page')}>Explore providers <ArrowUpRight size={14}/></button></div> : active === 'My project' ? <><div className="project-summary"><div className="project-summary-top"><div><span className="eyebrow tiny">HOME CONSTRUCTION</span><h2>Mehta Family Home</h2><p><MapPin size={14}/> Manish Nagar, Nagpur</p></div><button className="secondary-button" onClick={() => onToast('Project details are coming soon')}>Project details <ArrowUpRight size={14}/></button></div><div className="progress-row"><span>Project setup</span><b>Getting started</b><div className="progress-track"><i/></div><small>Next: Add your project details</small></div></div><div className="empty-panel small-empty"><div className="empty-panel-icon"><CalendarDays size={23}/></div><h2>Your build plan starts here</h2><p>Add project details to shape a timeline for your home construction.</p><button className="primary-button" onClick={() => onToast('Project setup will be available soon')}>Set up my project <ArrowUpRight size={14}/></button></div></> : <div className="empty-panel"><div className="empty-panel-icon">{active === 'Suppliers' ? <Package size={24}/> : <Users size={24}/>}</div><h2>{active === 'Suppliers' ? 'Find materials for your build' : 'Meet local construction providers'}</h2><p>{active === 'Suppliers' ? 'Explore suppliers for cement, steel, bricks, sand, and more around Nagpur.' : 'Browse skilled workers, crews, and contractors who are available in Nagpur.'}</p><button className="secondary-button" onClick={() => onToast('More listings are being added for Nagpur')}>Browse listings <ArrowUpRight size={14}/></button></div>}
  </section>;
}

export default App;
