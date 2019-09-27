import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ArmorPieces from './ArmorPieces';
import EquippedArmor from './EquippedArmor';
import EquippedInfo from './EquippedInfo';
import EquippedSkills from './EquippedSkills';

class Loadouts extends Component {

  state = {
    types: ['head', 'chest', 'gloves', 'waist', 'legs']
  }

  componentDidMount() {
    console.log("Loadout Mounted");
  }

  getArmorPieces() {
    let armorPieces = [];
    this.state.types.forEach(
      (type, index) => {
        let capitalType = type.charAt(0).toUpperCase() + type.slice(1);
        armorPieces.push (
          <Route key={index} path={`${this.props.match.path}/${capitalType}Pieces`} render={() => 
            <ArmorPieces 
              getPiecesFor={this.props.getPiecesFor}
              getPiecesTiles={this.props.getPiecesTiles}
              piecesIsFetching={this.props.piecesIsFetching[type]}
              piecesIsFetched={this.props.piecesIsFetched[type]}
              armorType={type}
              armorTypeCapital={capitalType}
              getSkills={this.props.getSkills}
              skillsIsFetched={this.props.skillsIsFetched}
            />} 
          />
        )
      }
    )
    return armorPieces;
  }

  updatedArmorName(name) {
    if (name.includes("Alpha")) {
      name = name.substring(0, name.length - 5) + "α";
    } else if (name.includes("Beta")) {
      name = name.substring(0, name.length - 4) + "β";
    } else if (name.includes("Gamma")) {
      name = name.substring(0, name.length - 5) + "γ";
    };
    return name;
  }

  render() {
    console.log("Loadout Render");
    console.log("Current Skills", this.state.skills);
    return (
      <div className="loadouts">
        <Container>
          <Row classname="equippedDetails">
            <EquippedArmor 
              equippedArmor = {this.props.equippedArmor}
              updatedArmorName = {this.updatedArmorName}
              skills = {this.props.skills}
            />
            <EquippedInfo 
              equippedArmor = {this.props.equippedArmor}
              getEquippedSkills = {this.props.getEquippedSkills}
            />
            <EquippedSkills 
              getEquippedSkills = {this.props.getEquippedSkills}
            />
          </Row>
        </Container>
        <nav className="b-shadow-75 t-border b-tb-fade">
          <Container>
            <ul className="nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/HeadPieces">Head</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/ChestPieces">Chest</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/GlovesPieces">Gloves</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/WaistPieces">Waist</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/LegsPieces">Legs</NavLink>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => this.props.armorRank === "low" ? null : this.props.setArmorRank("low")} className={`nav-link ${this.props.armorRank === "low" ? "active" : ""}`}>Low Rank</button>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => this.props.armorRank === "high" ? null : this.props.setArmorRank("high")} className={`nav-link ${this.props.armorRank === "high" ? "active" : ""}`}>High Rank</button>
              </li>
              <li>
                <form>
                  <input placeholder="Search" aria-label="Search" type="text" value={this.props.armorSearchValue} onChange={this.props.searchArmorPieces} />
                </form>
              </li>
            </ul>
          </Container>
        </nav>
        <Container>
          {this.getArmorPieces()}
        </Container>
      </div>
    );
  }
}

export default Loadouts;
