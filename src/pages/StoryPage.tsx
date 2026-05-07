import About from "../components/About"
import { motion } from "framer-motion"

export default function StoryPage() {
  return (
    <main className="pt-20">
      <section className="bg-white text-black py-20 relative overflow-hidden border-b-8 border-[#E4002B]">
        <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent scale-[2]" />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9]"
          >
            Freshly <br />
            <span className="text-[#E4002B]">Chilled.</span> <br />
            Daily.
          </motion.h1>
          <div className="h-4 w-48 bg-black mt-8" />
        </div>
      </section>
      <About />
    </main>
  )
}
