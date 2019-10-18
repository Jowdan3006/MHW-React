import React from 'react';

const SkillLevelInfo = (props) => {
  let skillLevels = [];
  props.ranks.forEach((rank, index) => {
    let description = rank.description.replace(/([A-Z])/g, '£$1');
    let splitDescription = description.split("£");
    splitDescription.forEach((des, index) => {
      if (index !== 0) {
        splitDescription[index] = <span key={`des-${index}`}>{des}<br/></span>;
      } else if(des !== "") {
        splitDescription[index] = <span key={`des-${index}`}>{des}</span>;
      }
    })
    console.log(`index: ${index + 1} level: ${props.level} ${index + 1 >= props.level}`);
    let foo = "";
    let currentLevel = props.level > props.ranks.length ? props.ranks.length : props.level;

    if (index + 1 <= currentLevel) {
      if (index + 1 === currentLevel) {
        foo = "current"
      } else {
        foo = "reached";
      }
    }

    skillLevels.push(
      <div key={`Sl-${index}`} className="skillLevel" >
          <div className="level t-border">{`Lv ${rank.level}`}</div>
          <div className={`description t-border ${foo}`}>{splitDescription}</div>
      </div>
    )
  })
  return (
    <div className="skillLevelInfo">
      <h5 className="t-border">Skill Level</h5>
      <div className="skillLevels">
        {skillLevels}
      </div>
    </div>
  );
}

export default SkillLevelInfo;
