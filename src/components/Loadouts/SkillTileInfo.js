import React from 'react';

import LevelBreakdown from './LevelBreakdown';
import SkillLevelInfo from './SkillLevelInfo';

const SkillTileInfo = (props) => {
  return (
    <div className="skillTileInfo b-shadow-100-darkerGrey">
      <div className="skillIconBackground"></div>
      <div className="skillName t-border">{props.skill.skill.name}</div>
      <div className="skillDesc t-border">{props.skill.skill.description}</div>
      {props.skill.armorSkills !== undefined? <LevelBreakdown armorSkills={props.skill.armorSkills}/> : null}
      <SkillLevelInfo level={props.skill.level} ranks={props.skill.skill.ranks} />
    </div>
  );
}

export default SkillTileInfo;
