import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from "./App";

ReactDOM.render(
  <App title="React with Webpack and Babel!" />,
  document.getElementById("app")
)

module.hot.accept()
