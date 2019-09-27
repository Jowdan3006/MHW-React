import React from "react";
import WeaknessesResistances from "./WeaknessesResistances";

const MonsterFull = (props) => {
  console.log("MonsterFull Render")

  const monsterData = props.getMonsterDataById(props.match.params.id);
  console.log(monsterData)

  return(
    <div className="row monsterFull">
      <div className="col-4">
        <img className="w-100" src={`/img/monster/${monsterData.id}.png`} alt="blank" />
      </div>
      <div className="col-8">
        <h4>{monsterData.name}</h4>
        <p>{monsterData.description}</p>
        <WeaknessesResistances weaknesses={monsterData.weaknesses} resistances={monsterData.resistances}/>
      </div>
    </div>
  )
}

export default MonsterFull;
