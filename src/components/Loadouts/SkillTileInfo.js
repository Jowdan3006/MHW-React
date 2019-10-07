import React from 'react';

const SkillTileInfo = (props) => {

  let skillInfo = [];
  for (let i = 1; i <= props.skill.skill.ranks.length; i++) {
    if (i <= props.skill.level) {
      skillInfo.push(<div key={i}>{props.skill}</div>);
    } else {
      skillInfo.push(<div key={i}>{props.skill}</div>);
    }
  }

  return (
    <div className="skillTileInfo">
    </div>
  );
}

export default SkillTileInfo;
