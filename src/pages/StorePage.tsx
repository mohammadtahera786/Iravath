import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { menuDatabase } from '../data/menu'
import type { MenuItem } from '../data/menu'
import { Search, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all')
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const navigate = useNavigate()
  const [addedItems, setAddedItems] = useState<string[]>([])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleAddToCart = (item: MenuItem & { categoryId: string }) => {
    addItem({ ...item, categoryId: item.categoryId })
    setAddedItems(prev => [...prev, item.id])
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== item.id))
    }, 2000)
  }


  const categories = useMemo(() => {
    return Object.entries(menuDatabase).map(([id, category]) => ({
      id,
      title: category.title
    }))
  }, [])

  const filteredItems = useMemo(() => {
    const items: (MenuItem & { categoryId: string })[] = []
    
    if (activeCategory === 'all') {
      Object.entries(menuDatabase).forEach(([catId, cat]) => {
        cat.items.forEach(item => items.push({ ...item, categoryId: catId }))
      })
    } else {
      menuDatabase[activeCategory].items.forEach(item => items.push({ ...item, categoryId: activeCategory }))
    }

    if (searchTerm) {
      return items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return items
  }, [activeCategory, searchTerm])

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-[#E4002B] pt-32 pb-12 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">Iravath Store</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search for thickshakes, burgers, or sodas..." 
              className="w-full bg-white text-black py-5 pl-14 pr-6 rounded-none font-bold text-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Category Navigation (Sidebar on Desktop) */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-4 border-[#E4002B] pb-2">Categories</h2>
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
                <button 
                  onClick={() => { setActiveCategory('all'); scrollToTop() }}
                  className={`px-4 py-3 text-left font-bold uppercase text-sm tracking-widest border-2 transition-colors whitespace-nowrap ${
                    activeCategory === 'all' 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-neutral-600 border-neutral-100 hover:border-black'
                  }`}
                >
                  All Items
                </button>
                {categories.map((category) => (
                  <button 
                    key={category.id}
                    onClick={() => { setActiveCategory(category.id); scrollToTop() }}
                    className={`px-4 py-3 text-left font-bold uppercase text-sm tracking-widest border-2 transition-colors whitespace-nowrap ${
                      activeCategory === category.id 
                        ? 'bg-[#E4002B] text-white border-[#E4002B]' 
                        : 'bg-white text-neutral-600 border-neutral-100 hover:border-[#E4002B]'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="flex-grow">
            <div className="mb-10 flex justify-between items-end">
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                {activeCategory === 'all' ? 'Everything' : menuDatabase[activeCategory].title}
                <span className="ml-4 text-neutral-400 text-lg">({filteredItems.length})</span>
              </h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-2xl font-bold text-neutral-400">No items found matching your search. 🍦</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => {
                    const isAdded = addedItems.includes(item.id)
                    return (
                      <div key={`${item.id}-${index}`} className="border-2 border-neutral-100 p-4 rounded-sm hover:border-black transition-colors group relative bg-white flex flex-col">
                        <div className="aspect-square bg-neutral-50 overflow-hidden mb-4 border border-neutral-100 relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-white text-black font-black px-3 py-1 text-sm shadow-md border-2 border-black tracking-widest uppercase">
                            {item.price}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleItem({ ...item }); if (!isInWishlist(item.id)) navigate('/wishlist') }}
                            className={`absolute top-2 left-2 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                              isInWishlist(item.id) ? 'bg-[#E4002B] border-[#E4002B] text-white' : 'bg-white border-neutral-200 text-neutral-400 hover:border-[#E4002B] hover:text-[#E4002B]'
                            }`}
                            title={isInWishlist(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                        <Link to={`/menu/${item.categoryId}`} className="block group/link">
                          <h3 className="font-black uppercase text-lg group-hover/link:text-[#E4002B] tracking-tight">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-neutral-500 mt-2 line-clamp-2 font-medium flex-grow">{item.description}</p>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className={`w-full py-4 px-4 font-black uppercase text-xs tracking-widest transition-all mt-4 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[0_0_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 ${
                            isAdded 
                              ? 'bg-green-500 text-white border-green-600 shadow-[4px_4px_0_0_rgba(22,163,74,1)]' 
                              : 'bg-black text-white hover:bg-[#E4002B] hover:border-[#E4002B]'
                          }`}
                        >
                          {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
                        </button>
                      </div>
                    )
                  })}
              </div>

            )}
          </main>
        </div>
      </div>
    </div>
  )
}
