import React from 'react';

import SkillTile from './SkillTile';

const EquippedSkills = (props) => {

  let skillTiles = [];
  props.skills.forEach((skill, index) => {
    if (skill.level !== 0) {
      skillTiles.push(<SkillTile key={index} skill={skill} />);
    }
  })

  return (
    <div className="equippedSkills col-sm-6">
      <h2>Skills</h2>
      {skillTiles}
    </div>
  );
}

export default EquippedSkills;
