import React ,{Component} from 'react';
import {Route,Switch} from  'react-router-dom'
import Map from "./map"
import Starter from "./components/starter"
import slider from "./components/slider";

import './App.css';
class App  extends Component {
  render() { 
    return (
      <main className="containers">
        {/* <Switch>
          <Route exact path="/"   component={Starter}/>
          <Route exact path="/carousel" component={slider}/>
          <Route exact path="/map" component={Map}/>
        </Switch> */}
         <Map/>
      </main>
    );
    
  }
}
 
export default App ;