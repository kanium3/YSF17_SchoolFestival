'use client'
import { RouterProvider } from '@latimeria/ganoine'
import { useNavigate } from 'react-router'

export function ClientProvider({ children }) {
  const navigate = useNavigate()
  return (
    <RouterProvider navigate={navigate}>
      {children}
    </RouterProvider>
  )
}
