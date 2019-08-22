import React from 'react'

const SelectedContext = React.createContext<{
  selected: HTMLElement | null
  setSelected: (e: HTMLElement) => void
}>({
  selected: null,
  setSelected: () => {},
})

const OpenContext = React.createContext<{
  open: HTMLElement | null
  setOpen: (e: HTMLElement) => void
}>({
  open: null,
  setOpen: () => {},
})

export function useAccordion() {
  const { selected, setSelected } = React.useContext(SelectedContext)

  return {
    selected,
    setSelected,
  }
}

export const Accordion: React.FC = ({ children }) => {
  const [selected, setSelected] = React.useState<HTMLElement | null>(null)
  const [open, setOpen] = React.useState<HTMLElement | null>(null)

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      <SelectedContext.Provider value={{ selected, setSelected }}>
        {children}
      </SelectedContext.Provider>
    </OpenContext.Provider>
  )
}

export function useSelected(ref: React.RefObject<HTMLElement>) {
  const { selected, setSelected } = React.useContext(SelectedContext)

  return {
    isSelected: !!ref.current && ref.current === selected,
    setSelected,
  }
}

export function useOpen(ref: React.RefObject<HTMLElement>) {
  const { open, setOpen } = React.useContext(OpenContext)

  return {
    isOpen: !!ref.current && ref.current === open,
    setOpen,
  }
}

export function useAccordionPanel(
  ref: React.RefObject<HTMLElement>,
  delay: number,
) {
  const { isSelected, setSelected } = useSelected(ref)
  const { isOpen, setOpen } = useOpen(ref)

  React.useEffect(() => {
    if (!isOpen && isSelected) {
      setTimeout(() => {
        setOpen(ref.current!)
      }, delay)
    }
  }, [delay, ref, isOpen, isSelected, setOpen])

  return {
    selected: isSelected,
    setSelected,
    isOpen,
    setOpen,
  }
}
