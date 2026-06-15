'use client'

import { createContext, useContext } from 'react'

interface ArcjetContextType {
  isProtected: boolean
}

const ArcjetContext = createContext<ArcjetContextType>({ isProtected: true })

export function ArcjetProvider({ children }: { children: React.ReactNode }) {
  return (
    <ArcjetContext.Provider value={{ isProtected: true }}>
      {children}
    </ArcjetContext.Provider>
  )
}

export const useArcjet = () => useContext(ArcjetContext)
