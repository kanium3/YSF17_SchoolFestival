'use client'
import { RouterProvider } from '@latimeria/ganoine'
import { useRouter } from 'next/navigation'

export function ClientProvider({ children }) {
  const router = useRouter()
  return (
    <RouterProvider navigate={router.push}>
      {children}
    </RouterProvider>
  )
}
