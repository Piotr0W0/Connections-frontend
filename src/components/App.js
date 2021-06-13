import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import HomePage from "./index"
import DetailsPage from './details'

class App extends React.Component {

  
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/details" component={DetailsPage}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  }
}

export default App;