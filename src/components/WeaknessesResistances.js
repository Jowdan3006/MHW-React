import React from 'react';
import WeaknessesResistancesSingle from './WeaknessesResistancesSingle'

const WeaknessesResistances = (props) => {

    const elementFilter = ['fire', 'water', 'thunder', 'ice', 'poison', 'dragon'];
    const ailmentFilter = ['sleep', 'stun', 'sleep', 'paralysis', 'blast'];

    const monsterWeaknessElements = props.weaknesses.filter(
      (weakness) => {
        if (!ailmentFilter.includes(weakness.element) && weakness.condition === null) {
          return weakness;
        } return null
      })
      .map((weakness, index) =>
        <WeaknessesResistancesSingle weakness={weakness} key={index}/>
      );

    const monsterWeaknessElementConditions = props.weaknesses.filter(
      (weakness) => {
        if (!ailmentFilter.includes(weakness.element) && weakness.condition !== null) {
          return weakness;
        } return null
      })
      .map((weakness, index) =>
        <WeaknessesResistancesSingle weakness={weakness} key={index}/>
      );

    const monsterWeaknessAilments = props.weaknesses.filter(
      (weakness) => {
        if (!elementFilter.includes(weakness.element) && weakness.condition === null) {
          return weakness;
        } return null
      })
      .map((weakness, index) =>
        <WeaknessesResistancesSingle weakness={weakness} key={index}/>
      );

    const monsterResistances = props.resistances.filter(weakness => weakness.condition === null).map((weakness, index) =>
      <WeaknessesResistancesSingle weakness={weakness} key={index}/>
    );

    const monsterResistanceConditions = props.resistances.filter(weakness => weakness.condition !== null).map((weakness, index) =>
      <WeaknessesResistancesSingle weakness={weakness} key={index}/>
    );

  return (
    <div className="WeaknessesResistances">
      <div className="elements">
        Elemental weaknesses:&nbsp;
        {monsterWeaknessElements.length !== 0 ? monsterWeaknessElements : "none"}
        {monsterWeaknessElementConditions.length !== 0 ? <div className="conditional">Elemental weaknesses Conditional: {monsterWeaknessElementConditions}</div> : ""}
      </div>
      <hr/>
      <div className="ailments">
        Ailment weaknesses:&nbsp;
        {monsterWeaknessAilments.length !== 0 ? monsterWeaknessAilments : "none"}
      </div>
      <hr/>
      <div className="resistances">
        Resistances:&nbsp;
        {monsterResistances.length !== 0 ? monsterResistances : "none"}
        {monsterResistanceConditions.length !== 0 ? <div className="conditional">Resistances Conditional: {monsterResistanceConditions}</div> : ""}
      </div>
    </div>
  )
}

export default WeaknessesResistances;