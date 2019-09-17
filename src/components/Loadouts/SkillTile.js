import React from 'react';

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
      <div className="skillContent b-shadow-75">
        <span className="skillIcon">
          &#xe90a;<span>&#xe90b;</span><span>&#xe90c;</span><span>&#xe90d;</span>
        </span>
        <div className="skillInfo">
          <p className="t-border">{props.skill.skill.name}</p>
          <div className="skillBar">
            <div className="skillBarIcons">{skillLevelImg}</div>
            <p className="t-border">Level&nbsp;{props.skill.level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillTile;