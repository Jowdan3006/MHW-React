import React from 'react';

const ArmorPieces = (props) => {
  console.log(`${props.armorTypeCapital}Pieces Render`);

  //retrieve initial data
  if (!props.piecesIsFetching) {
    props.getPiecesFor(props.armorType);
    props.getSkills();
  }

  return (
    <div className={`armorPieces b-shadow-50 ${props.armorType}Pieces`}>
      <h2 className="t-border">Change Equipment</h2>
      <div className="row">
        {/* Display only when fetched */}
        {!props.piecesIsFetched ? <p>Fetching {props.armorType} armor pieces...</p> : !props.skillsIsFetched ? <p>Fetching skill for {props.armorType} armor pieces...</p> : props.getPiecesTiles(props.armorType)}
      </div>
    </div>
  );
}

export default ArmorPieces;
