import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import Header from "../components/Header";
import MonsterList from "../components/MonsterList";
import Loadouts from "../components/Loadouts/";
import Contact from "../components/Contact";

class Main extends Component {
  
  state = {
      monsters: [],
      isFetching: true
  }

  componentDidMount(){
    fetch('https://mhw-db.com/monsters')
      .then(response => response.json())
      .then(responseData => this.setState(({monsters: responseData, isFetching: false})))
      .catch(error => console.log("Error while fetching data", error));
    console.log("Main Mounted");
  }

  getMonsterDataById = (id) => {
    return (
      this.state.monsters.filter(monster => String(monster.id) === id)[0]
    );
  }

  render() {
    console.log("Main Render");
    return (
      <HashRouter>
        <Header />
        <div className="content">
          <Route path="/MonsterList" render={() => 
            <MonsterList 
              monsters={this.state.monsters} 
              isFetching={this.state.isFetching} 
              getMonsterDataById={this.getMonsterDataById}
            />} 
          />
          <Route path="/Loadouts" component={Loadouts}/>
          <Route path="/contact" component={Contact}/>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
