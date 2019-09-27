import React from 'react';

import SkillTile from './SkillTile';

const EquippedSkills = (props) => {

  let skillTiles = [];
  props.getEquippedSkills().forEach((skill, index) => {
    skillTiles.push(<SkillTile key={index} skill={skill} />);
  })

  return (
    <div className="equippedSkills col-sm-4 b-shadow-50-green">
      <div className="equippedHeader t-border">
        Skills
      </div>
      {skillTiles}
    </div>
  );
}

export default EquippedSkills;
