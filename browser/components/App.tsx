import * as React from "react"
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { client } from '../graphql/client'
import Upload from './Upload'
import View from './View'

import '../style.css'

export interface PageProps {
  title: string
}

export const App = (props: PageProps) => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <h1>
          {props.title}
        </h1>
        <Switch>
          <Route path="/watch/:id">
            <View />
          </Route>
          <Route path="/">
            <Upload />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}