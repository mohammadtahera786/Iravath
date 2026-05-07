import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-[#E4002B] py-10 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 border-8 border-white rounded-full -translate-x-24 -translate-y-24" />
          <div className="absolute bottom-0 right-0 w-64 h-64 border-8 border-white rounded-full translate-x-32 translate-y-32" />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4"
          >
            Get In <span className="text-outline-white text-transparent">Touch.</span>
          </motion.h1>
          <p className="text-white font-bold text-lg md:text-xl uppercase tracking-widest opacity-90">
            WE'RE ALWAYS READY TO HEAR FROM YOU
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-l-8 border-[#E4002B] pl-6">
                Send Us a <span className="text-[#E4002B]">Message</span>
              </h2>
              <p className="text-neutral-500 font-bold mb-8">
                Have a question about our menu, franchise opportunities, or feedback? Drop us a line below and our team will get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-black">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    pattern="[A-Za-z\s]+"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
                      if (allowedKeys.includes(e.key)) return
                      if (!/^[A-Za-z\s]$/.test(e.key)) e.preventDefault()
                    }}
                    className="w-full px-6 py-4 bg-neutral-50 border-4 border-neutral-100 focus:border-[#E4002B] focus:outline-none transition-all font-normal"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-black">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-neutral-50 border-4 border-neutral-100 focus:border-[#E4002B] focus:outline-none transition-all font-normal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-black">Subject</label>
                <select className="w-full px-6 py-4 bg-neutral-50 border-4 border-neutral-100 focus:border-[#E4002B] focus:outline-none transition-all font-normal appearance-none">
                  <option>General Inquiry</option>
                  <option>Feedback / Suggestion</option>
                  <option>Franchise Opportunity</option>
                  <option>Bug Report</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-black">Your Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-6 py-4 bg-neutral-50 border-4 border-neutral-100 focus:border-[#E4002B] focus:outline-none transition-all font-normal resize-none"
                ></textarea>
              </div>

              <button className="flex items-center justify-center gap-3 w-full md:w-auto bg-black text-white px-10 py-5 font-black uppercase tracking-widest transition-all hover:bg-[#E4002B] shadow-[8px_8px_0_0_rgba(228,0,43,1)] hover:shadow-none translate-y-[-4px] hover:translate-y-0">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Right Side: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <MapPin className="w-10 h-10 text-[#E4002B] mb-6" />
                <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Location</h3>
                <p className="text-neutral-500 font-bold leading-relaxed">
                  Main St, near Red roti, Banjara Basthi,<br />
                  Prem Nagar, Banjara Basthi, Hyderabad,<br />
                  Telangana 500114
                </p>
              </div>

              <div className="p-8 border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(228,0,43,1)]">
                <Phone className="w-10 h-10 text-[#E4002B] mb-6" />
                <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Phone</h3>
                <p className="text-neutral-500 font-bold leading-relaxed">
                  7997222298
                </p>
              </div>

              <div className="p-8 border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(228,0,43,1)]">
                <Mail className="w-10 h-10 text-[#E4002B] mb-6" />
                <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Email</h3>
                <p className="text-neutral-500 font-bold leading-relaxed break-all">
                  iravath.cafeteria@gmail.com
                </p>
              </div>

              <div className="p-8 border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <Clock className="w-10 h-10 text-[#E4002B] mb-6" />
                <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Hours</h3>
                <p className="text-neutral-500 font-bold leading-relaxed text-sm">
                  Mon - Sat: 10AM - 10PM<br />
                  Sun: 12PM - 10PM
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-video border-4 border-black overflow-hidden group">
              <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-black/60">
                <div className="space-y-4">
                  <p className="text-white font-black text-2xl uppercase tracking-tighter">View Store On Google Maps</p>
                  <button className="bg-white text-black px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-[#E4002B] hover:text-white transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
