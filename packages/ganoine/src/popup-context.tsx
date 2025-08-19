import { createContext, ReactNode, useContext, useState } from 'react'

type PopupContextType = {
  isOpen: boolean
  togglePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({ children }: { children: ReactNode }): ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => setIsOpen(!isOpen)

  return (
    <PopupContext value={{ isOpen, togglePopup: handleClick }}>
      {children}
    </PopupContext>
  )
}

export const usePopup: () => PopupContextType = () => {
  const context = useContext(PopupContext)
  if (!context) throw new Error('usePopup must be used within a PopupProvider')
  return context
}
