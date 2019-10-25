import React from 'react';

const SkillIcon = (props) => {

  return (
    <span className={`skillIcon skill-${props.Id}`}>
      &#xe90a;<span className="skillIconInner">&#xe90b;</span><span className="skillIconInner">&#xe90c;</span><span className="skillIconInner">&#xe90d;</span>
    </span>
  );
}

export default SkillIcon;
