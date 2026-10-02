import React, { useState, useEffect } from 'react';
import { 
  Flame, ShoppingBag, Search, MapPin, Phone, ChevronRight, 
  Plus, Minus, X, Check, Utensils, Truck, Star, 
  Navigation, User, LogOut, ArrowRight, KeyRound, AlertCircle,
  Map, Info
} from 'lucide-react';

const CATEGORIES = [
  { id: 'burgers', name: 'Gourmet Burgers', icon: '🍔' },
  { id: 'fries', name: 'Fries & Sides', icon: '🍟' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'wings', name: 'Signature Wings', icon: '🍗' }
];

const CITIES = [
  'Kathmandu',
  'Lalitpur',
  'Bhaktapur',
  'Pokhara',
  'Chitwan'
];

const SAUCES = [
  { id: 'timur-mayo', name: 'Timur Pepper Mayo', price: 40 },
  { id: 'dalle-sauce', name: 'Dalle Khursani Fire Dip', price: 50 },
  { id: 'garlic-mint', name: 'Garlic Mint Yogurt', price: 35 },
  { id: 'mustard-aioli', name: 'Kasundi Mustard Aioli', price: 40 }
];

const ADDONS = [
  { id: 'yak-cheese', name: 'Extra Aged Yak Cheese', price: 80 },
  { id: 'fried-egg', name: 'Sunny Side Up Egg', price: 45 },
  { id: 'double-patty', name: 'Double Patty', price: 180 },
  { id: 'smoked-buff', name: 'Smoked Buff Strips', price: 110 }
];

const MENU_ITEMS = [
  {
    id: 'b1',
    category: 'burgers',
    name: 'The Everest Yak Cheese Smash',
    description: 'Double juicy buff patty layered with authentic melt-in-mouth Langtang Yak Cheese & signature Timur Mayo.',
    price: 680,
    baseSpice: 'Mild',
    rating: 4.9,
    reviews: 142,
    popular: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    category: 'burgers',
    name: 'Dalle Khursani Fire Burger',
    description: 'Crispy chicken breast dusted in local spices, drenched in our signature Dalle Khursani extreme hot sauce.',
    price: 550,
    baseSpice: 'Extra Hot 🌶️🌶️',
    rating: 4.8,
    reviews: 98,
    popular: true,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    category: 'burgers',
    name: 'Himalayan Truffle Mushroom',
    description: 'Sautéed wild mushrooms, swiss cheese, truffle oil, and garlic aioli on a soft brioche bun.',
    price: 620,
    baseSpice: 'Mild',
    rating: 4.7,
    reviews: 85,
    popular: false,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f1',
    category: 'fries',
    name: 'Timur Spiced Fries',
    description: 'Fresh hand-cut potato crinkles tossed in wild Himalayan Timur pepper and roasted peri peri spice mix.',
    price: 240,
    baseSpice: 'Medium',
    rating: 4.8,
    reviews: 180,
    popular: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f2',
    category: 'fries',
    name: 'Loaded Yak Cheese Fries',
    description: 'Golden fries smothered in rich melted Yak cheese fondue, jalapeños, and fresh mountain chives.',
    price: 360,
    baseSpice: 'Mild',
    rating: 4.9,
    reviews: 115,
    popular: false,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's1',
    category: 'sandwiches',
    name: 'Kathmandu Club Sub',
    description: 'Triple decker smoked chicken, spiced buff strips, boiled farm egg, Yak cheddar, wild mustard mayo on toasted sourdough.',
    price: 520,
    baseSpice: 'Mild',
    rating: 4.8,
    reviews: 73,
    popular: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'w1',
    category: 'wings',
    name: 'Wild Honey & Timur Wings (8pcs)',
    description: 'Juicy jumbo wings flash-fried and tossed in raw Himalayan wild honey and crushed citrusy Timur peppercorns.',
    price: 560,
    baseSpice: 'Medium',
    rating: 5.0,
    reviews: 240,
    popular: true,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800'
  }
];

// Nepal Phone Validation (+977 98XXXXXXXX or 97XXXXXXXX)
const validateNepalPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const isNepalValid = /^(98|97)\d{8}$/.test(cleanPhone);
  return { isValid: isNepalValid, cleanPhone };
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewState, setViewState] = useState('menu'); // 'menu', 'checkout', 'confirmation'
  
  // Cart & Customization State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  
  // Modal Customization Options
  const [selectedSpice, setSelectedSpice] = useState('Medium');
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Auth Form Inputs
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Checkout Form State
  const [checkoutCity, setCheckoutCity] = useState(CITIES[0]);
  const [checkoutTole, setCheckoutTole] = useState('');
  const [checkoutLandmark, setCheckoutLandmark] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  // Mock Database for Users
  const [dbUsers, setDbUsers] = useState([
    { name: 'Suman Tamang', phone: '9841234567', pin: '1234' }
  ]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const { isValid, cleanPhone } = validateNepalPhone(authPhone);
    if (!isValid) {
      setAuthError('Enter a valid 10-digit Nepalese number starting with 98 or 97.');
      return;
    }
    if (authPin.length < 4) {
      setAuthError('PIN must be at least 4 digits.');
      return;
    }

    if (authTab === 'signup') {
      if (!authName.trim()) {
        setAuthError('Please enter your full name.');
        return;
      }
      if (dbUsers.some(u => u.phone === cleanPhone)) {
        setAuthError('Number already registered. Please sign in.');
        return;
      }
      const newUser = { name: authName, phone: cleanPhone, pin: authPin };
      setDbUsers([...dbUsers, newUser]);
      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
    } else {
      const user = dbUsers.find(u => u.phone === cleanPhone && u.pin === authPin);
      if (user) {
        setCurrentUser(user);
        setIsAuthModalOpen(false);
      } else {
        setAuthError('Invalid phone number or PIN.');
      }
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const openCustomizer = (item) => {
    setCustomizeItem(item);
    setSelectedSpice(item.baseSpice);
    setSelectedSauces([]);
    setSelectedAddons([]);
    setSpecialInstructions('');
  };

  const handleAddToCart = () => {
    if (!customizeItem) return;

    const extrasCost = [...selectedSauces, ...selectedAddons].reduce((sum, item) => sum + item.price, 0);
    const unitPrice = customizeItem.price + extrasCost;
    
    // Create unique ID based on selections so identical items stack, but different customizations don't
    const selectionKey = `${selectedSpice}-${selectedSauces.map(s=>s.id).sort().join(',')}-${selectedAddons.map(a=>a.id).sort().join(',')}-${specialInstructions}`;
    const cartId = `${customizeItem.id}-${selectionKey}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        cartId,
        id: customizeItem.id,
        name: customizeItem.name,
        image: customizeItem.image,
        unitPrice,
        quantity: 1,
        spice: selectedSpice,
        sauces: selectedSauces,
        addons: selectedAddons,
        instructions: specialInstructions
      }];
    });

    setCustomizeItem(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const deliveryFee = cartTotal > 0 ? 100 : 0; // Rs. 100 delivery fee
  const grandTotal = cartTotal + deliveryFee;

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    if (currentUser) {
      setCheckoutPhone(currentUser.phone);
      setCheckoutName(currentUser.name);
    }
    setIsCartOpen(false);
    setViewState('checkout');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCheckoutError('');

    const { isValid } = validateNepalPhone(checkoutPhone);
    if (!isValid) {
      setCheckoutError('Please provide a valid Nepal contact number for delivery.');
      return;
    }
    if (!checkoutTole.trim() || !checkoutLandmark.trim() || !checkoutName.trim()) {
      setCheckoutError('Please fill in all delivery address details completely.');
      return;
    }

    // Success - Move to confirmation
    setViewState('confirmation');
    window.scrollTo(0, 0);
  };

  const resetApp = () => {
    setCart([]);
    setViewState('menu');
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F0E13] text-gray-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 w-full"></div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#16141D]/90 backdrop-blur-md border-b border-amber-900/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div 
            onClick={() => setViewState('menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 p-0.5 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0F0E13] rounded-md flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 uppercase">
                  SITAL
                </span>
              </div>
              <p className="text-[10px] text-amber-200/60 font-medium tracking-wide">
                Gourmet Burgers • Nepal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Profile / Login */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#201C2B] border border-amber-900/50 rounded-xl px-3 py-1.5">
                <div className="hidden sm:block text-right">
                  <span className="block font-bold text-white text-xs">{currentUser.name}</span>
                  <span className="text-[10px] text-amber-400">+977 {currentUser.phone}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthError('');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 bg-[#201C2B] hover:bg-amber-500/10 text-amber-300 border border-amber-900/50 px-3 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In / Join</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold p-2.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 font-black text-xs px-2 py-0.5 rounded-full shadow">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW: MENU */}
        {viewState === 'menu' && (
          <>
            {/* Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden mb-10 border border-amber-900/30">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1200" 
                alt="Burgers Banner" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-20 p-8 sm:p-12 lg:w-2/3">
                <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm mb-4 inline-block">
                  Kathmandu's Finest
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
                  Taste the Himalayas in <br/>Every Bite.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-md">
                  Premium smashes featuring authentic local ingredients like aged Yak Cheese, spicy Dalle Khursani, and aromatic Timur.
                </p>
              </div>
            </div>

            {/* Menu Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                      activeCategory === cat.id
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-[#16141D] text-gray-400 border-amber-900/30 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#16141D] border border-amber-900/30 rounded-full pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className="bg-[#16141D] rounded-2xl border border-amber-900/30 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {item.popular && (
                        <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                          Top Seller
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-base leading-tight">{item.name}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-amber-900/20">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">Price</span>
                        <span className="text-lg font-black text-amber-400">Rs. {item.price}</span>
                      </div>
                      <button
                        onClick={() => openCustomizer(item)}
                        className="bg-red-600 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredItems.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 text-sm">
                  No items found matching your search.
                </div>
              )}
            </div>
          </>
        )}

        {}
        {viewState === 'checkout' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-[#16141D] rounded-2xl border border-amber-900/30 p-6">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-6 border-b border-amber-900/30 pb-4">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Manual Delivery Details
                </h2>

                {!currentUser && (
                  <div className="mb-6 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-amber-200 font-semibold mb-1">Want faster checkout?</p>
                      <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="text-xs text-amber-400 underline font-bold"
                      >
                        Sign in with your Nepal mobile number.
                      </button>
                    </div>
                  </div>
                )}

                {checkoutError && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-center gap-2 text-xs text-red-400 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    {checkoutError}
                  </div>
                )}

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input 
                        type="text" 
                        value={checkoutName}
                        onChange={e => setCheckoutName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full bg-[#0F0E13] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Nepal Mobile (+977) *</label>
                      <input 
                        type="tel" 
                        maxLength={10}
                        value={checkoutPhone}
                        onChange={e => setCheckoutPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98XXXXXXXX"
                        className="w-full bg-[#0F0E13] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">City *</label>
                    <select 
                      value={checkoutCity}
                      onChange={e => setCheckoutCity(e.target.value)}
                      className="w-full bg-[#0F0E13] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Tole / Street Name *</label>
                      <input 
                        type="text" 
                        value={checkoutTole}
                        onChange={e => setCheckoutTole(e.target.value)}
                        placeholder="e.g. Jhamsikhel, Thamel"
                        className="w-full bg-[#0F0E13] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Nearest Landmark *</label>
                      <input 
                        type="text" 
                        value={checkoutLandmark}
                        onChange={e => setCheckoutLandmark(e.target.value)}
                        placeholder="e.g. Near Bhatbhateni, Opp. St. Mary's"
                        className="w-full bg-[#0F0E13] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-[#16141D] rounded-2xl border border-amber-900/30 p-6">
                 <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Payment Method</h3>
                 <label className="flex items-center justify-between p-4 border border-amber-500 bg-amber-500/10 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-4 border-amber-500 flex items-center justify-center"></div>
                      <span className="text-sm font-bold text-amber-300">Cash on Delivery (NPR)</span>
                    </div>
                 </label>
                 <p className="text-[10px] text-gray-500 mt-2 text-center">Online payments via eSewa/Khalti coming soon.</p>
              </div>
            </div>

            {/* Checkout Summary Pane */}
            <div className="bg-[#16141D] rounded-2xl border border-amber-900/30 p-6 h-fit sticky top-24">
              <h3 className="text-lg font-black text-white mb-4 border-b border-amber-900/30 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-900/50">
                {cart.map(item => (
                  <div key={item.cartId} className="flex justify-between items-start text-xs border-b border-amber-900/20 pb-3">
                    <div className="flex-1 pr-2">
                      <span className="font-bold text-gray-200 block">{item.quantity}x {item.name}</span>
                      <span className="text-[10px] text-amber-500 font-medium block">Spice: {item.spice}</span>
                      {(item.sauces.length > 0 || item.addons.length > 0) && (
                        <span className="text-[10px] text-gray-500 block">
                          + {[...item.sauces, ...item.addons].map(x=>x.name).join(', ')}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-white">Rs. {item.unitPrice * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-amber-400 pt-4 border-t border-amber-900/30">
                  <span>Total</span>
                  <span>Rs. {grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3.5 rounded-xl text-sm uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Order</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setViewState('menu')}
                className="w-full mt-3 text-xs text-gray-500 font-bold uppercase hover:text-white transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {}
        {viewState === 'confirmation' && (
          <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-[#16141D] rounded-2xl border border-amber-900/30 p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-red-600 to-amber-500"></div>
              
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              
              <h2 className="text-3xl font-black text-white mb-2">Order Received!</h2>
              <p className="text-gray-400 text-sm mb-8">
                Thank you, {checkoutName}. We've started preparing your food.
              </p>

              <div className="bg-[#0F0E13] border border-amber-900/20 rounded-xl p-4 sm:p-6 text-left mb-8">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 border-b border-amber-900/20 pb-2">Delivery Details</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-gray-500 mb-1">Phone Number</span>
                    <span className="font-bold text-white">+977 {checkoutPhone}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Total Amount</span>
                    <span className="font-bold text-amber-400">Rs. {grandTotal} (Cash)</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-gray-500 mb-1">Delivery Address</span>
                    <span className="font-bold text-white block">{checkoutTole}, {checkoutCity}</span>
                    <span className="text-gray-400 block mt-0.5">Landmark: {checkoutLandmark}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetApp}
                className="bg-[#201C2B] hover:bg-amber-500 text-white hover:text-black font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Order More Food
              </button>
            </div>
          </div>
        )}

      </main>

      {}
      
      {/* 1. Food Customization Modal */}
      {customizeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16141D] border border-amber-900/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="relative h-48 bg-black shrink-0">
              <img 
                src={customizeItem.image} 
                alt={customizeItem.name} 
                className="w-full h-full object-cover opacity-70"
              />
              <button 
                onClick={() => setCustomizeItem(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="text-white font-black text-2xl drop-shadow-lg">{customizeItem.name}</h3>
                <p className="text-amber-400 font-bold text-sm">Base Price: Rs. {customizeItem.price}</p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm scrollbar-thin scrollbar-thumb-amber-900/50">
              
              {/* Spice Level */}
              <div>
                <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-3 text-xs flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500" /> Choose Heat Level
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {['Mild', 'Medium', 'Extra Hot 🌶️🌶️'].map(sp => (
                    <button
                      key={sp}
                      onClick={() => setSelectedSpice(sp)}
                      className={`py-2 px-1 rounded-xl font-bold text-xs transition-all border ${
                        selectedSpice === sp 
                          ? 'bg-red-600/20 text-red-400 border-red-500 shadow-inner' 
                          : 'bg-[#0F0E13] text-gray-500 border-amber-900/20 hover:border-amber-500/40'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sauces */}
              <div>
                <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-3 text-xs">Extra Dips & Sauces</h4>
                <div className="space-y-2">
                  {SAUCES.map(sauce => {
                    const isSelected = selectedSauces.some(s => s.id === sauce.id);
                    return (
                      <div 
                        key={sauce.id}
                        onClick={() => {
                          if (isSelected) setSelectedSauces(prev => prev.filter(s => s.id !== sauce.id));
                          else setSelectedSauces(prev => [...prev, sauce]);
                        }}
                        className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-[#0F0E13] border-amber-900/30 text-gray-400 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="font-semibold text-xs">{sauce.name}</span>
                        <span className="font-bold text-amber-500/70 text-xs">+Rs. {sauce.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-3 text-xs">Gourmet Add-ons</h4>
                <div className="space-y-2">
                  {ADDONS.map(addon => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div 
                        key={addon.id}
                        onClick={() => {
                          if (isSelected) setSelectedAddons(prev => prev.filter(a => a.id !== addon.id));
                          else setSelectedAddons(prev => [...prev, addon]);
                        }}
                        className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-[#0F0E13] border-amber-900/30 text-gray-400 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="font-semibold text-xs">{addon.name}</span>
                        <span className="font-bold text-amber-500/70 text-xs">+Rs. {addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-3 text-xs">Special Instructions</h4>
                <textarea 
                  placeholder="Any allergies or special requests?"
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  className="w-full bg-[#0F0E13] border border-amber-900/30 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                  rows={2}
                />
              </div>

            </div>

            <div className="p-4 sm:p-6 bg-[#16141D] border-t border-amber-900/30 flex items-center justify-between shrink-0">
              <div>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">Item Total</span>
                <span className="text-xl font-black text-amber-400">
                  Rs. {customizeItem.price + selectedSauces.reduce((a,b)=>a+b.price,0) + selectedAddons.reduce((a,b)=>a+b.price,0)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-red-600 hover:bg-red-500 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
              >
                <span>Add to Cart</span>
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#16141D] border-l border-amber-900/40 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            
            <div className="p-5 border-b border-amber-900/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h3 className="text-white font-black text-lg tracking-wider">Your Cart</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#0F0E13] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-amber-900/50">
              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#0F0E13] rounded-full flex items-center justify-center mb-4 border border-amber-900/30">
                    <ShoppingBag className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 font-medium">Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-xs text-amber-500 font-bold underline"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId} className="bg-[#0F0E13] p-4 rounded-xl border border-amber-900/20 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white text-sm leading-tight pr-2">{item.name}</h4>
                        <span className="font-black text-amber-400 text-sm shrink-0">Rs. {item.unitPrice * item.quantity}</span>
                      </div>
                      
                      <div className="text-[10px] text-gray-400 mb-3 space-y-0.5">
                        <p><span className="text-gray-500">Spice:</span> {item.spice}</p>
                        {item.sauces.length > 0 && <p><span className="text-gray-500">Sauces:</span> {item.sauces.map(s=>s.name).join(', ')}</p>}
                        {item.addons.length > 0 && <p><span className="text-gray-500">Add-ons:</span> {item.addons.map(a=>a.name).join(', ')}</p>}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-[#201C2B] rounded-lg p-1 border border-amber-900/30">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 text-gray-400 hover:text-white">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-white text-xs w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 text-gray-400 hover:text-white">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 bg-[#16141D] border-t border-amber-900/30 space-y-4 shrink-0">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-amber-900/20">
                  <span>Total <span className="text-[10px] font-normal text-gray-500 ml-1">(Excl. Delivery)</span></span>
                  <span className="text-amber-400">Rs. {cartTotal}</span>
                </div>
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 3. Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#16141D] border border-amber-900/40 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative">
            
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex border-b border-amber-900/30">
              <button
                onClick={() => { setAuthTab('signin'); setAuthError(''); }}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
                  authTab === 'signin' ? 'border-amber-500 text-amber-400 bg-[#0F0E13]' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthTab('signup'); setAuthError(''); }}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
                  authTab === 'signup' ? 'border-amber-500 text-amber-400 bg-[#0F0E13]' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-[#0F0E13]">
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                
                {authError && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex gap-2 text-xs text-red-400 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authTab === 'signup' && (
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ram Shrestha"
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      className="w-full bg-[#16141D] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Nepal Mobile (+977)</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pr-2 border-r border-amber-900/30 text-xs font-bold text-amber-500">
                      🇳🇵 +977
                    </div>
                    <input 
                      type="tel"
                      maxLength={10}
                      placeholder="98XXXXXXXX"
                      value={authPhone}
                      onChange={e => setAuthPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#16141D] border border-amber-900/30 rounded-xl pl-20 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">4-Digit PIN</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="password"
                      maxLength={4}
                      placeholder="••••"
                      value={authPin}
                      onChange={e => setAuthPin(e.target.value)}
                      className="w-full bg-[#16141D] border border-amber-900/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 text-center tracking-[0.5em]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-colors mt-2"
                >
                  {authTab === 'signin' ? 'Sign In Securely' : 'Create Account'}
                </button>
                
                {authTab === 'signin' && (
                  <p className="text-center text-[10px] text-gray-500 mt-4">
                    Demo Account: Phone <strong>9841234567</strong>, PIN <strong>1234</strong>
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}