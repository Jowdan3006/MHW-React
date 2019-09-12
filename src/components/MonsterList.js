import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import MonsterFull from "./MonsterFull";
import Monster from "./Monster"

class MonsterList extends Component {
  state = {
    value: ''
  }

  getMonsterArray = () => {
    let i = 0;
    return (
      this.props.monsters.filter(monster => monster.type === "large" && monster.name.toLowerCase().includes(this.state.value))
        .map(monster =>
          <div className="col-3" key={i++}>
            <NavLink to={`/MonsterList/Monster/${monster.id}`}>
              <Monster monster={monster} />
            </NavLink>
          </div>
        )
    )
  }

  componentDidMount(){
    console.log("MonsterList Mount");
  }

  handleChange = this.handleChange.bind(this);
  handleChange(event) {
    this.setState({ value: event.target.value});
  }

  render () {
    console.log("MonsterList Render");
    return (
      <div className="container">
        <Route exact path="/MonsterList" render={
          () => {
            return (this.props.isFetching ? 
              <div>Fetching...</div> :
              <div className="monsterList">
                <form className="form-inline">
                  <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text" value={this.state.value} onChange={this.handleChange} />
                </form>
                <div className="row">
                  {this.getMonsterArray()}
                </div>
              </div>
            )
          }
        } />
        <Route path="/MonsterList/Monster/:id" render={
          (props) => {
            return (this.props.isFetching ? 
              <div>Fetching...</div> :
              <MonsterFull match={props.match} getMonsterDataById={this.props.getMonsterDataById} />
            )
          }
        } />
      </div>
    );
  }
}

export default MonsterList;
