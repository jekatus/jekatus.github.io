import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/pages/Home'
import './App.css'
import Navmenu from './Components/Navmenu/Navmenu'

// const style = {
// 	position: "relative",
// 	margin: "60px 0px 0px 60px auto",
// };

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navmenu />
        <center>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </center>
      </div>
    )
  }
}

export default App
