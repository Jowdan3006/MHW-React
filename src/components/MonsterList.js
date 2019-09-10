import React from "react";
import Monster from "./Monster";

const MonsterList = (props) => {

  const monstersDataArray = props.data;
  let MonsterArray = monstersDataArray.filter(monster => monster.type == "large").map(monster =>
    <Monster monster={monster} />
  );

  return (
    <div className="container">
      <div className="row">
        {MonsterArray}
      </div>
    </div>
  );
}

export default MonsterList;
