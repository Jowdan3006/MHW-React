import React from "react";

const Monster = (props) => {
  console.log("Monster Render")
  return (
    <div>
      <img className="w-100" src={`/img/monster/${props.monster.id}.png`} alt="blank" />
      <h3>{props.monster.name}</h3>
    </div>
  );
}

export default Monster;
