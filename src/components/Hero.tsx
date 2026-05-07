import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Subtle parallax
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[90vh] w-full overflow-hidden bg-white flex items-center pt-20">
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          style={{ y: textY, opacity }}
          className="text-center lg:text-left pt-12 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-sm bg-[#E4002B] text-white font-bold text-xs uppercase tracking-widest mb-6"
          >
            Freshly Scooped Happiness 🍦
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-neutral-900 tracking-tighter leading-none"
          >
            Taste the <span className="text-[#E4002B]">Joy</span> of Iravath
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl text-neutral-600 font-medium max-w-lg mx-auto lg:mx-0"
          >
            Premium ice creams, thickshakes, mojitios, and refreshing cold beverages made to brighten your day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link to="/menu" className="inline-flex items-center justify-center h-14 px-10 rounded-sm bg-[#E4002B] text-white font-black text-lg uppercase tracking-tighter shadow-xl shadow-red-900/20 hover:scale-105 transition-transform">
              Explore Menu
            </Link>
            <Link to="/store" className="inline-flex items-center justify-center h-14 px-10 rounded-sm bg-white text-[#E4002B] border-2 border-[#E4002B] font-black text-lg uppercase tracking-tighter hover:bg-neutral-50 transition-colors">
              Find a Store
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] lg:h-[600px] w-full"
        >
          {/* Decorative stripes behind image for KFC feel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] flex gap-4 rotate-12 opacity-5 pointer-events-none">
            <div className="w-12 h-full bg-[#E4002B]" />
            <div className="w-12 h-full bg-[#E4002B]" />
            <div className="w-12 h-full bg-[#E4002B]" />
            <div className="w-12 h-full bg-[#E4002B]" />
          </div>
          
          <img 
            src="/hero-refresh.png" 
            alt="Delicious Milkshake and Ice Cream" 
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  )
}
