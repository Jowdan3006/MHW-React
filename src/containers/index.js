import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import axios from 'axios';

import Header from "../components/Header";
import MonsterList from "../components/MonsterList/";
import Loadouts from "../components/Loadouts/";
import PieceTile from "../components/Loadouts/PieceTile";

class Main extends Component {
  
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

    armorSearchValue: '',
    armorRank: "high",

    monsters: [],
    monstersIsFetched: false,
    monsterSearchValue: ''
  }

  componentDidMount(){
    console.log("Main Mounted");
  }

  getPiecesFor = (piece) => {
    let pieces = piece + 'Pieces';
    this.setState({[pieces + 'IsFetching']: true});
    console.log(pieces + "IsFetching");
    axios.get(`https://mhw-db.com/armor/?q={"type": "${piece}"}`)
      .then(response => this.setState({ [pieces]: response.data, [pieces + 'IsFetched']: true}))
      .then(() => console.log(pieces + "Fetched", this.state[pieces]))
      .catch(error => console.log("Error while fetching data", error));
  }

  getPiecesTiles = (piece) => {
    let pieces = this.state[piece + "Pieces"];
    let pieceTiles = pieces.filter(
      currentPiece => 
        currentPiece.name.toLowerCase().includes(this.state.armorSearchValue.toLowerCase())
        && currentPiece.rank === this.state.armorRank 
        // && index < 70
      )
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

  searchArmorPieces = (event) => {
    this.setState({armorSearchValue: event.target.value});
  }

  setArmorRank = (rank) => {
    this.setState({armorRank: rank})
  }

  getSkills = () => {
    if (this.state.skillsIsFetching === false && this.state.skillsIsFetched === false) {
      console.log("SkillsIsFetching")
      this.setState({skillsIsFetching: true})
      let skills = [];
      axios.get(`https://mhw-db.com/skills/`)
        .then(response => {
          response.data.forEach(skill => skills.push({id: skill.id, level: 0, skill: skill}))
        })
        .then(() => this.setState({skills: skills, skillsIsFetching: false, skillsIsFetched: true}))
        .then(() => console.log("SkillsFetched", this.state.skills))
        .catch(error => console.log("Error while fetching data", error));
    }
  }

  getEquippedSkills = () => {
    let skills = [];
    if (this.state.skills.length !== 0) {
      this.state.skills.forEach(skill => {
        if (skill.level !== 0) {
          skills.push(skill);
        }
      })
    }
    return skills;
  }

  equipArmor(piece) {
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

  getMonsters = () => {
    fetch('https://mhw-db.com/monsters')
      .then(response => response.json())
      .then(responseData => this.setState(({monsters: responseData, monstersIsFetched: true})))
      .catch(error => console.log("Error while fetching data", error));
  }

  getMonsterDataById = (id) => {
    return (
      this.state.monsters.filter(monster => String(monster.id) === id)[0]
    );
  }

  
  searchMonsters = (event) => {
    this.setState({ monsterSearchValue: event.target.value});
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
              getMonsters={this.getMonsters}
              searchMonsters={this.searchMonsters.bind(this)}
              monsterSearchValue={this.state.monsterSearchValue}
              monstersIsFetched={this.state.monstersIsFetched} 
              getMonsterDataById={this.getMonsterDataById}
            />} 
          />
          <Route path="/Loadouts" render={(match) =>
            <Loadouts
              getPiecesFor={this.getPiecesFor}
              getPiecesTiles={this.getPiecesTiles}
              searchArmorPieces={this.searchArmorPieces.bind(this)}
              armorSearchValue={this.state.armorSearchValue}
              setArmorRank={this.setArmorRank.bind(this)}
              getSkills={this.getSkills}
              getEquippedSkills={this.getEquippedSkills}
              skills={this.state.skills}
              skillsIsFetched={this.state.skillsIsFetched}
              armorRank={this.state.armorRank}
              pieces={{
                head: this.state.headPieces, 
                chest: this.state.chestPieces, 
                gloves: this.state.glovesPieces, 
                waist: this.state.waistPieces, 
                legs: this.state.legsPieces
              }}
              equippedArmor = {{
                head: this.state.headPiece, 
                chest: this.state.chestPiece, 
                gloves: this.state.glovesPiece, 
                waist: this.state.waistPiece, 
                legs: this.state.legsPiece
              }}
              piecesIsFetching = {{
                head: this.state.headPiecesIsFetching, 
                chest: this.state.chestPiecesIsFetching, 
                gloves: this.state.glovesPiecesIsFetching, 
                waist: this.state.waistPiecesIsFetching, 
                legs: this.state.legsPiecesIsFetching
              }}
              piecesIsFetched = {{
                head: this.state.headPiecesIsFetched, 
                chest: this.state.chestPiecesIsFetched, 
                gloves: this.state.glovesPiecesIsFetched, 
                waist: this.state.waistPiecesIsFetched, 
                legs: this.state.legsPiecesIsFetched
              }}
              match={match.match}
            />}
          />
        </div>
      </HashRouter>
    );
  }
}

export default Main;
