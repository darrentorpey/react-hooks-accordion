import React from 'react'

import { Accordion, useActive } from '~/components/Accordion'
import { styled } from '~/theme'

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

const CatEmoji = (
  <span role="img" aria-label="cat">
    🐱
  </span>
)

const DogEmoji = (
  <span role="img" aria-label="dog">
    🐶
  </span>
)

const Dog2Emoji = (
  <span role="img" aria-label="dog viewed from side">
    🐕
  </span>
)

const DolphinEmoji = (
  <span role="img" aria-label="dolphin">
    🐬
  </span>
)

const Row = styled.li<{ selected: boolean }>`
  list-style: none;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  line-height: 2em;

  > .inner {
    margin-left: 5px;
    display: ${props => (props.selected ? 'inline-block' : 'none')};
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

const Inner: React.FC = ({ children }) => {
  return <span className="inner">{children}</span>
}

export const DemoApp = () => {
  return (
    <Window>
      <Accordion>
        <Panel>
          <button>Meow</button>

          <Inner>{CatEmoji}</Inner>
        </Panel>

        <Panel>
          <button>Woof</button>

          <Inner>{DogEmoji}</Inner>

          <Inner>
            <Accordion>
              <Panel>
                <button>Bernese Mountain Dog</button> <Inner>{Dog2Emoji}</Inner>
              </Panel>

              <Panel>
                <button>Golden Retriever</button> <Inner>{Dog2Emoji}</Inner>
              </Panel>
            </Accordion>
          </Inner>
        </Panel>

        <Panel>
          <button>Squeak</button>

          <Inner>{DolphinEmoji}</Inner>
        </Panel>
      </Accordion>
    </Window>
  )
}
