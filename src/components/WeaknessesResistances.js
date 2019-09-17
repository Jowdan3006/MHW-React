import React from 'react';
import WeaknessesResistancesSingle from './WeaknessesResistancesSingle'

const WeaknessesResistances = (props) => {

    const elementFilter = ['fire', 'water', 'thunder', 'ice', 'poison', 'dragon'];
    const ailmentFilter = ['sleep', 'stun', 'sleep', 'paralysis', 'blast'];

    // Groups the current monsters element weaknesses together
    const monsterWeaknessElements = props.weaknesses.filter(
      (weakness) => {
        if (!ailmentFilter.includes(weakness.element) && weakness.condition === null) {
          return weakness;
        } return null
      })
      .map((weakness, index) =>
        <WeaknessesResistancesSingle weakness={weakness} key={index}/>
      );

    // Groups the current monsters element weaknesses that are triggered with a condition together
    const monsterWeaknessElementConditions = props.weaknesses.filter(
      (weakness) => {
        if (!ailmentFilter.includes(weakness.element) && weakness.condition !== null) {
          return weakness;
        } return null
      })
      .map((weakness, index) =>
        <WeaknessesResistancesSingle weakness={weakness} key={index}/>
      );

    // Groups the current monsters ailment weaknesses together
    const monsterWeaknessAilments = props.weaknesses.filter(
      (weakness) => {
        if (!elementFilter.includes(weakness.element) && weakness.condition === null) {
          return weakness;
        } return null
      })
      .map((weakness, index) =>
        <WeaknessesResistancesSingle weakness={weakness} key={index}/>
      );

    // Groups the current monsters resistances together
    const monsterResistances = props.resistances.filter(weakness => weakness.condition === null).map((weakness, index) =>
      <WeaknessesResistancesSingle weakness={weakness} key={index}/>
    );

    // Groups the current monsters resistances that are triggered with a condition together
    const monsterResistanceConditions = props.resistances.filter(weakness => weakness.condition !== null).map((weakness, index) =>
      <WeaknessesResistancesSingle weakness={weakness} key={index}/>
    );

  // Display each weakness or resistance only if they have one.
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
