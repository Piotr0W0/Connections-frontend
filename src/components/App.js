import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import HomePage from "./index"
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {

  
  render() {
    return <Router>
      <Switch>
        <div> 
          <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
          User Contacts
          </a>
        </nav>
        </div>

        <div>
        <Route exact path="/" component={HomePage}/>
        <Redirect to="/" />
        </div>
        </div>
      </Switch>
    </Router>
  }
}

export default App;