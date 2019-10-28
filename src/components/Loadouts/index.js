import React, { Component } from "react";
import {
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ArmorPieces from './ArmorPieces';
import EquippedArmor from './EquippedArmor';
import EquippedInfo from './EquippedInfo';
import EquippedSkills from './EquippedSkills';

const Loadouts = (props) => {

  const fetchProcess = (type) => {
    if (!props.piecesIsFetching[type] && !props.piecesIsFetched[type]) {
      props.getPiecesFor(type);
    }
  
    if (props.piecesIsFetched[type] && !props.skillsIsFetching && !props.skillsIsFetched) {
      props.getSkills();
    }
  
    if (props.piecesIsFetched[type] && props.skillsIsFetched && !props.setSkillsIsFetching && !props.setSkillsIsFetched) {
      props.getSetSkills();
    }
  
    if (props.piecesIsFetched[type] && props.skillsIsFetched && props.setSkillsIsFetched && !props.preCalculatePieceInformationIsDone[type] && !props.preCalculatePieceInformationInProgress[type]) {
      props.preCalculatePieceInformation(type);
    }
  }
  let armorPieces = [];
  props.types.forEach(
    (type, index) => {
      let capitalType = type.charAt(0).toUpperCase() + type.slice(1);
      armorPieces.push (
        <Route key={index} path={`${props.match.path}/${capitalType}Pieces`}>
          <ArmorPieces
            preCalculatePieceInformationInProgress={props.preCalculatePieceInformationInProgress[type]}
            preCalculatePieceInformationIsDone={props.preCalculatePieceInformationIsDone[type]}
            // preCalculatePieceInformation={() => props.preCalculatePieceInformation(type)}
            fetchProcess={() => fetchProcess(type)}
            pieceTilePagination={props.pieceTilePagination}
            updatedPieceTilePagination={props.updatedPieceTilePagination}

            // getPiecesFor={props.getPiecesFor}
            getPiecesTiles={props.getPiecesTiles}
            piecesIsFetching={props.piecesIsFetching[type]}
            piecesIsFetched={props.piecesIsFetched[type]}

            armorType={type}
            armorTypeCapital={capitalType}
            
            getSkills={props.getSkills}
            skillsIsFetched={props.skillsIsFetched}
            skillsIsFetching={props.skillsIsFetching}

            // getSetSkills={props.getSetSkills}
            setSkills={props.setSkills}
            setSkillsIsFetched={props.setSkillsIsFetched}
            setSkillsIsFetching={props.setSkillsIsFetching}
          />} 
        </Route>
      )
    }
  )

  console.log("Loadout Render");
  return (
      <div className="loadouts">
        <Container>
          <Row className="equippedDetails b-shadow-50">
            <Col sm={4}>
              <EquippedArmor 
                equippedArmor = {props.equippedArmor}
                updatedArmorName = {props.updatedArmorName}
                skills = {props.skills}
              />
            </Col>
            <EquippedInfo 
              equippedArmor = {props.equippedArmor}
              equippedInfo = {props.equippedInfo}
              getEquippedSkills = {props.getEquippedSkills}
            />
            <EquippedSkills 
              getEquippedSkills = {props.getEquippedSkills}
              updatedEquippedSkillTilesPagination = {props.updatedEquippedSkillTilesPagination}
              page = {props.equippedSkillTilesPagination}
            />
          </Row>
        </Container>
        <nav className="b-shadow-75 t-border b-tb-fade">
          <Container>
            <ul className="nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/HeadPieces" onClick={() => props.updatedPieceTilePagination(1)}>Head</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/ChestPieces" onClick={() => props.updatedPieceTilePagination(1)}>Chest</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/GlovesPieces" onClick={() => props.updatedPieceTilePagination(1)}>Gloves</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/WaistPieces" onClick={() => props.updatedPieceTilePagination(1)}>Waist</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Loadouts/LegsPieces" onClick={() => props.updatedPieceTilePagination(1)}>Legs</NavLink>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => props.armorRank === "low" ? props.setArmorRank("") : props.setArmorRank("low")} className={`nav-link ${props.armorRank === "low" ? "active" : ""}`}>Low Rank</button>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => props.armorRank === "high" ? props.setArmorRank("") : props.setArmorRank("high")} className={`nav-link ${props.armorRank === "high" ? "active" : ""}`}>High Rank</button>
              </li>
              <li className="nav-item nav-rank">
                <button onClick={() => props.armorRank === "master" ? props.setArmorRank("") : props.setArmorRank("master")} className={`nav-link ${props.armorRank === "master" ? "active" : ""}`}>Master Rank</button>
              </li>
              <li className="searchBar">
                <button title="Search by skills separated by spaces" onClick={() => props.toggleArmorSearch()} className={`searchToggle t-border ${props.searchBySkill === true ? "active" : ""}`}>Search by skill</button>
                <input placeholder="Search" aria-label="Search" type="text" value={props.armorSearchValue} onChange={props.searchArmorPieces} />
              </li>
            </ul>
          </Container>
        </nav>
        <Container>
        <Route exact path={`${props.match.path}`} 
          render={() => 
            <ul className="searchInfo t-border b-shadow-50">
              <li>Please select an equipment piece type to display a list of that type.</li>
              <li>You can also filter by rank or, by selecting the highlighted rank, disable the rank filter to display all results.</li>
              <li>The search bar will filter by equipment name.</li>
              <ul>
                <li>Note: to search for α, please type 'alpha'.</li>
              </ul>
              <li>The search bar can also search by skills. By toggling the 'Search by skill' button you can use keywords to filter through skills.</li>
              <ul>
                <li>Note: skill keywords are separated by a space, e.g. By typing "Attack Boost" I will be searching by skills that have either "Attack" or "Boost" in their skill name.</li>
              </ul>
            </ul>
          }
        />
        <Switch>
          {armorPieces}
        </Switch>
        </Container>
      </div>
  )
}

export default Loadouts;
