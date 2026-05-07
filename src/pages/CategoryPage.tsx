import { useParams, Link, useNavigate } from "react-router-dom"
import { menuDatabase } from "../data/menu"
import type { MenuItem } from "../data/menu"
import { ArrowLeft, Image as ImageIcon, CheckCircle2, Heart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useState } from "react"

export default function CategoryPage() {
  const { categoryId } = useParams()
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const navigate = useNavigate()
  const [addedItems, setAddedItems] = useState<string[]>([])
  const data = categoryId ? menuDatabase[categoryId] : null

  const handleAddToCart = (item: MenuItem) => {
    if (!categoryId) return
    addItem({ ...item, categoryId })
    setAddedItems(prev => [...prev, item.id])
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== item.id))
    }, 2000)
  }

  if (!data) {

    return (
      <div className="min-h-screen pt-32 text-center bg-white">
        <h1 className="text-4xl font-black text-[#E4002B] uppercase tracking-tighter mb-4">Category Not Found</h1>
        <Link to="/" className="text-neutral-500 hover:text-[#E4002B] underline font-bold">Return Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b-8 border-[#E4002B] pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/" className="inline-flex items-center gap-2 text-[#E4002B] font-bold uppercase tracking-widest text-sm mb-8 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-neutral-900 uppercase tracking-tighter mb-4 leading-none">{data.title}</h1>
          <p className="text-xl text-neutral-600 font-bold max-w-2xl">{data.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-16">
        {data.items.length === 0 ? (
          <p className="text-neutral-500 italic text-lg">Delicious new items are coming to this category very soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.items.map((item) => {
              const isAdded = addedItems.includes(item.id)
              return (
                <div key={item.id} className="rounded-sm border-2 border-neutral-100 shadow-sm hover:shadow-xl transition-all bg-white flex flex-col h-full group overflow-hidden">
                  {item.image ? (
                    <div className="w-full h-64 overflow-hidden bg-neutral-100 border-b-2 border-neutral-100 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-[#E4002B] text-white font-black text-xl px-4 py-1 shadow-md transform rotate-3">
                        {item.price}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleItem({ ...item, categoryId: categoryId! }); if (!isInWishlist(item.id)) navigate('/wishlist') }}
                        className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                          isInWishlist(item.id) ? 'bg-[#E4002B] border-[#E4002B] text-white' : 'bg-white border-neutral-200 text-neutral-400 hover:border-[#E4002B] hover:text-[#E4002B]'
                        }`}
                        title={isInWishlist(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-neutral-50 flex items-center justify-center text-neutral-200 border-b-2 border-neutral-100">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h3 className="text-2xl font-black uppercase text-neutral-900 group-hover:text-[#E4002B] tracking-tight transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-neutral-600 font-medium flex-grow mb-6 leading-relaxed">{item.description}</p>
                    <div className="mt-auto pt-6 border-t-2 border-neutral-100">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className={`w-full py-4 border-2 border-black font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                          isAdded 
                            ? "bg-green-500 text-white border-green-500" 
                            : "bg-white text-black hover:bg-black hover:text-white"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" /> Added
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        )}
      </div>
    </div>
  )
}
