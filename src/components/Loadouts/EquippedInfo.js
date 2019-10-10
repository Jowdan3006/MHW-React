import React from 'react';

import Col from 'react-bootstrap/Col';

import DefenseStatus from './DefenseStatus';

const EquippedInfo = (props) => {

  return (
    <Col sm={4} className="equippedInfo t-border">
      <div className="equippedHeader t-border">
        Status
      </div>
      <div className="statusPane">
        <div className="status t-border"><span className="healthIcon" /><span className="t-border">Health</span>{props.equippedInfo.health}</div>  
        <div className="status t-border"><span className="staminaIcon" /><span className="t-border">Stamina</span>{props.equippedInfo.stamina}</div>  
      </div>
      <div className="statusPane">
        <div><h5 className="t-border">Attack Status</h5></div>
        <div className="status t-border"><img src={`/img/general/attack.svg`} alt="defense" /><span className="t-border">Attack</span>999</div>  
      </div>
      <DefenseStatus
      defense={props.equippedInfo.defense}
      baseDefense={props.equippedInfo.baseDefense}
      resistances={[
        {name: 'Fire', value: props.equippedInfo.resistances.fire, base: props.equippedInfo.resistances.fireBase},
        {name: 'Water', value: props.equippedInfo.resistances.water, base: props.equippedInfo.resistances.waterBase},
        {name: 'Thunder', value: props.equippedInfo.resistances.thunder, base: props.equippedInfo.resistances.thunderBase},
        {name: 'Ice', value: props.equippedInfo.resistances.ice, base: props.equippedInfo.resistances.iceBase},
        {name: 'Dragon', value: props.equippedInfo.resistances.dragon, base: props.equippedInfo.resistances.dragonBase}
      ]}
      />
    </Col>
  )
}

export default EquippedInfo;
