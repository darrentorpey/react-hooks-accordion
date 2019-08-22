import React from 'react'

import { Accordion, useAccordion } from '~/components/Accordion'
import { useEffectAfterMount } from '~/hooks/useEffectAfterMount'

const AccordionController: React.FC = ({ children }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { selected, setSelected } = useAccordion()

  const selectFirstPanel = React.useCallback(() => {
    const panels = ref.current!.querySelectorAll('section')

    // Challenge: why do we have to short-circuit when `selected` is truthy?
    if (selected || !panels.length) {
      return
    }

    const firstChild = panels[0] as HTMLElement

    setSelected(firstChild)
  }, [selected, setSelected])

  useEffectAfterMount(selectFirstPanel)

  return <div ref={ref}>{children}</div>
}

export const FancyAccordion: React.FC = ({ children }) => {
  return (
    <Accordion>
      <AccordionController>{children}</AccordionController>
    </Accordion>
  )
}
