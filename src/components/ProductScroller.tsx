import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export interface ScrollerItem {
  name: string
  image?: string
  price: string | number
  category: string
  linkTitle?: string
  badge?: string
}

interface ProductScrollerProps {
  title: string
  items: ScrollerItem[]
  isComingSoon?: boolean
}

export default function ProductScroller({ title, items, isComingSoon = false }: ProductScrollerProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-serif font-black text-center mb-16 text-[#E4002B] tracking-tight uppercase">
          {title}
        </h2>
        
        {/* Horizontal scroll container with snapping */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 hide-scrollbar">
          {items.map((item, index) => (
            <motion.div 
              key={`${title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-[280px] md:w-[340px] snap-center group"
            >
              {isComingSoon ? (
                <div className="opacity-75 cursor-default">
                  <div className="relative aspect-square border-4 border-neutral-100 rounded-sm mb-6 bg-neutral-50 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                      <span className="text-white font-black uppercase text-2xl tracking-[0.2em] border-2 border-white px-4 py-2">Soon</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center text-center">
                    <h3 className="text-xl font-black uppercase tracking-tight text-neutral-400">{item.name}</h3>
                    <div className="text-neutral-300 font-bold tracking-widest text-sm uppercase">Coming Soon</div>
                  </div>
                  <div className="mt-8">
                    <div className="w-full py-4 text-center text-xs font-black tracking-[0.2em] border-2 border-neutral-100 text-neutral-300 uppercase">
                      Notify Me
                    </div>
                  </div>
                </div>
              ) : (
                <Link to={`/menu/${item.category}`} className="block">
                  <div className="relative aspect-square border-4 border-neutral-100 rounded-sm mb-6 bg-neutral-50 overflow-hidden group-hover:border-[#E4002B] transition-colors">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {item.badge && (
                      <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-10 shadow-lg transform -rotate-3 z-10">
                        {item.badge} ★
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1 items-center text-center px-4">
                    <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 group-hover:text-[#E4002B] transition-colors">{item.name}</h3>
                    <div className="text-[#E4002B] font-black text-2xl mt-1 tracking-tighter shadow-sm inline-block px-2">
                       <span className="text-[10px] font-black mr-1 text-neutral-400 uppercase tracking-widest">From</span>
                       {item.price}.00
                    </div>
                  </div>

                  <div className="mt-8 px-4">
                    <div className="w-full py-4 text-center text-xs font-black tracking-[0.2em] border-4 border-black text-black group-hover:bg-[#E4002B] group-hover:text-white group-hover:border-[#E4002B] transition-all transform group-hover:translate-y-[-4px] shadow-sm uppercase">
                      Choose Options
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
