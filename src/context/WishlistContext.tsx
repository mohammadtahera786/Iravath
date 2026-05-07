import { createContext, useContext, useState, type ReactNode } from "react"
import type { MenuItem } from "../data/menu"

export type WishlistItem = MenuItem & { categoryId: string }

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem("iravath_wishlist")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const save = (newItems: WishlistItem[]) => {
    setItems(newItems)
    localStorage.setItem("iravath_wishlist", JSON.stringify(newItems))
  }

  const addItem = (item: WishlistItem) => {
    if (!items.find(i => i.id === item.id)) {
      save([...items, item])
    }
  }

  const removeItem = (id: string) => {
    save(items.filter(i => i.id !== id))
  }

  const toggleItem = (item: WishlistItem) => {
    if (items.find(i => i.id === item.id)) {
      removeItem(item.id)
    } else {
      addItem(item)
    }
  }

  const isInWishlist = (id: string) => items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isInWishlist, totalItems: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within WishlistProvider")
  return context
}
