import React, { Component } from "react";
import { Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import MonsterFull from "./MonsterFull";
import Monster from "./Monster"

class MonsterList extends Component {

  getMonsterArray = () => {
    let i = 0;
    return (
      this.props.monsters.filter(monster => monster.type === "large" && monster.name.toLowerCase().includes(this.props.monsterSearchValue))
        .map(monster =>
          <Col xs={3} key={i++} className="t-border">
            <Monster monster={monster} />
          </Col>
        )
    )
  }

  componentDidMount(){
    this.props.getMonsters();
    console.log("MonsterList Mount");
  }

  render () {
    console.log("MonsterList Render");
    return (
      <div className="monsterList">
        <Route exact path="/MonsterList" render={
          () => {
            return (
              !this.props.monstersIsFetched ? 
              <Container>Fetching...</Container> :
              <Container className="b-shadow-50">
                <Form.Control inline placeholder="Search" aria-label="Search" type="text" value={this.props.monsterSearchValue} onChange={this.props.searchMonsters} />
                <Row>
                  {this.getMonsterArray()}
                </Row>
              </Container>
            )
          }
        } />
        <Route path="/MonsterList/Monster/:id" render={
          (props) => {
            return (
              !this.props.monstersIsFetched ? 
              <Container>Fetching...</Container> :
              <Container className="b-shadow-50">
                <MonsterFull match={props.match} getMonsterDataById={this.props.getMonsterDataById} />
              </Container>
            )
          }
        } />
      </div>
    );
  }
}

export default MonsterList;
