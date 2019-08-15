import React from 'react'

import { Accordion, useActive } from '~/components/Accordion'
import { styled } from '~/theme'
import { CatEmoji, DogEmoji, Dog2Emoji, DolphinEmoji } from '~/components/Emoji'

const Window = styled.article`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  padding: 10px 30px;
  line-height: 1.5em;

  button {
    font-size: inherit;
  }

  span[role='img'] {
    margin-bottom: -6px;
  }
`

const Row = styled.section<{ selected: boolean }>`
  list-style: none;
  line-height: 2em;

  position: relative;
  background: white;
  transition: all 0.15s ease-in-out;
  display: block;

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

  > .inner {
    display: ${props => (props.selected ? 'inline-block' : 'none')};
    padding: ${props => (props.selected ? '0 10px 20px' : '0')};

    width: calc(100% - 40px);
    font-size: 11pt;
    color: rgba(0, 0, 0, 0.54);

    height: ${props => (props.selected ? 'auto' : 'inherit')};
  }

  > h4 {
    > span {
      display: ${props => (props.selected ? 'inline-block' : 'none')};
      margin-left: 0px;
    }

    padding-left: ${props => (props.selected ? '10px' : '30px')};

    &:before {
      margin-left: ${props => (props.selected ? '0' : '-10px')};
      transform: ${props => (props.selected ? 'rotate(90deg)' : 'none')};
      display: ${props => (props.selected ? 'none' : 'inline-block')};
    }
  }
`

const Panel: React.FC = ({ children }) => {
  const ref = React.useRef<HTMLLIElement>(null)
  const { isActive, setActive } = useActive(ref)

  return (
    <Row selected={isActive} ref={ref} onClick={() => setActive(ref.current!)}>
      {children}
    </Row>
  )
}

const PanelInner: React.FC = ({ children }) => {
  return <div className="inner">{children}</div>
}

const PanelHeader: React.FC = styled.h4`
  margin: 0;
  margin-top: 20px;
  padding: 0 5px;
  cursor: pointer;
  border-bottom: 1px solid gray;

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
        <Panel>
          <PanelHeader>{CatEmoji} Meow</PanelHeader>

          <PanelInner>
            <p>All kittehz all the tiem</p>
          </PanelInner>
        </Panel>

        <Panel>
          <PanelHeader>{DogEmoji} Woof</PanelHeader>

          <PanelInner>
            <p>Woof woof friend</p>

            <Accordion>
              <Panel>
                <PanelHeader>{Dog2Emoji} Bernese Mountain Dog</PanelHeader>
                <PanelInner>
                  <p>A friend indeed</p>
                </PanelInner>
              </Panel>

              <Panel>
                <PanelHeader>{Dog2Emoji} Golden Retriever</PanelHeader>
                <PanelInner>
                  <p>A True friend</p>
                </PanelInner>
              </Panel>
            </Accordion>
          </PanelInner>
        </Panel>

        <Panel>
          <PanelHeader>Squeak</PanelHeader>

          <PanelInner>
            <p>What goes squeek in the night</p>

            <Accordion>
              <Panel>
                <PanelHeader>{DolphinEmoji} Mouse</PanelHeader>{' '}
                <PanelInner>
                  <p>Little guys</p>
                </PanelInner>
              </Panel>

              <Panel>
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
