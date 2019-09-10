import React from "react";

const Monster = (props) => {
  return (
    <div className="col-3">
      <img className="img-fluid" src={`/img/monster/${props.monster.id}.png`} alt="blank"/>
      <h3>{props.monster.name}</h3>
    </div>
  );
}

export default Monster;
