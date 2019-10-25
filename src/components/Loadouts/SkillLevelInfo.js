import React from 'react';

const SkillLevelInfo = (props) => {
  let skillLevels = [];
  props.ranks.forEach((rank, index) => {
    let description = rank.description.replace(/([A-Z])/g, '£$1');

    const blacklistKeywords = [
      {keyword: "£Defense £Down", replace: "Defense Down"},
      {keyword: "£Elemental £Resistances", replace: "Elemental Resistances"},
      {keyword: "£Dragon £Piercer", replace: "Dragon Piercer"},
      {keyword: "£Thousand £Dragons", replace: "Thousand Dragons"},
      {keyword: "£Wyvern's £Fire", replace: "Wyvern's Fire"},
      {keyword: "£Elderseal", replace: "Elderseal"},
      {keyword: "£Bombardier", replace: "Bombardier"},
      {keyword: "£Slinger £Capacity", replace: "Slinger Capacity"},
      {keyword: "£Divine £Blessing", replace: "Divine Blessing"},
      {keyword: "£Latent £Power", replace: "Latent Power"},
      {keyword: "£Artillery", replace: "Artillery"},
      {keyword: "£Free £Element/£Ammo £Up", replace: "Free Element/Ammo Up"},
      {keyword: "£Stamina £Thief", replace: "Stamina Thief"},
      {keyword: "£Free £Meal", replace: "Free Meal"},
      {keyword: "£Slugger", replace: "Slugger"},
      {keyword: "£Maximum £Might", replace: "Maximum Might"},
      {keyword: "£Enables £Leap of £Faith", replace: "Enables Leap of Faith"},
      {keyword: "£Igni £Sign", replace: "Igni Sign"},
      {keyword: "£Palico", replace: "Palico"},
      {keyword: "£Lv", replace: "Lv"},
      {keyword: "(£No", replace: "(No"},
      {keyword: "  ", replace: " "},
    ];
    blacklistKeywords.forEach(keyword => {
      let index = description.indexOf(keyword.keyword);
      if (index > 0) {
        description = description.substring(0, index) + 
        keyword.replace + 
        description.substring(index + keyword.keyword.length, description.length)
      }
    })

    let splitDescription = description.split("£");
    splitDescription.forEach((des, index) => {
      if (index !== 0) {
        splitDescription[index] = <span key={`des-${index}`}>{des}<br/></span>;
      } else if(des !== "") {
        splitDescription[index] = <span key={`des-${index}`}>{des}</span>;
      }
    })
    // console.log(`index: ${index + 1} level: ${props.level} ${index + 1 >= props.level}`);
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
