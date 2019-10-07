import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import axios from 'axios';
import update from 'immutability-helper';

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

    resistanceTypes: ['fire', 'water', 'thunder', 'ice', 'dragon'],
    equippedInfo: {
      health: 100,
      stamina: 100,
      defense: 0,
      resistances: {
        fire: 0,
        water: 0,
        thunder: 0,
        ice: 0,
        dragon: 0
      }
    },

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
    let updatedSkills = null;
    let updatedEquippedInfo = {};
    if (this.state.skills.length !== 0) {
      if (this.state[piece.type + "Piece"] !== null) {
        console.log(`${piece.type}Piece Found`, this.state[piece.type + "Piece"]);
        console.log(`Replacing ${piece.type}Piece`, piece);
        updatedSkills = this.updateSkill(this.state[piece.type + "Piece"], true, this.state.skills);
        if (piece.skills.length !== 0) {
          updatedSkills = this.updateSkill(piece, false, updatedSkills);
        }
        updatedEquippedInfo = this.updateEquippedInfo(piece, this.state[piece.type + "Piece"], this.state.equippedInfo)
      } else {
        if (piece.skills.length !== 0) {
          updatedSkills = this.updateSkill(piece, false, this.state.skills);
        }
        updatedEquippedInfo = this.updateEquippedInfo(piece, null, this.state.equippedInfo)
      }
      if (updatedSkills === null) {
        this.setState({ [piece.type + "Piece"]: piece, equippedInfo: updatedEquippedInfo});
      } else {
        this.setState({ [piece.type + "Piece"]: piece, skills: updatedSkills, equippedInfo: updatedEquippedInfo});
      }
    }
  }

  updateSkill = (piece, minus, currentSkills) => {
    let updatedSkills = [];
    currentSkills.forEach((stateSkill) => {
      let currentSkill = null;
      piece.skills.forEach(skill => {
        if (stateSkill.id === skill.skill) {
          let updatedLevel = minus ? (stateSkill.level - skill.level) : (stateSkill.level + skill.level);
          currentSkill = update(stateSkill, {level: {$set: updatedLevel}});
          console.log(minus, updatedLevel, currentSkill);
          updatedSkills.push(currentSkill);
        }
      });
      if (currentSkill === null) {
          updatedSkills = update(updatedSkills, {$push: [stateSkill]});
      }
    });
    return updatedSkills;
  }

  updateEquippedInfo = (piece, oldPiece, currentEquippedInfo) => {
    let updatedEquippedInfo = {};
    if (oldPiece != null) {
      updatedEquippedInfo = update(currentEquippedInfo, {$merge: {defense : currentEquippedInfo.defense - oldPiece.defense.base + piece.defense.base}});
      this.state.resistanceTypes.forEach(resistance => {
        updatedEquippedInfo = update(updatedEquippedInfo, 
          {resistances: {[resistance]: {$set: updatedEquippedInfo.resistances[resistance] - oldPiece.resistances[resistance] + piece.resistances[resistance]}}}
        );
      });
    } else {
      updatedEquippedInfo = update(currentEquippedInfo, {$merge: {defense : currentEquippedInfo.defense + piece.defense.base}});
      this.state.resistanceTypes.forEach(resistance => {
        updatedEquippedInfo = update(updatedEquippedInfo, 
          {resistances: {[resistance]: {$set: updatedEquippedInfo.resistances[resistance] + piece.resistances[resistance]}}}
        );
      });
    }
    // this.state.resistanceTypes.forEach(resistance => {
    //   currentEquippedInfo.resistances[resistance] += piece.resistances[resistance];
    // });
    return updatedEquippedInfo;
  }

  updateEquippedInfoBySkills = (skills, oldSkills, currentEquippedInfo) => {
    console.log("Old Skills", oldSkills);
    console.log("New Skills", skills);
    oldSkills.forEach(oldSkill => {
      console.log(oldSkill);
      if (oldSkill.level > 0 && Object.keys(oldSkill.skill.ranks[oldSkill.level - 1].modifiers).length !== 0) {
        console.log(oldSkill);
      }
    })
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
              equippedInfo={this.state.equippedInfo}
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
