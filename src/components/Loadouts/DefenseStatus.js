import React from 'react';

const DefenseStatus = (props) => {

  let resistances = [];
  props.resistances.forEach(resistance => {
    resistances.push(
      <div className="status"><img src={`/img/general/${resistance.name}.svg`} alt={resistance.name} /><span>Vs. {resistance.name}</span>{resistance.value}</div>
    )
  });
  return (
    <div className="defenseStatus">
      <div><h5 className="t-border">Defense Status</h5></div>
      <div className="status t-border"><img src={`/img/general/defense.svg`} alt="defense" /><span className="t-border">Defense</span>{props.defense}</div>    
      {resistances}  
    </div>
  );
}

export default DefenseStatus;
