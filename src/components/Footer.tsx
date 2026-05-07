import { Link } from "react-router-dom"
import { Globe, MessageSquare, MapPin, Phone, Mail } from "lucide-react"
import { menuDatabase } from "../data/menu"

export default function Footer() {
  const categories = Object.entries(menuDatabase).map(([id, cat]) => ({
    id,
    title: cat.title
  }))

  return (
    <footer id="contact" className="bg-white text-neutral-900 border-t-8 border-[#E4002B]">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-neutral-100 rounded-full overflow-hidden bg-white">
                <img src="/Iravathlogo.png" alt="Iravath Logo" className="w-full h-full object-cover scale-[1.7]" />
              </div>
              <span className="text-2xl font-serif font-black tracking-tight text-black uppercase">Iravath</span>
            </Link>
            <p className="text-neutral-600 font-bold leading-relaxed">
              Premium refreshments since 2026. Bringing you the boldest thickshakes, nostalgic goli sodas, and crispy snacks in a high-impact branded experience.
            </p>
            <div className="flex gap-4">

              <button type="button" className="w-10 h-10 rounded-full border-2 border-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-[#E4002B] hover:border-[#E4002B] hover:text-white transition-all cursor-pointer" title="English (IN)">
                <Globe className="w-5 h-5" />
              </button>
              <a href="sms:+917997222298" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-[#E4002B] hover:border-[#E4002B] hover:text-white transition-all" title="Messages">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Shopping */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-[#E4002B]">Shop Online</h4>
            <ul className="space-y-4 font-bold text-neutral-500">
              <li><Link to="/store" className="hover:text-black transition-colors">Everything</Link></li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/menu/${cat.id}`} className="hover:text-black transition-colors">{cat.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-[#E4002B]">Our Company</h4>
            <ul className="space-y-4 font-bold text-neutral-500">
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/menu" className="hover:text-black transition-colors">Explore Menu</Link></li>
              <li><Link to="/store" className="hover:text-black transition-colors">Store</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-[#E4002B]">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#E4002B] shrink-0" />
                <span className="text-neutral-600 font-bold">Main St, near Red roti, Banjara Basthi, Prem Nagar, Banjara Basthi, Hyderabad, Telangana 500114</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-[#E4002B] shrink-0" />
                <span className="text-neutral-600 font-bold">7997222298</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-[#E4002B] shrink-0" />
                <span className="text-neutral-600 font-bold">iravath.cafeteria@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-400 font-bold text-sm tracking-widest uppercase">
            © 2026 Iravath Refreshments. High Impact Branding.
          </p>
          <div className="flex gap-8 text-neutral-400 font-bold text-xs tracking-widest uppercase">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
