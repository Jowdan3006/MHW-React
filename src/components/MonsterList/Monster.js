import React from "react";
import { NavLink } from "react-router-dom";


const Monster = (props) => {
  console.log("Monster Render")
  return (
    <NavLink to={`/MonsterList/Monster/${props.monster.id}`}>
      <img className="w-100" src={`/img/monster/${props.monster.id}.png`} alt="blank" />
      <h3>{props.monster.name}</h3>
    </NavLink>
  );
}

export default Monster;
