import React from 'react';

import ArmorIcon from './ArmorIcon';

const PieceTile = (props) => {
  console.log("PieceTile Render");

  // Changes Alpha, Beta, Gamma to their respective symbol
  let name = props.updatedArmorName(props.piece.name);

  return (
    <div className="pieceTile col-6 col-sm-4 col-md-3 col-lg-2">
      <p>{name}</p>
      <form>
        <ArmorIcon piece={props.piece} equipped={props.equipped} skills={props.skills} equipArmor={() => props.equipArmor(props.piece)} />
        <button type="button" className="btn tri-border btn-sm" value={props.piece.type} onClick={() => props.equipArmor(props.piece)}>Equip</button>
      </form>
    </div>
  );
}

export default PieceTile;
