'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type UserContextType = {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(savedUser)
  }, [])

  const login = (username: string) => {
    localStorage.setItem('user', username)
    setUser(username)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
