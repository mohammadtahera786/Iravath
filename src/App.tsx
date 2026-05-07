import { Routes, Route, useLocation } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { WishlistProvider } from "./context/WishlistContext"
import Header from "./components/Header"

import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import HomePage from "./pages/HomePage"
import CategoryPage from "./pages/CategoryPage"
import StorePage from "./pages/StorePage"
import ContactPage from "./pages/ContactPage"
import StoryPage from "./pages/StoryPage"
import MenuPage from "./pages/MenuPage"
import CheckoutPage from "./pages/CheckoutPage"
import LoginPage from "./pages/LoginPage"
import WishlistPage from "./pages/WishlistPage"

function AppRoutes() {
  const location = useLocation()

  return (
    // key={location.pathname} forces full remount on every route change,
    // guaranteeing the page starts at the top (even for same-component navigation like category→category)
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<StoryPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:categoryId" element={<CategoryPage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#E4002B] selection:text-white relative">
          <ScrollToTop />
          {/* Floating WhatsApp Button */}
          <a href="https://wa.me/917997222298" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#128C7E] transition-all shadow-xl transform hover:scale-110" title="WhatsApp">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transform scale-110" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.764-5.766zm3.392 8.221c-.142.399-.715.762-1.092.822-.367.058-.71.074-1.147-.073-.255-.085-1.572-.612-2.688-1.595-1.115-.984-1.844-2.184-2.01-2.463-.166-.279.032-.454.17-.586.13-.124.279-.326.418-.489.14-.163.186-.279.279-.465.093-.186.047-.349-.023-.489-.07-.14-.627-1.512-.859-2.07-.226-.544-.455-.471-.627-.48-.166-.008-.356-.01-.547-.01-.191 0-.501.071-.763.357-.26.286-1 1-.1 1.707 0 1.413 1.026 2.783 1.17 2.977.144.194 2.019 3.084 4.889 4.327.682.296 1.214.473 1.63.606.69.219 1.317.189 1.81.116.551-.082 1.698-.694 1.938-1.363.24-.67.24-1.246.168-1.363-.071-.117-.265-.187-.554-.327zM22.05 12.048c0 5.053-4.12 9.15-9.15 9.15a9.15 9.15 0 01-4.306-1.077l-4.526 1.18 1.2-4.378a9.15 9.15 0 1116.782-4.875z" />
            </svg>
          </a>
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </WishlistProvider>
    </AuthProvider>
  )
}
