import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-24 bg-white text-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Left Side: The Story */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
                Freshly<br />
                <span className="text-[#E4002B]">Chilled.</span><br />
                <span className="text-outline-black text-transparent">Daily.</span>
              </h2>
              <div className="h-2 w-32 bg-black mb-8" />
              <p className="text-xl font-bold leading-tight text-neutral-800 max-w-sm">
                From the fizz of a classic Goli Soda to the rich velvet of a Belgian Thickshake.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-neutral-500 font-medium max-w-md"
            >
              <p>
                At Iravath, we're not just serving drinks; we're serving memories. Our journey started with a simple goal: to blend the nostalgic flavors of traditional Indian refreshments with modern, premium cafeteria culture.
              </p>
              <p>
                Every ingredient is hand-picked, every shake is hand-blended, and every soda is served with that unmistakable "pop" of quality.
              </p>
            </motion.div>

            <div className="flex gap-8 pt-6">
              <div className="border-l-4 border-[#E4002B] pl-4">
                <p className="text-3xl font-black text-black">100%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#E4002B]">Real Dairy</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="text-3xl font-black text-black">50+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Unique Flavors</p>
              </div>
            </div>
          </div>

          {/* Right Side: The Visual Split - 2x2 Grid */}
          <div className="lg:col-span-7 relative pt-12 lg:pt-0">
            <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-2xl mx-auto">
              {/* 1. Ice Creams */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-sm overflow-hidden border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                <img src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80" alt="Double Ripple Ice Cream" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <span className="text-white font-black uppercase text-xs md:text-lg tracking-tighter">The Scoop (Ice Creams)</span>
                </div>
              </motion.div>

              {/* 2. Cold Coffee */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative aspect-square rounded-sm overflow-hidden border-4 border-black translate-y-4 md:translate-y-8 shadow-[4px_4px_0_0_rgba(228,0,43,1)]"
              >
                <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80" alt="Premium Iced Coffee" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E4002B]/90 to-transparent flex items-end p-4">
                  <span className="text-white font-black uppercase text-xs md:text-lg tracking-tighter">The Brew (Cold Coffee)</span>
                </div>
              </motion.div>

              {/* 3. Thickshakes */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative aspect-square rounded-sm overflow-hidden border-4 border-black -translate-y-4 md:-translate-y-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80" alt="Gourmet Oreo Thickshake" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <span className="text-white font-black uppercase text-xs md:text-lg tracking-tighter">The Velvet (Thickshakes)</span>
                </div>
              </motion.div>

              {/* 4. Lassi */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative aspect-square rounded-sm overflow-hidden border-4 border-black shadow-[4px_4px_0_0_rgba(228,0,43,1)]"
              >
                <img src="https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&q=80" alt="Traditional Yogurt Lassi" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E4002B]/90 to-transparent flex items-end p-4">
                  <span className="text-white font-black uppercase text-xs md:text-lg tracking-tighter">The Culture (Lassi)</span>
                </div>
              </motion.div>
            </div>

            {/* Floating 'Pop & Chill' Badge - Center Positioned */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 bg-black rounded-full flex items-center justify-center text-white border-4 border-white shadow-2xl z-20 pointer-events-none hidden md:flex"
            >
              <div className="text-center font-black animate-pulse uppercase">
                <p className="text-[8px] tracking-[0.2em] mb-1">Pop & Chill</p>
                <p className="text-xl leading-none">Since<br/>2026</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

