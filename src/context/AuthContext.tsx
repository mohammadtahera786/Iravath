import React, { createContext, useContext, useState } from "react"

export type UserData = {
  name: string
  phone: string
  address?: string
  addressType?: 'Home' | 'Work' | 'Office'
}

interface AuthContextType {
  user: UserData | null
  isLoggedIn: boolean
  login: (userData: UserData) => void
  logout: () => void
  updateAddress: (address: string, type: 'Home' | 'Work' | 'Office') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("iravath_user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("iravath_user") !== null
  })

  const login = (userData: UserData) => {

    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("iravath_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("iravath_user")
  }

  const updateAddress = (address: string, type: 'Home' | 'Work' | 'Office') => {
    if (user) {
      const updatedUser = { ...user, address, addressType: type }
      setUser(updatedUser)
      localStorage.setItem("iravath_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateAddress }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
