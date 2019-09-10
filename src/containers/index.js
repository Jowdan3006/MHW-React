import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import MonsterList from "../components/MonsterList";
import Stuff from "../components/Stuff";
import Contact from "../components/Contact";

class Main extends Component {
  state = {
      monsters: []
  }

  componentDidMount(){
    fetch('https://mhw-db.com/monsters')
      .then(response => response.json())
      .then(responseData => this.setState({monsters: responseData}))
      .catch(error => console.log("Error while fetching data", error));
  }

  render() {
    console.log(this.state.monsters);
    return (
      <HashRouter>
        <header>
          <nav className="navbar navbar-expand-lg">
              <NavLink exact to="/" className="navbar-brand">MHW-React</NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item"><NavLink to="/stuff">Stuff</NavLink></li>
                  <li className="nav-item"><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div>
          </nav>
        </header>
          <div className="content">
            <Route exact path="/" render={() => <MonsterList data={this.state.monsters} />} />
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
      </HashRouter>
    );
  }
}

export default Main;
