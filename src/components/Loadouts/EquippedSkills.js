import React from 'react';

import SkillTile from './SkillTile';
import Pagination from 'react-bootstrap/Pagination';

const EquippedSkills = (props) => {

  let skillTiles = [];
  props.getEquippedSkills().forEach((skill, index) => {
    skillTiles.push(<SkillTile key={index} skill={skill} />);
  })

  const number = 5;
  let page = props.page;
  let pages = Math.ceil(skillTiles.length / number);
  let skillTilesPaginated = [];
  let pagination = [];

  for (let i = 1; i <= pages; i++) {
    let pageOffset = (i-1)*number; 
    let currentSkillTiles = [];
    for (let x = 0; x < number &&  (pageOffset + x) < skillTiles.length; x++) {
      currentSkillTiles.push(skillTiles[(pageOffset + x)]);
    }
    skillTilesPaginated.push(currentSkillTiles);
    
    pagination.push(
      <Pagination.Item key={`page-${i}`} active={i === page} onClick={i === page ? null : () => props.updatedEquippedSkillTilesPagination(i)} />
    )
  }

  return (
    <div className="equippedSkills col-sm-4 b-shadow-50-green">
      <div className="equippedHeader t-border">
        Skills
      </div>
      {skillTilesPaginated[page - 1]}
      <Pagination>{pagination}</Pagination>
    </div>
  );
}

export default EquippedSkills;
