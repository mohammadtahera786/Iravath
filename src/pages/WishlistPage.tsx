import { motion } from "framer-motion"
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"

export default function WishlistPage() {
  const { items, removeItem, totalItems } = useWishlist()
  const { addItem } = useCart()

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            to="/store"
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-neutral-400 hover:text-[#E4002B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>

        <div className="flex items-end gap-4 mb-10">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Your <span className="text-[#E4002B]">Wishlist</span>
          </h1>
          <span className="text-2xl font-black text-neutral-300 mb-2">({totalItems})</span>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6 border-4 border-neutral-200">
              <Heart className="w-12 h-12 text-neutral-300" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-400 mb-2">Nothing saved yet</h2>
            <p className="text-neutral-400 font-bold text-sm mb-8">Browse our menu and tap the heart on items you love.</p>
            <Link
              to="/store"
              className="bg-[#E4002B] text-white px-8 py-4 font-black uppercase tracking-widest text-sm shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
            >
              Browse Store →
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border-2 border-neutral-100 hover:border-black transition-colors group flex flex-col relative"
              >
                {/* Remove from wishlist */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center text-[#E4002B] hover:bg-[#E4002B] hover:text-white hover:border-[#E4002B] transition-all shadow-sm"
                  title="Remove from wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                <div className="aspect-square overflow-hidden bg-neutral-50 border-b border-neutral-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <Link to={`/menu/${item.categoryId}`} className="block">
                    <h3 className="font-black uppercase text-lg tracking-tight group-hover:text-[#E4002B] transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-neutral-500 mt-1 line-clamp-2 font-medium flex-grow">{item.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                    <span className="text-[#E4002B] font-black text-xl">{item.price}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-[#E4002B] transition-colors border-2 border-black shadow-[3px_3px_0_0_rgba(228,0,43,1)] hover:shadow-none"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-10 flex justify-end">
            <Link
              to="/store"
              className="flex items-center gap-2 px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm shadow-[6px_6px_0_0_rgba(228,0,43,1)] hover:bg-[#E4002B] hover:shadow-none transition-all"
            >
              <ShoppingCart className="w-5 h-5" /> Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
