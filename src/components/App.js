import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import HomePage from "./index"
class App extends React.Component {

  
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  }
}

export default App;