import React from 'react';

import ArmorIcon from './ArmorIcon';

const PieceTile = (props) => {
  console.log("PieceTile Render");

  // Changes Alpha, Beta, Gamma to their respective symbol
  let name = props.piece.name;
  if (props.piece.name.includes("Alpha")) {
    name = props.piece.name.substring(0, props.piece.name.length - 5) + "α";
  } else if (props.piece.name.includes("Beta")) {
    name = props.piece.name.substring(0, props.piece.name.length - 4) + "β";
  } else if (props.piece.name.includes("Gamma")) {
    name = props.piece.name.substring(0, props.piece.name.length - 5) + "γ";
  };

  return (
    <div className="pieceTile col-6 col-sm-4 col-md-3 col-lg-2">
      <p>{name}</p>
      <form>
        <ArmorIcon piece={props.piece} equipped={props.equipped} skills={props.skills} equipArmor={props.equipArmor} />
        <button type="button" className="btn tri-border btn-sm" value={props.piece.type} onClick={props.equipArmor}>Equip</button>
      </form>
    </div>
  );
}

export default PieceTile;
