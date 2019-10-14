import React from 'react';
import ArmorIcon from './ArmorIcon';

const LevelBreakdown = (props) => {
  const types = Object.keys(props.armorSkills);
  let armorIcons = [];
  let armorValues = [];
  types.forEach((type, index) => {
    armorIcons.push(<ArmorIcon key={`Ai-${index}`} piece={{ type: type, rarity: 0 - props.armorSkills[type] }} />)
    armorValues.push(<div key={`Av-${index}`} className={`armorValue t-vertical-middle t-border ${props.armorSkills[type] > 0 ? "armorValueHighlight" : ""}`} >{props.armorSkills[type] > 0 ? props.armorSkills[type] : null}</div>)
  })

  return (
    <div className="levelBreakdown">
      <h5 className="t-border">Level Breakdown</h5>
      <div className="armorIcons">
        <div className="spacer"></div>
        <div className="armorIconsInner">
          {armorIcons}
        </div>
      </div>
      <div className="armorValues">
        <div className="spacer t-border t-vertical-middle">pts</div>
        <div className="armorValuesInner">
          {armorValues}
        </div>
      </div>
    </div>
  );
}

export default LevelBreakdown;
