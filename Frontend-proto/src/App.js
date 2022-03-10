import React ,{Component} from 'react';
import {Route,Switch} from  'react-router-dom'
// import Map from "./components/map"
import Starter from "./components/starter"

import './App.css';
class App  extends Component {
  render() { 
    return (
      <main className="containers">
        <Switch>
          <Route exact path="/"   component={Starter}/>
          {/* <Route exact path="/maps" component={Map}/> */}
         
        </Switch>
      </main>
    );
    
  }
}
 
export default App ;