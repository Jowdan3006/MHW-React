import React from 'react';

const SkillLevelInfo = (props) => {
  let skillLevels = [];
  props.ranks.forEach((rank, index) => {
    let description = rank.description.replace(/([A-Z])/g, '£$1');
    let splitDescription = description.split("£");
    splitDescription.forEach((des, index) => {
      if (index !== 0) {
        splitDescription[index] = <span>{des}<br/></span>;
      } else if(des !== "") {
        splitDescription[index] = <span>{des}</span>;
      }
    })

    skillLevels.push(
      <div key={`Sl-${index}`} className="skillLevel" >
          <div className="level t-border">{`Lv ${rank.level}`}</div>
          <div className={`description t-border ${index + 1 < props.level ? "reached" : index + 1 === props.level ? "current" : ""}`}>{splitDescription}</div>
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
