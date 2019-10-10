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
    searchBySkill: false,
    armorRank: "high",

    resistanceTypes: ['fire', 'water', 'thunder', 'ice', 'dragon'],
    equippedInfo: {
      health: 100,
      stamina: 100,
      defense: 0,
      baseDefense: 0,
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
    axios.get(`http://mhw-db.com/armor/?q={"type": "${piece}"}`)
      .then(response => { 
        let pieces = [];
        response.data.forEach(piece => {
          let skillNames = [];
          piece.skills.forEach(skill => {
            skillNames = skillNames.concat(skill.skillName.toLowerCase().split(" "));
          })
          piece.skillNames = skillNames;
          pieces.push(piece);
        })
        return pieces;
      })
      .then(data => this.setState({ [pieces]: data, [pieces + 'IsFetched']: true}))
      .then(() => console.log(pieces + "Fetched", this.state[pieces]))
      .catch(error => console.log("Error while fetching data", error));
  }

  getPiecesTiles = (piece) => {
    let pieces = this.state[piece + "Pieces"];
    let search = this.state.armorSearchValue.toLowerCase().split(" ");
    let pieceTiles = pieces.filter(currentPiece => {
      if (this.state.searchBySkill) {
        let result = currentPiece.skillNames.length > 0;
        search.forEach(s => {
          let skillMatch = false;
          currentPiece.skillNames.forEach(skillName => {
            skillMatch = skillMatch || skillName.includes(s) || s === null || s === "";
          })
          result = result && skillMatch;
        })
        return result && currentPiece.rank === this.state.armorRank
      } else {
        return currentPiece.name.toLowerCase().includes(this.state.armorSearchValue.toLowerCase())
          && currentPiece.rank === this.state.armorRank 
      }
    })
    .map(piece => 
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

  toggleArmorSearch = () => {
    this.setState({searchBySkill: !this.state.searchBySkill});
  }

  setArmorRank = (rank) => {
    this.setState({armorRank: rank})
  }

  getSkills = () => {
    if (this.state.skillsIsFetching === false && this.state.skillsIsFetched === false) {
      console.log("SkillsIsFetching")
      this.setState({skillsIsFetching: true})
      let skills = [];
      axios.get(`http://mhw-db.com/skills/`)
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

    if (this.state.skills.length !== 0) { // Check if the skills have been fetched
      if (this.state[piece.type + "Piece"] !== null) { // Check if the state piece type is set and needs to be replaced
        console.log(`${piece.type}Piece Found`, this.state[piece.type + "Piece"]);
        console.log(`Replacing ${piece.type}Piece`, piece);
        updatedSkills = this.updateSkill(this.state[piece.type + "Piece"], this.state.skills, true); // Remove old skills from state piece and create a new skills array 
        updatedSkills = this.updateSkill(piece, updatedSkills, false); // Add new skills from current piece using the newly created skills array

        updatedEquippedInfo = this.updateEquippedInfo(this.state[piece.type + "Piece"], this.state.equippedInfo, true) // Remove state piece equipment info and create a new equipment info array
        updatedEquippedInfo = this.updateEquippedInfo(piece, updatedEquippedInfo, false) // Add current piece equipment info using created equipment info array
      } else {
        updatedSkills = this.updateSkill(piece, this.state.skills, false); // Add new skills from current piece and create a new skills array 
        updatedEquippedInfo = this.updateEquippedInfo(piece, this.state.equippedInfo, false) // Add current piece equipment info and create a new equipment info array
      }

      updatedEquippedInfo = this.updateEquippedInfoBySkills(updatedEquippedInfo, this.state.skills, true)
      updatedEquippedInfo = this.updateEquippedInfoBySkills(updatedEquippedInfo, updatedSkills, false)

      this.setState({ [piece.type + "Piece"]: piece, skills: updatedSkills, equippedInfo: updatedEquippedInfo});
    }
  }

  updateSkill = (piece, currentSkills, minus) => {
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

  updateEquippedInfo = (piece, currentEquippedInfo, minus) => {
    let updatedEquippedInfo = {};
    updatedEquippedInfo = update(currentEquippedInfo, {$merge: {defense: minus ? currentEquippedInfo.defense - piece.defense.base : currentEquippedInfo.defense + piece.defense.base}});
    updatedEquippedInfo = update(updatedEquippedInfo, {$merge: {baseDefense: minus ? currentEquippedInfo.baseDefense - piece.defense.base : currentEquippedInfo.baseDefense + piece.defense.base}});
    this.state.resistanceTypes.forEach(resistance => {
      updatedEquippedInfo = update(updatedEquippedInfo, 
        {resistances: {[resistance]: {$set: minus ? updatedEquippedInfo.resistances[resistance] - piece.resistances[resistance] : updatedEquippedInfo.resistances[resistance] + piece.resistances[resistance]}}}
      );
    }); 
    return updatedEquippedInfo;
  }

  updateEquippedInfoBySkills = (updatedEquippedInfo, updatedSkills, minus) => {
    updatedSkills.forEach(skill => {
      if (skill.level !== 0) {
        let level = skill.level > skill.skill.ranks.length ? skill.skill.ranks.length : skill.level;
        if (skill.skill.ranks[level - 1].modifiers !== null) {
          let modifiers = Object.entries(skill.skill.ranks[level - 1].modifiers);
          modifiers.forEach(modifier => {
            switch (modifier[0]) {
              case "defense":
                if (skill.skill.name === "Defense Boost" && level > 2) {
                  let percent;
                  switch (level) {
                    case 3:
                    case 4:
                      percent = 5;
                      break;
                    case 5:
                    case 6:
                      percent = 8;
                      break;
                    case 7:
                      percent = 10;
                      break;
                    default:
                      percent = 0;
                      break;
                  }
                  updatedEquippedInfo = update(updatedEquippedInfo, {$merge: 
                    {defense: minus ? 
                      updatedEquippedInfo.baseDefense : 
                      Math.floor(updatedEquippedInfo.baseDefense * (1 + (percent / 100))) + modifier[1]}
                  })
                } else {
                  updatedEquippedInfo = update(updatedEquippedInfo, {$merge: {defense: minus ? updatedEquippedInfo.defense - modifier[1] : updatedEquippedInfo.defense + modifier[1]}})
                }
                break; 
              case "health":
                updatedEquippedInfo = update(updatedEquippedInfo, {$merge: {health: minus ? updatedEquippedInfo.health - modifier[1] : updatedEquippedInfo.health + modifier[1]}})
                break;
              case "resistAll":
                this.state.resistanceTypes.forEach(resistance => {
                  updatedEquippedInfo = update(updatedEquippedInfo, 
                    {resistances: {[resistance]: {$set: minus ? updatedEquippedInfo.resistances[resistance] - modifier[1] : updatedEquippedInfo.resistances[resistance] + modifier[1]}}}
                  );
                }); 
                break;
              case "resistFire":
                updatedEquippedInfo = update(updatedEquippedInfo, {resistances: {fire: {$set: minus ? updatedEquippedInfo.resistances.fire - modifier[1] : updatedEquippedInfo.resistances.fire + modifier[1]}}})
                break;
              case "resistWater":
                updatedEquippedInfo = update(updatedEquippedInfo, {resistances: {water: {$set: minus ? updatedEquippedInfo.resistances.water - modifier[1] : updatedEquippedInfo.resistances.water + modifier[1]}}})
                break;
              case "resistIce":
                updatedEquippedInfo = update(updatedEquippedInfo, {resistances: {ice: {$set: minus ? updatedEquippedInfo.resistances.ice - modifier[1] : updatedEquippedInfo.resistances.ice + modifier[1]}}})
                break;
              case "resistThunder":
                updatedEquippedInfo = update(updatedEquippedInfo, {resistances: {thunder: {$set: minus ? updatedEquippedInfo.resistances.thunder - modifier[1] : updatedEquippedInfo.resistances.thunder + modifier[1]}}})
                break;
              case "resistDragon":
                updatedEquippedInfo = update(updatedEquippedInfo, {resistances: {dragon: {$set: minus ? updatedEquippedInfo.resistances.dragon - modifier[1] : updatedEquippedInfo.resistances.dragon + modifier[1]}}})
                break;
              default:
                break;
            }
          })
        }
      }
    });
    return updatedEquippedInfo;
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
              toggleArmorSearch={this.toggleArmorSearch.bind(this)}
              searchBySkill={this.state.searchBySkill}
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
