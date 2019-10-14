import React from 'react';

const ArmorPieces = (props) => {
  console.log(`${props.armorTypeCapital}Pieces Render`);

  //retrieve initial data
  if (!props.piecesIsFetching && !props.piecesIsFetched) {
    props.getPiecesFor(props.armorType);
  }

  if (props.piecesIsFetched && !props.skillsIsFetching && !props.skillsIsFetched) {
    props.getSkills();
  }

  let content;
  if (props.piecesIsFetching) {
    if (!props.piecesIsFetched) {
      content = <p>Fetching {props.armorType} armor pieces...</p>;
    } else if (props.piecesIsFetched && !props.skillsIsFetched) {
      content = <p>Fetched {props.armorType} armor pieces > Fetching skill for armor pieces...</p>
    } else {
      content = <p>Fetched {props.armorType} armor pieces > Fetched skills > Processing {props.armorType} armor pieces</p>
    }
  } else {
    content = props.getPiecesTiles(props.armorType)
  }

  return (
    <div className={`armorPieces b-shadow-50 ${props.armorType}Pieces`}>
      <h2 className="t-border">Change Equipment</h2>
      <div className="row">
        {/* Display only when fetched */}
        {content}
      </div>
    </div>
  );
}

export default ArmorPieces;
