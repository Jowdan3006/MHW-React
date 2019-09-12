import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import ArmorPieces from './ArmorPieces';
import PieceTile from './PieceTile';

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

    value: '',
    rank: "low"
  }

  componentDidMount() {
    console.log("Loadout Mounted");
  }

  getPiecesFor = (piece) => {
    let pieces = piece + 'Pieces';
    this.setState({[pieces + 'IsFetching']: true})
    console.log(piece + "fetching")
    fetch(`https://mhw-db.com/armor/?q={"type": "${piece}"}`)
      .then(response => response.json())
      .then(responseData => this.setState({ [pieces]: responseData, [pieces + 'IsFetched']: true}))
      .then(() => console.log(piece + "fetched", this.state.headPieces))
      .catch(error => console.log("Error while fetching data", error));
  }

  getPiecesTiles = (piece) => {
    let pieces = []
    switch (piece) {
      case "head":
        pieces = this.state.headPieces;
        break;
      case "chest":
        pieces = this.state.chestPieces;
        break;
      case "gloves":
        pieces = this.state.glovesPieces;
        break;
      case "waist":
        pieces = this.state.waistPieces;
        break;
      case "legs":
        pieces = this.state.legsPieces;
        break;
      default:
        break;
    }
    let pieceTiles = pieces.filter((currentPiece) => currentPiece.name.toLowerCase().includes(this.state.value) && currentPiece.rank === this.state.rank)
      .map((piece) => 
        <PieceTile 
          key={piece.id}
          rarity={piece.rarity}
          name={piece.name}
          type={piece.type}
          equipArmor={this.equipArmor}
        />
      )
    return pieceTiles;
  }

  searchField = this.searchField.bind(this);
  searchField(event) {
    this.setState({ value : event.target.value});
  }

  equipArmor = this.equipArmor.bind(this);
  equipArmor(event, armorType) {
    this.setState({ [armorType + "Piece"] : event.target.value});
  }

  render() {
    console.log("Loadout Render");
    return (
      <div className="container">
        <h2>Loadouts</h2>
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
        <Route path={`${this.props.match.path}/HeadPieces`} render={() => 
          <ArmorPieces 
            getPiecesFor={this.getPiecesFor}
            getPiecesTiles={this.getPiecesTiles}
            searchField={this.searchField}
            PiecesIsFetching={this.state.headPiecesIsFetching}
            PiecesIsFetched={this.state.headPiecesIsFetched}
            PiecesLength={this.state.headPieces.length}
            value={this.state.value}
            armorType="head"
          />} 
        />
        <Route path={`${this.props.match.path}/ChestPieces`} render={() => 
          <ArmorPieces 
            getPiecesFor={this.getPiecesFor}
            getPiecesTiles={this.getPiecesTiles}
            searchField={this.searchField}
            PiecesIsFetching={this.state.chestPiecesIsFetching}
            PiecesIsFetched={this.state.chestPiecesIsFetched}
            PiecesLength={this.state.chestPieces.length}
            value={this.state.value}
            armorType="chest"
          />} 
        />
        <Route path={`${this.props.match.path}/GlovesPieces`} render={() => 
          <ArmorPieces 
            getPiecesFor={this.getPiecesFor}
            getPiecesTiles={this.getPiecesTiles}
            searchField={this.searchField}
            PiecesIsFetching={this.state.glovesPiecesIsFetching}
            PiecesIsFetched={this.state.glovesPiecesIsFetched}
            PiecesLength={this.state.glovesPieces.length}
            value={this.state.value}
            armorType="gloves"
          />} 
        />
        <Route path={`${this.props.match.path}/WaistPieces`} render={() => 
          <ArmorPieces 
            getPiecesFor={this.getPiecesFor}
            getPiecesTiles={this.getPiecesTiles}
            searchField={this.searchField}
            PiecesIsFetching={this.state.waistPiecesIsFetching}
            PiecesIsFetched={this.state.waistPiecesIsFetched}
            PiecesLength={this.state.waistPieces.length}
            value={this.state.value}
            armorType="waist"
          />} 
        />
        <Route path={`${this.props.match.path}/LegsPieces`} render={() => 
          <ArmorPieces 
            getPiecesFor={this.getPiecesFor}
            getPiecesTiles={this.getPiecesTiles}
            searchField={this.searchField}
            PiecesIsFetching={this.state.legsPiecesIsFetching}
            PiecesIsFetched={this.state.legsPiecesIsFetched}
            PiecesLength={this.state.legsPieces.length}
            value={this.state.value}
            armorType="legs"
          />} 
        />

      </div>
    );
  }
}

export default Loadouts;
