import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  resolvers: {},
})
