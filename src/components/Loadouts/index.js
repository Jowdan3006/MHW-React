import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import axios from 'axios';

import ArmorPieces from './ArmorPieces';
import EquippedArmor from './EquippedArmor';
import PieceTile from './PieceTile';
import EquippedSkills from './EquippedSkills';

class Loadouts extends Component {

  state = {
    headPieces: [],
    headPiecesIsFetching: false,
    headPiecesIsFetched: false,
    headPiece: null,

    chestPieces: [],
    chestPiecesIsFetching: false,
    chestPiecesIsFetched: false,
    chestPiece: null,

    glovesPieces: [],
    glovesPiecesIsFetching: false,
    glovesPiecesIsFetched: false,
    glovesPiece: null,

    waistPieces: [],
    waistPiecesIsFetching: false,
    waistPiecesIsFetched: false,
    waistPiece: null,

    legsPieces: [],
    legsPiecesIsFetching: false,
    legsPiecesIsFetched: false,
    legsPiece: null,

    skills: [],
    skillsIsFetching: false,
    skillsIsFetched: false,

    types: ['head', 'chest', 'gloves', 'waist', 'legs'],
    value: '',
    rank: "high",
    gender: "male"
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
              getPiecesFor={this.getPiecesFor}
              getPiecesTiles={this.getPiecesTiles}
              searchField={this.searchField}
              PiecesIsFetching={this.state[type + 'PiecesIsFetching']}
              PiecesIsFetched={this.state[type + 'PiecesIsFetched']}
              PiecesLength={this.state[type + 'Pieces'].length}
              value={this.state.value}
              armorType={type}
              armorTypeCapital={capitalType}
              getSkills={this.getSkills}
              skillsIsFetching={this.skillsIsFetching}
              skillsIsFetched={this.skillsIsFetched}
            />} 
          />
        )
      }
    )
    return armorPieces;
  }

  getPiecesFor = (piece) => {
    let pieces = piece + 'Pieces';
    this.setState({[pieces + 'IsFetching']: true});
    console.log(pieces + "IsFetching");
    axios.get(`https://mhw-db.com/armor/?q={"type": "${piece}"}`, {mode: 'no-cors'})
      .then(response => this.setState({ [pieces]: response.data, [pieces + 'IsFetched']: true}))
      .then(() => console.log(pieces + "Fetched", this.state[pieces]))
      .catch(error => console.log("Error while fetching data", error));
  }

  getSkills = () => {
    if (this.state.skillsIsFetching === false && this.state.skillsIsFetched === false) {
      console.log("SkillsIsFetching")
      this.setState({skillsIsFetching: true})
      let skills = [];
      axios.get(`https://mhw-db.com/skills/`, {mode: 'no-cors'})
        .then(response => {
          response.data.forEach(skill => skills.push({id: skill.id, level: 0, skill: skill}))
        })
        .then(() => this.setState({skills: skills, skillsIsFetching: false, skillsIsFetched: true}))
        .then(() => console.log("SkillsFetched", this.state.skills))
        .catch(error => console.log("Error while fetching data", error));
      }
    }
        

  getPiecesTiles = (piece) => {
    let pieces = this.state[piece + 'Pieces'];
    let pieceTiles = pieces.filter((currentPiece, index) => currentPiece.name.toLowerCase().includes(this.state.value.toLowerCase()) && currentPiece.rank === this.state.rank && index < 70)
      .map((piece) => 
        <PieceTile 
          key={piece.id}
          piece={piece}
          equipArmor={this.equipArmor.bind(this, piece)}
          equipped={this.state[piece.type + "Piece"] === null ? null : this.state[piece.type + "Piece"]}
          skills = {this.state.skills}
        />
      )
    return pieceTiles;
  }

  searchField = (event) => {
    this.setState({ value: event.target.value});
  }

  equipArmor(piece, event) {
    if (this.state.skills.length !== 0) {
      let skills = this.state.skills;
      if (this.state[piece.type + "Piece"] !== null) {
        console.log(`${piece.type}Piece Found`, this.state[piece.type + "Piece"]);
        console.log(`Replacing ${piece.type}Piece`, piece);
        skills = this.updateSkill(this.state[piece.type + "Piece"], true, skills);
      }
      if (piece.skills.length !== 0) {
        skills = this.updateSkill(piece, false, skills);
      }
      this.setState({ [piece.type + "Piece"]: piece, skills: skills});
    }
  }

  updateSkill = (piece, minus, currentSkills) => {
    let skills = [];
    currentSkills.forEach((stateSkill) => {
      piece.skills.forEach(skill => {
        if (stateSkill.id === skill.skill) {
          let updatedLevel = minus ? (stateSkill.level - skill.level) : (stateSkill.level + skill.level);
          stateSkill.level = updatedLevel;
        }
      });
      skills.push(stateSkill);
    });
    console.log("New skills array", skills);
    return skills;
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
      <div className="container">
        <div className="row">
          <EquippedArmor 
            equippedArmor = {{head: this.state.headPiece, chest: this.state.chestPiece, gloves: this.state.glovesPiece, waist: this.state.waistPiece, legs: this.state.legsPiece}}
            gender = {this.state.gender}
            updatedArmorName = {this.updatedArmorName}
            skills = {this.state.skills}
          />
          <EquippedSkills skills={this.state.skills}/>
        </div>
        <ul className="nav nav-tabs">
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
        </ul>
        {this.getArmorPieces()}
      </div>
    );
  }
}

export default Loadouts;
