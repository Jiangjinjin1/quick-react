import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import Hello from './containers/Hello'
import World from './containers/World'

export default class Root extends React.Component<object, object> {
  render () {
    return (
      <Switch>
        <Route path='/hello' component={Hello} />
        <Route path='/world' component={World} />
      </Switch>
    )
  }
}