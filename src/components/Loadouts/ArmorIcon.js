import React from 'react';

import SkillTile from './SkillTile';

const ArmorIcon = (props) => {
  // console.log("ArmorIcon Render");

  // Sets the armor icon the correct armor type
  let armorIcon = null;
  switch (props.piece.type) {
    case "head":
      armorIcon = <span>&#xe910;<span>&#xe911;</span></span>;
      break;
    case "chest":
      armorIcon = <span>&#xe90e;<span>&#xe90f;</span></span>;
      break;
    case "gloves":
      armorIcon = <span>&#xe900;<span>&#xe901;</span></span>;
      break;
    case "waist":
      armorIcon = <span>&#xe914;<span>&#xe915;</span></span>;
      break;
    case "legs":
      armorIcon = <span>&#xe912;<span>&#xe913;</span></span>;
      break;
    default:
      break;
  }

  let equipped = '';
  if (props.equipped !== undefined && props.equipped !== null) {
    if (props.equipped.id === props.piece.id) {
      equipped = <span className="currentEquipped t-border">E</span>;
    }
  }

  let pieceTileInfo = [];
  if (props.piece.name !== undefined && props.piece.name !== null && props.skills.length !== 0) {
    let skillTiles = [];
    props.piece.skills.forEach((skill, index) => {
      let currentSkill = props.skills.filter(skillFull => skillFull.id === skill.skill)[0];
      // currentSkill.level = skill.level;
      skillTiles.push(
        <SkillTile key={index} skill={{id: currentSkill.id, level: skill.level, skill: currentSkill.skill}} />
      );
    });
    pieceTileInfo =
      <div className="pieceTileInfo">
        <div className="armorPieceSkills">
          {skillTiles}
        </div>
      </div>;
  }


  return (
    <span className={`armorIcon tri-border rarity-${props.piece.rarity}`}>
      {armorIcon}
      {equipped}
      {pieceTileInfo}
    </span>
  );
}

export default ArmorIcon;
