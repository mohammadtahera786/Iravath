import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Phone, ArrowRight, ChevronLeft, Lock, MapPin, Home, Briefcase, Building, Navigation, Edit3 } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

type LoginStep = "details" | "address"

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("details")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Office'>('Home')
  const [inputMode, setInputMode] = useState<'detect' | 'manual'>('detect')
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // If redirected here from a protected action, we'll know where to go back
  const from = (location.state as { from?: string })?.from || "/store"

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && phone.length === 10) {
      setStep("address")
    } else {
      alert("Please provide a valid Name and 10-digit Phone Number.")
    }
  }

  const handleFinalLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (address) {
      login({ name, phone, address, addressType })
      // Navigate back to where the user came from (e.g. store or category page)
      navigate(from, { replace: true })
    } else {
      alert("Please enter a delivery address.")
    }
  }

  const detectLocation = () => {
    alert("Detecting location... (Simulation: 123, Iravath Street, Bangalore)")
    setAddress("123, Iravath Street, Bangalore, KA - 560001")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
    setName(value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setPhone(value)
  }

  return (
    <div className="pt-32 pb-24 bg-neutral-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-neutral-400 hover:text-[#E4002B] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Home
          </Link>
          <div className="flex gap-2">
            <div className={`h-1.5 w-8 rounded-full transition-colors ${step === 'details' ? 'bg-[#E4002B]' : 'bg-neutral-200'}`} />
            <div className={`h-1.5 w-8 rounded-full transition-colors ${step === 'address' ? 'bg-[#E4002B]' : 'bg-neutral-200'}`} />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0_0_rgba(0,0,0,1)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-3 bg-[#E4002B]" />
          
          <AnimatePresence mode="wait">
            {step === "details" ? (
              <motion.div
                key="details-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black shadow-[4px_4px_0_0_rgba(228,0,43,1)]">
                    <Lock className="w-8 h-8 text-[#E4002B]" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter italic">Join the <span className="text-[#E4002B]">Club</span></h1>
                  <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px] mt-2">Identify yourself to start ordering</p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 pl-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your name" 
                        className="w-full bg-neutral-50 border-4 border-neutral-100 p-4 pl-12 font-bold focus:border-black transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 pl-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="10-digit mobile number" 
                        className="w-full bg-neutral-50 border-4 border-neutral-100 p-4 pl-12 font-bold focus:border-black transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#E4002B] text-white py-4 font-black uppercase tracking-widest shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-none translate-y-[-4px] hover:translate-y-0 transition-all flex items-center justify-center gap-3 group"
                  >
                    Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="address-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black shadow-[4px_4px_0_0_rgba(228,0,43,1)]">
                    <MapPin className="w-8 h-8 text-[#E4002B]" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter italic">Delivery <span className="text-[#E4002B]">Details</span></h1>
                  <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px] mt-2">Where should we send the goodness?</p>
                </div>

                <div className="space-y-6">
                  {/* Address Input Tabs */}
                  <div className="flex border-2 border-black rounded p-1 bg-neutral-100">
                    <button
                      onClick={() => setInputMode('detect')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-black uppercase tracking-widest transition-all ${inputMode === 'detect' ? 'bg-white shadow border border-black' : 'text-neutral-500 hover:text-black'}`}
                    >
                      <Navigation className="w-4 h-4 bg-transparent" /> Detect
                    </button>
                    <button
                      onClick={() => setInputMode('manual')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-black uppercase tracking-widest transition-all ${inputMode === 'manual' ? 'bg-white shadow border border-black' : 'text-neutral-500 hover:text-black'}`}
                    >
                      <Edit3 className="w-4 h-4 bg-transparent" /> Manual
                    </button>
                  </div>

                  {inputMode === 'detect' ? (
                    <button 
                      onClick={detectLocation}
                      className="w-full flex items-center justify-center gap-3 p-6 bg-neutral-50 border-2 border-dashed border-neutral-300 text-neutral-500 font-bold text-sm hover:border-[#E4002B] hover:bg-red-50 hover:text-[#E4002B] transition-colors"
                    >
                      <Navigation className="w-6 h-6 animate-pulse" /> Tap to Detect Current Location
                    </button>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 pl-1">Full Delivery Address</label>
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House No, Building Name, Area, Landmark..." 
                        className="w-full bg-neutral-50 border-4 border-neutral-100 p-4 min-h-[120px] font-bold focus:border-black transition-all outline-none resize-none"
                      />
                    </div>
                  )}

                  {/* Address Type Quick Tags */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Home', icon: Home },
                      { id: 'Work', icon: Briefcase },
                      { id: 'Office', icon: Building }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setAddressType(type.id as 'Home' | 'Work' | 'Office')}
                        className={`flex flex-col items-center justify-center p-3 border-4 transition-all gap-1.5 ${
                          addressType === type.id 
                          ? 'border-black bg-black text-white' 
                          : 'border-neutral-100 bg-neutral-50 text-neutral-400 hover:border-black hover:text-black'
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">{type.id}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep("details")}
                      className="flex-shrink-0 w-14 border-4 border-neutral-100 flex items-center justify-center hover:border-black transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleFinalLogin()}
                      className="flex-grow bg-[#E4002B] text-white py-4 font-black uppercase tracking-widest shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-none translate-y-[-4px] hover:translate-y-0 transition-all flex items-center justify-center gap-3"
                    >
                      Complete & Order <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
