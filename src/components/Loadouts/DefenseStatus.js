import React from 'react';

const DefenseStatus = (props) => {

  let resistances = [];
  props.resistances.forEach((resistance, index) => {
    resistances.push(
      <div key={index} className="status t-border"><img src={`/img/general/${resistance.name}.svg`} alt={resistance.name} /><span className="t-border">Vs. {resistance.name}</span>{resistance.value}
        {props.baseDefense === undefined ? "" :
          <div className="statusBreakdown b-shadow-75">
            <div>Base Resistance<span>{resistance.base}</span></div>
            <div>Skill Resistance<span>{resistance.value - resistance.base}</span></div>
          </div>
        }
      </div>
    )
  });
  return (
    <div className="statusPane">
      <div><h5 className="t-border">Defense Status</h5></div>
      <div className="status t-border"><img src={`/img/general/defense.svg`} alt="defense" /><span className="t-border">Defense</span>{props.defense}
        {props.baseDefense === undefined ? "" :
          <div className="statusBreakdown b-shadow-75">
            <div>Base Defense<span>{props.baseDefense}</span></div>
            <div>Skill Defense<span>{props.defense - props.baseDefense}</span></div>
          </div>
        }
      </div>    
      {resistances}  
    </div>
  );
}

export default DefenseStatus;
