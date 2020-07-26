import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:8080/graphql', // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true"
  },
})

export const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink,
});
