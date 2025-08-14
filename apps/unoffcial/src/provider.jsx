'use client'
import { RouterProvider } from '@latimeria/ganoine'
import { useHref, useNavigate } from 'react-router'

export function ClientProvider({ children }) {
  const navigate = useNavigate()
  return (
    <RouterProvider navigate={navigate} useHref={useHref}>
      {children}
    </RouterProvider>
  )
}
