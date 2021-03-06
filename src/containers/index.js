import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import update from 'immutability-helper';
import LoadingBar from 'react-top-loading-bar';

import Header from "../components/Header";
import MonsterList from "../components/MonsterList/";
import Loadouts from "../components/Loadouts/";
import PieceTile from "../components/Loadouts/PieceTile";

class Main extends Component {
  
  state = {
    types: ['head', 'chest', 'gloves', 'waist', 'legs'],
    pieceTilePagination: 1,
    equippedSkillTilesPagination: 1,
    loadingBarProgress: 0,

    headPieces: [],
    headPiecesIsFetching: false,
    headPiecesIsFetched: false,
    headPiecesInfoCalculateInProgress: false,
    headPiecesInfoIsCalculated: false,
    headPiece: null,

    chestPieces: [],
    chestPiecesIsFetching: false,
    chestPiecesIsFetched: false,
    chestPiecesInfoCalculateInProgress: false,
    chestPiecesInfoIsCalculated: false,
    chestPiece: null,

    glovesPieces: [],
    glovesPiecesIsFetching: false,
    glovesPiecesIsFetched: false,
    glovesPiecesInfoCalculateInProgress: false,
    glovesPiecesInfoIsCalculated: false,
    glovesPiece: null,

    waistPieces: [],
    waistPiecesIsFetching: false,
    waistPiecesIsFetched: false,
    waistPiecesInfoCalculateInProgress: false,
    waistPiecesInfoIsCalculated: false,
    waistPiece: null,

    legsPieces: [],
    legsPiecesIsFetching: false,
    legsPiecesIsFetched: false,
    legsPiecesInfoCalculateInProgress: false,
    legsPiecesInfoIsCalculated: false,
    legsPiece: null,

    skills: [],
    skillsIsFetching: false,
    skillsIsFetched: false,

    setSkills: [],
    setSkillsIsFetched: false,
    setSkillsIsFetching: false,

    armorSearchValue: '',
    searchBySkill: false,
    armorRank: "master",

    resistanceTypes: ['fire', 'water', 'thunder', 'ice', 'dragon'],
    equippedInfo: {
      health: 100,
      stamina: 100,
      defense: 0,
      baseDefense: 0,
      resistances: {
        fire: 0,
        fireBase: 0,
        water: 0,
        waterBase: 0,
        thunder: 0,
        thunderBase: 0,
        ice: 0,
        iceBase: 0,
        dragon: 0,
        dragonBase: 0
      }
    },

    monsters: [],
    monstersIsFetched: false,
    monsterSearchValue: ''
  }

  componentDidMount(){
    console.log("Main Mounted");
  }

  getPiecesFor = async (piece) => {
    let pieces = piece + 'Pieces';
    this.setState({[pieces + 'IsFetching']: true, loadingBarProgress: 20});
    console.log("LoadingBarProgress: Piece Fetching",this.state.loadingBarProgress)
    console.log(pieces + "IsFetching");
    let url = `https://mhw-db.com/armor?q={"type": "${piece}"}`
    await fetch(url)
      .then((response) => { this.setState({[pieces + 'IsFetched']: true}); return response.json(); })
      .then((response) => { this.setState({ [pieces]: response, [pieces + 'IsFetching']: false, loadingBarProgress: this.state.skills.length === 0 ? this.state.loadingBarProgress + 20 : 80 }); console.log("LoadingBarProgress: Piece Fetch",this.state.loadingBarProgress) })
      .then(() => { console.log(pieces + "Fetched", this.state[pieces]); })
      .catch(error => console.log("Error while fetching data", error))
  }

  getSkills = async () => {
    console.log("SkillsIsFetching")
    this.setState({skillsIsFetching: true})
    let skills = [];
    await fetch('https://mhw-db.com/skills')
      .then(response => response.json())
      .then(responseData => {
        responseData.forEach(skill => skills.push({id: skill.id, level: 0, skill: skill}))
      })
      .then(() => {this.setState({skills: skills.reverse(), skillsIsFetching: false, skillsIsFetched: true, loadingBarProgress: this.state.loadingBarProgress + 20}); console.log("LoadingBarProgress: Skills Fetch",this.state.loadingBarProgress)})
      .then(() => console.log("SkillsFetched", this.state.skills))
      .catch(error => console.log("Error while fetching data", error));
  }

  getSetSkills = async () => {
    console.log("SetSkillsIsFetching")
    this.setState({setSkillsIsFetching: true})
    let setSkills = [];
    await fetch('https://mhw-db.com/armor/sets?p={"id": true, "name": true, "bonus": true, "pieces.id": true, "pieces.name": true}')
      .then(response => response.json())
      .then(responseData => {
        responseData.forEach(setSkill => setSkills.push({level: 0, setSkill: setSkill}))
      })
      .then(() => {this.setState({setSkills: setSkills, setSkillsIsFetching: false, setSkillsIsFetched: true, loadingBarProgress: this.state.loadingBarProgress + 20}); console.log("LoadingBarProgress: SetSkills Fetch",this.state.loadingBarProgress)})
      .then(() => console.log("SetSkillsFetched", this.state.setSkills))
      .catch(error => console.log("Error while fetching data", error));
  }

  preCalculatePieceInformation = (type) => {
    let pieces = type + 'Pieces';
    this.setState({ [pieces + "InfoCalculateInProgress"]: true });
    console.log(pieces + "IsCalculating", this.state.setSkillsIsFetched);

    let armorPieces = [];
    this.state[pieces].forEach(piece => {
      let skillNames = [];
      piece.skills.forEach(skill => {
        skillNames = skillNames.concat(skill.skillName.toLowerCase().split(" "));
      })
      armorPieces.push(update(piece, {skillNames: {$set: skillNames}}));
    })
    this.setState({[pieces]: armorPieces, [pieces + "InfoCalculateInProgress"]: false, [pieces + "InfoIsCalculated"]: true, loadingBarProgress: 100})
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
        return result && (this.state.armorRank === "" ? true : currentPiece.rank === this.state.armorRank)
      } else {
        return currentPiece.name.toLowerCase().includes(this.state.armorSearchValue.toLowerCase())
          && (this.state.armorRank === "" ? true : currentPiece.rank === this.state.armorRank)
      }
    })
    .map(piece => 
      <PieceTile 
        key={piece.id}
        piece={piece}
        equipArmor={this.equipArmor.bind(this)}
        equipped={this.state[piece.type + "Piece"] === null ? null : this.state[piece.type + "Piece"]}
        skills={this.state.skills}
        updatedArmorName={this.updatedArmorName}
      />
    )
    return pieceTiles;
  }

  searchArmorPieces = (event) => {
    this.setState({armorSearchValue: event.target.value, pieceTilePagination: 1});
  }

  toggleArmorSearch = () => {
    this.setState({searchBySkill: !this.state.searchBySkill});
  }

  setArmorRank = (rank) => {
    this.setState({armorRank: rank, pieceTilePagination: 1})
  }

  updatedPieceTilePagination(page) {
    this.setState({pieceTilePagination: page});
  }

  updatedEquippedSkillTilesPagination(page) {
    this.setState({equippedSkillTilesPagination: page});
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
    let updatedSetSkills = null;
    let updatedEquippedInfo = {};

    if (this.state.skills.length !== 0) { // Check if the skills have been fetched
      if (this.state[piece.type + "Piece"] !== null) { // Check if the state piece type is set and needs to be replaced
        console.log(`${piece.type}Piece Found`, this.state[piece.type + "Piece"]);
        console.log(`Replacing ${piece.type}Piece`, piece);
        updatedSkills = this.updateSkill(this.state[piece.type + "Piece"], this.state.skills, true); // Remove old skills from state piece and create a new skills array 
        updatedSkills = this.updateSkill(piece, updatedSkills, false); // Add new skills from current piece using the newly created skills array

        updatedSetSkills = this.updateSetSkill(this.state[piece.type + "Piece"], this.state.setSkills, true);
        updatedSetSkills = this.updateSetSkill(piece, updatedSetSkills, false);

        updatedEquippedInfo = this.updateEquippedInfo(this.state[piece.type + "Piece"], this.state.equippedInfo, true) // Remove state piece equipment info and create a new equipment info array
        updatedEquippedInfo = this.updateEquippedInfo(piece, updatedEquippedInfo, false) // Add current piece equipment info using created equipment info array
      } else {
        updatedSkills = this.updateSkill(piece, this.state.skills, false); // Add new skills from current piece and create a new skills array 
        updatedSetSkills = this.updateSetSkill(piece, this.state.setSkills, false);
        updatedEquippedInfo = this.updateEquippedInfo(piece, this.state.equippedInfo, false) // Add current piece equipment info and create a new equipment info array
      }

      updatedEquippedInfo = this.updateEquippedInfoBySkills(updatedEquippedInfo, this.state.skills, true)
      updatedEquippedInfo = this.updateEquippedInfoBySkills(updatedEquippedInfo, updatedSkills, false)

      this.setState({ [piece.type + "Piece"]: piece, skills: updatedSkills, setSkills: updatedSetSkills, equippedInfo: updatedEquippedInfo});
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
          let TempArmorSkills = {armorSkills: {}};
          TempArmorSkills = update(TempArmorSkills, {armorSkills: {$set: stateSkill.armorSkills ? stateSkill.armorSkills : {head: 0, chest: 0, gloves: 0, waist: 0, legs: 0}}});
          this.state.types.forEach(type => {
            if (type === piece.type) {
              TempArmorSkills.armorSkills[type] = minus ? TempArmorSkills.armorSkills[type] - skill.level : TempArmorSkills.armorSkills[type] + skill.level;
            }
          })
          currentSkill = update(currentSkill, {armorSkills: {$set: TempArmorSkills.armorSkills}})
          updatedSkills.push(currentSkill);
        }
      });
      if (currentSkill === null) {
        updatedSkills = update(updatedSkills, {$push: [stateSkill]});
      }
    });
    return updatedSkills;
  }

  updateSetSkill = (piece, currentSetSkills, minus) => {
    let updatedSetSkills = [];
    currentSetSkills.forEach((stateSetSkill) => {
      let updatedSetSkill = null;
      if (stateSetSkill.setSkill.id === piece.armorSet.id) {
        let updatedLevel = minus ? (stateSetSkill.level - 1) : (stateSetSkill.level + 1);
        updatedSetSkill = update(stateSetSkill, {level: {$set: updatedLevel}});
        console.log(minus, updatedLevel, updatedSetSkill);
        let TempArmorSetSkills = {armorSetSkills: {}};
        TempArmorSetSkills = update(TempArmorSetSkills, {armorSetSkills: {$set: stateSetSkill.armorSetSkills ? stateSetSkill.armorSetSkills : {head: 0, chest: 0, gloves: 0, waist: 0, legs: 0}}});
        this.state.types.forEach(type => {
          if (type === piece.type) {
            TempArmorSetSkills.armorSetSkills[type] = minus ? TempArmorSetSkills.armorSetSkills[type] - 1 : TempArmorSetSkills.armorSetSkills[type] + 1;
          }
        })
        updatedSetSkill = update(updatedSetSkill, {armorSetSkills: {$set: TempArmorSetSkills.armorSetSkills}})
        updatedSetSkills.push(updatedSetSkill);
      }
      if (updatedSetSkill === null) {
        updatedSetSkills = update(updatedSetSkills, {$push: [stateSetSkill]});
      }
    });
    return updatedSetSkills;
  }

  updateEquippedInfo = (piece, currentEquippedInfo, minus) => {
    let updatedEquippedInfo = {};
    updatedEquippedInfo = update(currentEquippedInfo, {$merge: {defense: minus ? currentEquippedInfo.defense - piece.defense.base : currentEquippedInfo.defense + piece.defense.base}});
    updatedEquippedInfo = update(updatedEquippedInfo, {$merge: {baseDefense: minus ? currentEquippedInfo.baseDefense - piece.defense.base : currentEquippedInfo.baseDefense + piece.defense.base}});
    this.state.resistanceTypes.forEach(resistance => {
      updatedEquippedInfo = update(updatedEquippedInfo, 
        {resistances: {[resistance]: {$set: minus ? updatedEquippedInfo.resistances[resistance] - piece.resistances[resistance] : updatedEquippedInfo.resistances[resistance] + piece.resistances[resistance]}}}
      );
      updatedEquippedInfo = update(updatedEquippedInfo, 
        {resistances: {[resistance + "Base"]: {$set: minus ? updatedEquippedInfo.resistances[resistance + "Base"] - piece.resistances[resistance] : updatedEquippedInfo.resistances[resistance + "Base"] + piece.resistances[resistance]}}}
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
                      Math.floor(updatedEquippedInfo.defense * (1 + (percent / 100))) + modifier[1]}
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

  updatedArmorName(name) {
    if (name.includes("Alpha +")) {
      name = name.substring(0, name.length - 7) + "α +";
    } else if (name.includes("Beta +")) {
      name = name.substring(0, name.length - 6) + "β +";
    } else if (name.includes("Gamma +")) {
      name = name.substring(0, name.length - 7) + "γ +";
    } else if (name.includes("Alpha")) {
      name = name.substring(0, name.length - 5) + "α";
    } else if (name.includes("Beta")) {
      name = name.substring(0, name.length - 4) + "β";
    } else if (name.includes("Gamma")) {
      name = name.substring(0, name.length - 5) + "γ";
    };
    return name;
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

  onLoaderFinished = () => {
    this.setState({loadingBarProgress: 0})
  }

  render() {
    console.log("Main Render");
    return (
      <HashRouter>
        <LoadingBar 
          progress={this.state.loadingBarProgress}
          onLoaderFinished={() => this.onLoaderFinished()}
        />
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
              types={this.state.types}
              updatedArmorName={this.updatedArmorName}
              pieceTilePagination={this.state.pieceTilePagination}
              updatedPieceTilePagination={this.updatedPieceTilePagination.bind(this)}
              equippedSkillTilesPagination={this.state.equippedSkillTilesPagination}
              updatedEquippedSkillTilesPagination={this.updatedEquippedSkillTilesPagination.bind(this)}
              getPiecesFor={this.getPiecesFor}
              getPiecesTiles={this.getPiecesTiles}
              searchArmorPieces={this.searchArmorPieces.bind(this)}
              armorSearchValue={this.state.armorSearchValue}
              toggleArmorSearch={this.toggleArmorSearch.bind(this)}
              searchBySkill={this.state.searchBySkill}
              setArmorRank={this.setArmorRank.bind(this)}
              getEquippedSkills={this.getEquippedSkills}
              getSkills={this.getSkills}
              skills={this.state.skills}
              skillsIsFetched={this.state.skillsIsFetched}
              skillsIsFetching={this.state.skillsIsFetching}
              getSetSkills={this.getSetSkills}
              setSkills={this.state.setSkills}
              setSkillsIsFetched={this.state.setSkillsIsFetched}
              setSkillsIsFetching={this.state.setSkillsIsFetching}
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
              preCalculatePieceInformationIsDone = {{
                head: this.state.headPiecesInfoIsCalculated, 
                chest: this.state.chestPiecesInfoIsCalculated, 
                gloves: this.state.glovesPiecesInfoIsCalculated, 
                waist: this.state.waistPiecesInfoIsCalculated, 
                legs: this.state.legsPiecesInfoIsCalculated
              }}
              preCalculatePieceInformationInProgress = {{
                head: this.state.headPiecesInfoCalculateInProgress, 
                chest: this.state.chestPiecesInfoCalculateInProgress, 
                gloves: this.state.glovesPiecesInfoCalculateInProgress, 
                waist: this.state.waistPiecesInfoCalculateInProgress, 
                legs: this.state.legsPiecesInfoCalculateInProgress
              }}
              preCalculatePieceInformation = {this.preCalculatePieceInformation.bind(this)}
              match={match.match}
            />}
          />
        </div>
      </HashRouter>
    );
  }
}

export default Main;
