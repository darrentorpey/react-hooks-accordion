import React from 'react'

import { useAccordionPanel } from '~/components/Accordion'
import { FancyAccordion as Accordion } from '~/components/FancyAccordion'
import { AccordionHeader } from '~/components/AccordionHeader'
import { Window } from '~/components/Window'
import { styled } from '~/theme'
import { CatEmoji, DogEmoji, Dog2Emoji, DolphinEmoji } from '~/components/Emoji'

function getHeight({ closingReal, height, open, selected }: RowProps) {
  if (open) {
    if (!selected) {
      // closing
      return closingReal ? 0 : height
    } else {
      // open
      return 'auto'
    }
  }

  if (selected) {
    // opening...
    return height
  } else {
    // closed
    return '0'
  }
}

interface RowProps {
  closingReal: boolean
  height: string
  open: boolean
  selected: boolean
}

const DynamicPanel = styled.section<RowProps>`
  list-style: none;
  line-height: 2em;

  position: relative;
  background: white;
  transition: all 0.15s ease-in-out;
  display: block;
  width: 400px;
  margin: auto;
  margin: ${props => (props.selected ? '10px auto' : 'auto')};

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    box-shadow: 0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12),
      0 2px 4px rgba(0, 0, 0, 0.24);
  }

  > .inner * {
    max-width: 360px;
  }

  > .inner {
    display: inline-block;

    padding: ${props => (props.selected || props.open ? '0 10px 20px' : '0')};
    height: ${props => getHeight(props)};

    overflow: hidden;

    transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  > h4 {
    padding-left: ${props => (props.selected ? '10px' : '30px')};

    &:before {
      margin-left: ${props => (props.selected ? '0' : '-10px')};
      transform: ${props => (props.selected ? 'rotate(90deg)' : 'none')};
      display: ${props => (props.selected ? 'none' : 'inline-block')};
    }

    > span {
      display: ${props => (props.selected ? 'inline-block' : 'none')};
      margin-left: 0px;
    }
  }
`

const Panel: React.FC<{ num: number }> = ({ children, num }) => {
  const ref = React.useRef<HTMLLIElement>(null)
  const [isClosingReal, setClosingReal] = React.useState(false)
  const { selected, setSelected, isOpen: open } = useAccordionPanel(ref, 300)
  // console.log(selected, open)

  React.useEffect(() => {
    if (!open && selected) {
      // console.log(`${num} opening...`)
    }

    if (open && selected) {
      // console.log(`${num} open now`)
    }

    if (open && !selected) {
      // console.log(`${num} closing...`)
      setTimeout(() => {
        setClosingReal(true)
      }, 0)
    }

    if (!open && !selected) {
      // console.log(`${num} closed`)
      setClosingReal(false)
    }
  }, [open, selected, num])

  const HEADER_HEIGHT = 36 - 6
  let height = '50px'
  if (ref.current && (selected || open)) {
    height = `${ref.current
      .querySelector('.inner-content')!
      .getBoundingClientRect().height + HEADER_HEIGHT}px`
    // console.log(`${num} height`, height)
  }

  return (
    <DynamicPanel
      height={height}
      selected={selected}
      closingReal={isClosingReal}
      open={open}
      ref={ref}
      onClick={() => setSelected(ref.current!)}
    >
      {children}
    </DynamicPanel>
  )
}

const PanelInner: React.FC = styled(({ children, className }) => {
  return (
    <div className={className + ' inner'}>
      <div className="inner-content">{children}</div>
    </div>
  )
})`
  font-size: 11pt;

  p {
    color: rgba(0, 0, 0, 0.54);
  }
`

const PanelHeader: React.FC = styled.h4`
  margin: 0;
  padding: 0 5px;
  cursor: pointer;
  border-bottom: 1px solid gray;
  min-height: 32px;

  &:before {
    position: absolute;
    display: block;
    content: '\\203a';
    font-size: 18pt;
    left: 20px;
    top: -2px;
    transition: transform 0.15s ease-in-out;
    color: rgba(0, 0, 0, 0.54);
  }
`

export const DemoApp = () => {
  return (
    <Window>
      <Accordion>
        <AccordionHeader>Pets & other animals</AccordionHeader>

        <Panel num={1}>
          <PanelHeader>{CatEmoji} Meow</PanelHeader>

          <PanelInner>
            <p>All kittehz all the tiem</p>
          </PanelInner>
        </Panel>

        <Panel num={2}>
          <PanelHeader>{DogEmoji} Woof</PanelHeader>

          <PanelInner>
            <p>Woof woof friend</p>

            <Accordion>
              <Panel num={11}>
                <PanelHeader>{Dog2Emoji} Bernese Mountain Dog</PanelHeader>
                <PanelInner>
                  <p>A friend indeed</p>
                </PanelInner>
              </Panel>

              <Panel num={12}>
                <PanelHeader>{Dog2Emoji} Golden Retriever</PanelHeader>
                <PanelInner>
                  <p>A True friend</p>
                </PanelInner>
              </Panel>
            </Accordion>
          </PanelInner>
        </Panel>

        <Panel num={3}>
          <PanelHeader>Squeak</PanelHeader>

          <PanelInner>
            <p>What goes squeek in the night</p>

            <Accordion>
              <Panel num={21}>
                <PanelHeader>{DolphinEmoji} Mouse</PanelHeader>{' '}
                <PanelInner>
                  <p>Little guys</p>
                </PanelInner>
              </Panel>

              <Panel num={22}>
                <PanelHeader>{DolphinEmoji} Dolphin</PanelHeader>{' '}
                <PanelInner>
                  <p>Sea mammals rule</p>
                </PanelInner>
              </Panel>
            </Accordion>
          </PanelInner>
        </Panel>
      </Accordion>
    </Window>
  )
}
