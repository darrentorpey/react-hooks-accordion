import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import ReactDOM from 'react-dom'

import { client } from '~/client'

import { DemoApp } from '~/DemoApp'

import { theme } from '~/theme'

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <DemoApp />
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
