import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { IceCream, CupSoda, Coffee, Popcorn, Wine, Droplets, Citrus, GlassWater, FlameKindling, Candy } from "lucide-react"

const menuItems = [
  { name: "Thickshakes", slug: "thickshakes", icon: <CupSoda className="w-8 h-8 text-[#E4002B]" />, desc: "Rich & dense" },
  { name: "Milkshakes", slug: "milkshakes", icon: <Droplets className="w-8 h-8 text-[#E4002B]" />, desc: "Smooth classics" },
  { name: "Ice Creams", slug: "icecreams", icon: <IceCream className="w-8 h-8 text-[#E4002B]" />, desc: "Premium scoops" },
  { name: "Lassi", slug: "lassi", icon: <GlassWater className="w-8 h-8 text-[#E4002B]" />, desc: "Traditional twist" },
  { name: "Mojitos", slug: "mojitos", icon: <Citrus className="w-8 h-8 text-[#E4002B]" />, desc: "Minty & fresh" },
  { name: "Special Drinks", slug: "special-drinks", icon: <Wine className="w-8 h-8 text-[#E4002B]" />, desc: "Signature mix" },
  { name: "Goli Soda", slug: "goli-soda", icon: <FlameKindling className="w-8 h-8 text-[#E4002B]" />, desc: "Fizzy nostalgia" },
  { name: "Cold Coffees", slug: "cold-coffees", icon: <Coffee className="w-8 h-8 text-[#E4002B]" />, desc: "Caffeinated chill" },
  { name: "Snacks", slug: "snacks", icon: <Popcorn className="w-8 h-8 text-[#E4002B]" />, desc: "Salty cravings" },
  { name: "Sodas", slug: "sodas", icon: <Candy className="w-8 h-8 text-[#E4002B]" />, desc: "Bubbly treats" },
]

export default function Menu() {
  return (
    <section id="menu" className="py-24 bg-white text-neutral-900 border-t-8 border-[#E4002B]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Explore<br />
              <span className="text-[#E4002B]">Our Menu</span>
            </h2>
            <p className="text-neutral-500 font-bold text-lg">
              From creamy thickshakes to fizzy goli sodas. Hand-crafted with premium ingredients.
            </p>
          </div>
          <Link 
            to="/store" 
            className="group flex items-center gap-4 bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#E4002B] transition-colors shadow-[8px_8px_0_0_rgba(228,0,43,1)] hover:shadow-none translate-y-[-8px] hover:translate-y-0"
          >
            Shop All Catalog <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuItems.map((item, index) => (
            <Link to={`/menu/${item.slug}`} key={index} className="group overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative h-64 border-2 border-black bg-white rounded-sm group-hover:border-[#E4002B] transition-all"
              >
                <div className="absolute inset-4 border border-dashed border-neutral-100 group-hover:block hidden" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="p-4 bg-neutral-50 group-hover:bg-[#E4002B] group-hover:text-white transition-all rounded-full mb-4 shadow-sm border border-neutral-100 [&>svg]:group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="font-black uppercase text-xl tracking-tighter group-hover:text-[#E4002B] transition-all">{item.name}</h3>
                  <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mt-1">{item.desc}</p>
                </div>

                {/* Decorative slant overlay on hover */}
                <div className="absolute bottom-[-100%] left-0 w-full h-1/2 bg-[#E4002B]/5 group-hover:bottom-0 transition-all duration-300 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
