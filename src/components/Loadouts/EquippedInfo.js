import React from 'react';

import Col from 'react-bootstrap/Col';

import DefenseStatus from './DefenseStatus';

const EquippedInfo = (props) => {

  return (
    <Col sm={4} className="equippedInfo t-border">
      <DefenseStatus
      defense={props.equippedInfo.defense}
      resistances={[
        {name: 'Fire', value: props.equippedInfo.resistances.fire},
        {name: 'Water', value: props.equippedInfo.resistances.water},
        {name: 'Thunder', value: props.equippedInfo.resistances.thunder},
        {name: 'Ice', value: props.equippedInfo.resistances.ice},
        {name: 'Dragon', value: props.equippedInfo.resistances.dragon}
      ]}
      />
    </Col>
  )
}

export default EquippedInfo;
