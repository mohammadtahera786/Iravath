import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ShoppingCart, Plus, Minus, Trash2, User, Settings, LogOut, Heart, MapPin, CornerUpLeft, Search } from "lucide-react"
import { menuDatabase } from "../data/menu"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useWishlist } from "../context/WishlistContext"


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const location = useLocation()
  const { items: cartItems, addItem, removeItem, clearCart, totalItems, totalPrice } = useCart()
  const { isLoggedIn, user, logout } = useAuth()
  const { toggleItem, isInWishlist, totalItems: wishlistCount } = useWishlist()


  const handleHomeClick = () => {
    setIsMobileMenuOpen(false)
    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Derive flat search results from menuDatabase
  const searchResults = searchQuery.trim() === '' ? [] : Object.entries(menuDatabase).flatMap(([catId, catData]) => 
    catData.items
      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(item => ({ ...item, categoryId: catId, categoryTitle: catData.title }))
  ).slice(0, 5) // limit to top 5 hits



  const isActive = (path: string, hash: string = '') => {
    if (hash) {
      return location.hash === hash;
    }
    return location.pathname === path && !location.hash;
  };

  const categories = Object.entries(menuDatabase).map(([id, cat]) => ({
    id,
    title: cat.title
  }))

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-neutral-100 shadow-sm"
    >
      {/* Top Banner */}
      <div className="bg-[#E4002B] text-white py-1.5 overflow-hidden">
        <div className="container mx-auto px-6 flex justify-end">
          <div className="flex items-center gap-4 text-[10px] font-serif uppercase tracking-widest">
            <span>FREE DELIVERY ON ORDERS ABOVE ₹500</span>
            <span>★</span>
            <span className="hidden md:inline">TRY OUR NEW BELGIAN THICKSHAKE</span>
            <span className="hidden md:inline">★</span>
            <span className="hidden md:inline">NOSTALGIC GOLI SODA RANGE AVAILABLE</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          to="/" 
          onClick={handleHomeClick}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-[#E4002B] rounded-full overflow-hidden shadow-lg shadow-red-900/10 bg-white">
            <img 
              src="/Iravathlogo.png" 
              alt="Iravath Logo" 
              className="w-full h-full object-cover scale-[1.7] transform duration-500 group-hover:scale-[1.85]" 
            />
          </div>
          <span className="text-xl md:text-2xl font-serif font-black tracking-tight text-[#E4002B] uppercase">Iravath</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center flex-wrap items-center gap-x-4 xl:gap-x-6 gap-y-2 px-4 text-[10px] xl:text-xs font-black uppercase tracking-widest text-neutral-600">
          <Link 
            to="/" 
            onClick={handleHomeClick} 
            className={`transition-colors shrink-0 ${isActive('/') ? 'text-[#E4002B]' : 'hover:text-[#E4002B]'}`}
          >
            Home
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              to={`/menu/${cat.id}`} 
              className={`transition-colors shrink-0 ${location.pathname === `/menu/${cat.id}` ? 'text-[#E4002B]' : 'hover:text-[#E4002B]'}`}
            >
              {cat.title}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-neutral-500 hover:text-[#E4002B] transition-colors p-2 -m-2"
            title="Search"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className={`relative flex items-center justify-center p-2 -m-2 transition-colors ${isActive('/wishlist') ? 'text-[#E4002B]' : 'text-neutral-500 hover:text-[#E4002B]'}`}
            title="Wishlist"
          >
            <Heart className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#E4002B] text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white translate-x-1 -translate-y-1">{wishlistCount}</span>
            )}
          </Link>

          {!isLoggedIn ? (
            <Link 
              to="/login" 
              className={`flex items-center justify-center p-2 -m-2 transition-colors ${isActive('/login') ? 'text-[#E4002B]' : 'text-neutral-500 hover:text-[#E4002B]'}`}
              title="Login / Signup"
            >
              <User className="w-6 h-6" />
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center justify-center p-2 -m-2 transition-colors ${isSettingsOpen ? 'text-black' : 'text-neutral-500 hover:text-[#E4002B]'}`}
                title="Account Settings"
              >
                <Settings className="w-6 h-6" />
              </button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(228,0,43,1)] z-50 flex flex-col overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b-2 border-neutral-100 bg-neutral-50">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 leading-none mb-1">Welcome back,</p>
                      <p className="text-sm font-black uppercase tracking-tight text-neutral-900 truncate">{user?.name}</p>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 text-left transition-colors group">
                        <CornerUpLeft className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-black transition-colors">Your Refunds</span>
                      </button>
                      <Link to="/wishlist" onClick={() => setIsSettingsOpen(false)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 text-left transition-colors group">
                        <Heart className="w-4 h-4 text-neutral-400 group-hover:text-[#E4002B] transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-black transition-colors">Your Wishlist</span>
                      </Link>
                      <Link to="/checkout" onClick={() => setIsSettingsOpen(false)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 text-left transition-colors group">
                        <MapPin className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-black transition-colors">Saved Address</span>
                      </Link>
                    </div>

                    <div className="border-t-2 border-neutral-100 p-2">
                      <button 
                        onClick={() => {
                          logout();
                          setIsSettingsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-neutral-50 hover:bg-[#E4002B] text-left transition-colors group border-2 border-transparent hover:border-black"
                      >
                        <LogOut className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#E4002B] group-hover:text-white transition-colors">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}





          {/* Cart Button + Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center justify-center p-2 -m-2 text-neutral-500 hover:text-[#E4002B] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#E4002B] text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white translate-x-1 -translate-y-1">{totalItems}</span>
              )}
            </button>

            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(228,0,43,1)] z-50 max-h-[70vh] flex flex-col"
                >
                  {/* Cart Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b-2 border-neutral-100">
                    <span className="text-sm font-black uppercase tracking-widest">Your Cart ({totalItems})</span>
                    <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-black transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  {cartItems.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShoppingCart className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                      <p className="text-neutral-400 font-bold text-sm">Your cart is empty</p>
                      <p className="text-neutral-300 text-xs mt-1">Add items from the store</p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-y-auto flex-grow divide-y divide-neutral-100">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-3 hover:bg-neutral-50 transition-colors">
                            <div className="w-16 h-16 bg-neutral-100 overflow-hidden border border-neutral-100 shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-black uppercase text-xs tracking-tight truncate">{item.name}</h4>
                                <button
                                  onClick={() => toggleItem({ ...item })}
                                  className={`shrink-0 w-6 h-6 flex items-center justify-center transition-colors ${
                                    isInWishlist(item.id) ? 'text-[#E4002B]' : 'text-neutral-300 hover:text-[#E4002B]'
                                  }`}
                                  title={isInWishlist(item.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                              <p className="text-[#E4002B] font-black text-sm">{item.price}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="w-6 h-6 border border-neutral-200 flex items-center justify-center hover:bg-[#E4002B] hover:text-white hover:border-[#E4002B] transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => addItem(item)}
                                  className="w-6 h-6 border border-neutral-200 flex items-center justify-center hover:bg-[#E4002B] hover:text-white hover:border-[#E4002B] transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Footer */}
                      <div className="border-t-2 border-black p-4 space-y-3 bg-neutral-50">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black uppercase tracking-widest text-neutral-500">Total</span>
                          <span className="text-xl font-black">₹{totalPrice}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={clearCart}
                            className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-neutral-200 text-neutral-500 text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Clear
                          </button>
                          <Link 
                            to="/checkout" 
                            onClick={() => setIsCartOpen(false)}
                            className="flex-grow py-2 bg-[#E4002B] text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none flex items-center justify-center"
                          >
                            Order Now
                          </Link>

                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-900 hover:text-[#E4002B] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-20 bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-6 text-3xl font-black uppercase tracking-tighter">
                <Link 
                  to="/" 
                  onClick={handleHomeClick} 
                  className={isActive('/') ? 'text-[#E4002B]' : 'hover:text-[#E4002B]'}
                >
                  Home
                </Link>
                {categories.map((cat) => (
                  <Link 
                    key={cat.id}
                    to={`/menu/${cat.id}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === `/menu/${cat.id}` ? 'text-[#E4002B]' : 'hover:text-[#E4002B]'}
                  >
                    {cat.title}
                  </Link>
                ))}
              </nav>

              <Link 
                to="/checkout" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-16 bg-[#E4002B] text-white font-black uppercase tracking-widest text-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] mt-8 flex items-center justify-center"
              >
                Order Now
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Width Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full bg-white z-[60] shadow-2xl py-6 pb-10 px-4 md:px-12 border-b border-neutral-100"
          >
            <div className="container mx-auto max-w-4xl relative">
              <div className="flex items-center gap-4 mt-8">
                <div className="relative flex-grow">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Search for thickshakes, ice creams, sodas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-2 border-black py-4 pl-16 pr-6 text-xl md:text-2xl font-black uppercase tracking-widest placeholder-neutral-300 focus:outline-none focus:border-[#E4002B] transition-colors"
                  />
                </div>
                <button 
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-2 text-neutral-400 hover:text-black transition-colors shrink-0"
                  title="Close Search"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Live Search Results */}
              {searchQuery.trim() !== '' && (
                <div className="mt-8">
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.map((result: any) => (
                        <Link 
                          key={result.id} 
                          to={`/menu/${result.categoryId}`}
                          onClick={() => {
                            setIsSearchOpen(false)
                            setSearchQuery('')
                          }}
                          className="flex items-center gap-4 p-4 border border-neutral-100 hover:border-black transition-colors"
                        >
                          {result.image ? (
                            <img src={result.image} alt={result.name} className="w-16 h-16 object-cover bg-neutral-50" />
                          ) : (
                            <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center">
                               <Search className="w-6 h-6 text-neutral-300" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black uppercase tracking-tight text-neutral-900 truncate">{result.name}</h4>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">{result.categoryTitle}</p>
                          </div>
                          <span className="font-black text-[#E4002B]">{result.price}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-neutral-400 font-bold text-lg py-8">No matching items found.</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  )
}
