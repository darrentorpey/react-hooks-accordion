import React from 'react'

import { useEffectAfterMount } from '~/hooks/useEffectAfterMount'

const SelectedContext = React.createContext<{
  selected: HTMLElement | null
  setSelected: (e: HTMLElement) => void
}>({
  selected: null,
  setSelected: () => {},
})

export const Accordion: React.FC = ({ children }) => {
  const [selected, setSelected] = React.useState<HTMLElement | null>(null)

  useEffectAfterMount(() => {
    const kids = myRef.current!.children

    // Challenge: why do we have to short-circuit when `selected` is truthy?
    if (selected || !kids.length) {
      return
    }

    const firstChild = kids[0] as HTMLElement

    setSelected(firstChild)
  }, [])

  const myRef = React.useRef<HTMLUListElement | null>(null)

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      <div ref={myRef}>{children}</div>
    </SelectedContext.Provider>
  )
}

export function useActive(ref: React.RefObject<HTMLElement>) {
  const { selected, setSelected } = React.useContext(SelectedContext)

  return {
    isActive: !!ref.current && ref.current === selected,
    setActive: setSelected,
  }
}
