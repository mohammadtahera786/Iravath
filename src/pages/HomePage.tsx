import Hero from "../components/Hero"
import About from "../components/About"
import Menu from "../components/Menu"
import ProductScroller from "../components/ProductScroller"
import { menuDatabase } from "../data/menu"

export default function HomePage() {
  // 1. Best Sellers Data
  const bestSellersItems = [
    { ...menuDatabase["thickshakes"].items[0], category: "thickshakes", linkTitle: "Oreo Crunch Thickshake", badge: "Must Try" },
    { ...menuDatabase["icecreams"].items[0], category: "icecreams", linkTitle: "Double Ripple Ice Cream" },
    { ...menuDatabase["cold-coffees"].items[0], category: "cold-coffees", linkTitle: "Iced Frappe Coffee", badge: "Must Try" },
    { ...menuDatabase["goli-soda"].items[0], category: "goli-soda", linkTitle: "Classic Paneer Soda" },
    { ...menuDatabase["snacks"].items[0], category: "snacks", linkTitle: "Peri Peri Fries", badge: "Must Try" },
  ]

  // 2. New Arrivals Data
  const newArrivalsItems = [
    { ...menuDatabase["milkshakes"].items[1], category: "milkshakes", linkTitle: "Strawberry Vanilla Shake", badge: "New" },
    { ...menuDatabase["thickshakes"].items[1], category: "thickshakes", linkTitle: "KitKat Break Thickshake" },
    { ...menuDatabase["mojitos"].items[1], category: "mojitos", linkTitle: "Blue Lagoon Mojito", badge: "New" },
    { ...menuDatabase["sodas"].items[1], category: "sodas", linkTitle: "Blueberry Pop Soda" },
    { ...menuDatabase["lassi"].items[1], category: "lassi", linkTitle: "Sweet Mango Lassi", badge: "New" },
  ]

  // 3. Coming Soon Data
  const comingSoonItems = [
    { 
      name: "Matcha Madness Thickshake", 
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80", 
      price: "180", 
      category: "thickshakes" 
    },
    { 
      name: "Dragonfruit Goli Soda", 
      image: "https://images.unsplash.com/photo-1622597467836-e88350630ba8?w=800&q=80", 
      price: "90", 
      category: "goli-soda" 
    },
    { 
      name: "Truffle Cheese Fries", 
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80", 
      price: "200", 
      category: "snacks" 
    },
    { 
      name: "Korean BBQ Burger", 
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", 
      price: "250", 
      category: "snacks" 
    },
    { 
      name: "Lotus Biscoff Ice Cream", 
      image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=800&q=80", 
      price: "160", 
      category: "icecreams" 
    },
  ]

  return (
    <main>
      <Hero />
      <ProductScroller title="Our Best Sellers" items={bestSellersItems} />
      <ProductScroller title="New Arrivals" items={newArrivalsItems} />
      <About />
      <div className="bg-neutral-50 shadow-inner">
        <ProductScroller title="Coming Soon" items={comingSoonItems} isComingSoon={true} />
      </div>
      <Menu />
    </main>
  )
}
