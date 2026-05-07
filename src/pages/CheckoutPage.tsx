import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, ShoppingBag, ArrowRight, ChevronLeft, CheckCircle2, MapPin, User, Phone } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"



export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const completeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])


  const paymentMethods = [
    { 
      id: 'phonepay', 
      name: 'PhonePe', 
      color: 'bg-white', 
      image: '/phonepe_icon.png' 
    },
    { 
      id: 'paytm', 
      name: 'Paytm', 
      color: 'bg-white', 
      image: '/paytm_icon.png' 
    },
    { 
      id: 'gpay', 
      name: 'Google Pay', 
      color: 'bg-white', 
      image: '/gpay_icon.png' 
    }
  ]




  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    // Scroll to complete button
    setTimeout(() => {
      completeButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const executePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method first.")
      return
    }

    if (selectedMethod === 'phonepay') {
      const upiUrl = `phonepe://pay?pa=iravath@ybl&pn=Iravath%20Refreshments&am=${totalPrice}&cu=INR`;
      window.location.assign(upiUrl);
      
      setTimeout(() => {
        if (document.hasFocus()) {
          alert("Opening PhonePe... If the app didn't open, please ensure it's installed on your mobile device.");
        }
      }, 1000);
    } else {
      alert(`Payment via ${selectedMethod} is currently being integrated.`);
    }
  }

  return (
    <div className="pt-32 pb-24 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/store" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-neutral-400 hover:text-[#E4002B] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Payment Methods */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
            >
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 border-l-8 border-[#E4002B] pl-6 flex items-center gap-3">
                Select <span className="text-[#E4002B]">Payment</span> <CreditCard className="w-8 h-8" />
              </h1>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMethodSelect(method.id)}
                    className={`w-full flex items-center justify-between p-6 border-4 transition-all group ${
                      selectedMethod === method.id 
                        ? 'border-[#E4002B] bg-red-50' 
                        : 'border-neutral-100 bg-neutral-50 hover:border-[#E4002B]'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 ${method.color} rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden border border-neutral-100`}>
                        <img 
                          src={method.image} 
                          alt={method.name} 
                          className={`object-contain transition-transform ${method.id === 'gpay' ? 'w-12 h-12 scale-150 relative z-10' : 'w-10 h-10'}`} 
                        />


                        {selectedMethod === method.id && method.id !== 'gpay' && (
                          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full border-2 border-white z-20">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="text-left">
                        <p className={`font-black uppercase tracking-widest text-lg ${selectedMethod === method.id ? 'text-[#E4002B]' : ''}`}>{method.name}</p>
                        <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mt-1">Pay with {method.name} Wallet/UPI</p>
                      </div>
                    </div>
                    <ArrowRight className={`w-6 h-6 transition-colors ${selectedMethod === method.id ? 'text-[#E4002B]' : 'text-neutral-300 group-hover:text-[#E4002B]'}`} />
                  </motion.button>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t-2 border-neutral-100">
                <button 
                  ref={completeButtonRef}
                  onClick={executePayment}
                  className={`w-full py-6 font-black uppercase tracking-[0.2em] text-lg transition-all ${
                    selectedMethod 
                      ? 'bg-[#E4002B] text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] translate-y-[-4px] hover:shadow-none hover:translate-y-0' 
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  {selectedMethod ? `Pay via ${paymentMethods.find(m => m.id === selectedMethod)?.name}` : 'Complete Transaction'}
                </button>
                
                <p className="text-center text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] mt-6">
                  Secured by 256-bit SSL encryption
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(228,0,43,1)] sticky top-32"
            >
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                Order <span className="text-[#E4002B]">Summary</span> <ShoppingBag className="w-6 h-6" />
              </h2>

              {/* Delivery Address Section */}
              {user && (
                <div className="mb-8 p-6 bg-neutral-50 border-4 border-black relative">
                   <div className="absolute -top-3 left-4 px-2 bg-black text-white text-[9px] font-black uppercase tracking-widest leading-none py-1">Delivery Details</div>
                   <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#E4002B] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Address ({user.addressType})</p>
                          <p className="font-bold text-sm leading-relaxed mt-0.5 line-clamp-3">{user.address}</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                           <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                           <p className="text-[10px] font-black uppercase tracking-tighter truncate">{user.name}</p>
                        </div>
                        <div className="flex items-center gap-2.5 overflow-hidden">
                           <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                           <p className="text-[10px] font-black uppercase tracking-tighter truncate">{user.phone}</p>
                        </div>
                     </div>
                   </div>
                </div>
              )}

              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                {items.length === 0 ? (
                  <p className="text-neutral-400 font-bold uppercase tracking-widest text-center py-10">Your cart is empty</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-neutral-100 border-2 border-neutral-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-black uppercase text-xs tracking-tight">{item.name}</h4>
                        <p className="text-[#E4002B] font-black text-sm mt-1">{item.price}</p>
                        <p className="text-neutral-400 text-[10px] font-bold uppercase mt-1">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 border-t-4 border-black pt-8">
                <div className="flex justify-between items-center text-neutral-400 font-bold uppercase tracking-widest text-xs">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400 font-bold uppercase tracking-widest text-xs">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-black">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-neutral-100">
                  <span className="text-xl font-black uppercase tracking-tighter">Total</span>
                  <span className="text-3xl font-black text-[#E4002B]">₹{totalPrice}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
