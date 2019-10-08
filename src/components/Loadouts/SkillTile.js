import React from 'react';

import SkillTileInfo from './SkillTileInfo';

const SkillTile = (props) => {
  // console.log('SkillTile Render');

  let skillLevelImg = [];
  for (let i = 1; i <= props.skill.skill.ranks.length; i++) {
    if (i <= props.skill.level) {
      skillLevelImg.push(<img key={i} src="/img/general/Skill-fill.png" alt="Active skill"/>);
    } else {
      skillLevelImg.push(<img key={i} src="/img/general/Skill-empty.png" alt="Inactive skill"/>);
    }
  }
  return (
    <div className="skillTile">
      <div className="skillContent">
        <span className={`skillIcon skill-${props.skill.skill.id}`}>
          &#xe90a;<span>&#xe90b;</span><span>&#xe90c;</span><span>&#xe90d;</span>
          <SkillTileInfo skill={props.skill} />
        </span>
        <div className="skillInfo">
          <p className="t-border">{props.skill.skill.name}</p>
          <div className="skillBar">
            <div className="skillBarIcons">{skillLevelImg}</div>
            <p className="t-border">Level {props.skill.level > props.skill.skill.ranks.length ? <span className="skillOver">{props.skill.level}</span> : 
              props.skill.level === props.skill.skill.ranks.length ? <span className="skillCap">{props.skill.level}</span> : props.skill.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillTile;
