import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import Carousel from 'react-bootstrap/Carousel'
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
              pieceTilePagination={this.props.pieceTilePagination}
              updatedPieceTilePagination={this.props.updatedPieceTilePagination}
              getPiecesFor={this.props.getPiecesFor}
              getPiecesTiles={this.props.getPiecesTiles}
              piecesIsFetching={this.props.piecesIsFetching[type]}
              piecesIsFetched={this.props.piecesIsFetched[type]}
              armorType={type}
              armorTypeCapital={capitalType}
              getSkills={this.props.getSkills}
              skillsIsFetched={this.props.skillsIsFetched}
              skillsIsFetching={this.props.skillsIsFetching}
              getSetSkills={this.props.getSetSkills}
              setSkills={this.props.setSkills}
              setSkillsIsFetched={this.props.setSkillsIsFetched}
              setSkillsIsFetching={this.props.setSkillsIsFetching}
          />} 
          />
        )
      }
    )
    return armorPieces;
  }

  componentDidUpdate() {
    
  }

  render() {
    console.log("Loadout Render");
    console.log("Current Skills", this.state.skills);
    return (
      <div className="loadouts">
        <Container>
          <Row className="equippedDetails b-shadow-50">
            <Col sm={4}>
              <EquippedArmor 
                equippedArmor = {this.props.equippedArmor}
                updatedArmorName = {this.props.updatedArmorName}
                skills = {this.props.skills}
              />
            </Col>
            <EquippedInfo 
              equippedArmor = {this.props.equippedArmor}
              equippedInfo = {this.props.equippedInfo}
              getEquippedSkills = {this.props.getEquippedSkills}
            />
            <EquippedSkills 
              getEquippedSkills = {this.props.getEquippedSkills}
              updatedEquippedSkillTilesPagination = {this.props.updatedEquippedSkillTilesPagination}
              page = {this.props.equippedSkillTilesPagination}
            />
          </Row>
        </Container>
        <nav className="b-shadow-75 t-border b-tb-fade">
          <Container>
            <ul className="nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/HeadPieces" onClick={() => this.props.updatedPieceTilePagination(1)}>Head</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/ChestPieces" onClick={() => this.props.updatedPieceTilePagination(1)}>Chest</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/GlovesPieces" onClick={() => this.props.updatedPieceTilePagination(1)}>Gloves</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/WaistPieces" onClick={() => this.props.updatedPieceTilePagination(1)}>Waist</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/LegsPieces" onClick={() => this.props.updatedPieceTilePagination(1)}>Legs</NavLink>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => this.props.armorRank === "low" ? this.props.setArmorRank("") : this.props.setArmorRank("low")} className={`nav-link ${this.props.armorRank === "low" ? "active" : ""}`}>Low Rank</button>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => this.props.armorRank === "high" ? this.props.setArmorRank("") : this.props.setArmorRank("high")} className={`nav-link ${this.props.armorRank === "high" ? "active" : ""}`}>High Rank</button>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => this.props.armorRank === "master" ? this.props.setArmorRank("") : this.props.setArmorRank("master")} className={`nav-link ${this.props.armorRank === "master" ? "active" : ""}`}>Master Rank</button>
              </li>
              <li className="searchBar">
                <button title="Search by skills separated by spaces" onClick={() => this.props.toggleArmorSearch()} className={`searchToggle t-border ${this.props.searchBySkill === true ? "active" : ""}`}>Search by skill</button>
                <input placeholder="Search" aria-label="Search" type="text" value={this.props.armorSearchValue} onChange={this.props.searchArmorPieces} />
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
