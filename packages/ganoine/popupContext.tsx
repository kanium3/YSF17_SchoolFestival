import React, { createContext, useContext, useState } from 'react'

type PopupContextType = {
  isOpen: boolean;
  toggleModal: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => setIsOpen(!isOpen)

  return(
    <PopupContext value={ isOpen, handleClick }>
      {children}
    </PopupContext>
  )
}

export const usePopupContext = () => {
  const context = useContext(ModalContext);
  if(!context) throw new Error('useModal must be used within a ModalProvider')
  return context
}
