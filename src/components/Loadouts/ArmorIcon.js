import React from 'react';

import SkillTile from './SkillTile';
import DefenseStatus from './DefenseStatus';

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

  let equipped = false;
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
      <div className="pieceTileInfo b-shadow-75">
        <div className="armorPieceSkills">
          {skillTiles}
          <DefenseStatus 
            defense={props.piece.defense.base}
            resistances={[
              {name: 'Fire', value: props.piece.resistances.fire},
              {name: 'Water', value: props.piece.resistances.water},
              {name: 'Thunder', value: props.piece.resistances.thunder},
              {name: 'Ice', value: props.piece.resistances.ice},
              {name: 'Dragon', value: props.piece.resistances.dragon}
            ]}
          />
        </div>
      </div>;
  }

  return (
    <div className={`armorIcon tri-border rarity-${props.piece.rarity}`} onClick={props.equipArmor ? props.equipArmor : null}>
      {armorIcon}
      {equipped}
      {pieceTileInfo}
    </div>
  );
}

export default ArmorIcon;
