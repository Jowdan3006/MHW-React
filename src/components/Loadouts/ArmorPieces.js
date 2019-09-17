import React from 'react';

const ArmorPieces = (props) => {
  console.log(`${props.armorTypeCapital}Pieces Render`);


  //retrieve initial data
  if (!props.PiecesIsFetching) {
    props.getPiecesFor(props.armorType);
    props.getSkills();
  }

  return (
    <div className={`armorPieces b-shadow-50 ${props.armorType}Pieces`}>
      <form>
        <input className="mr-sm-2" placeholder="Search" aria-label="Search" type="text" value={props.value} onChange={props.searchField} />
      </form>
      <h2 className="t-border">Change Equipment</h2>
      <div className="row">
        {/* Display only when fetched */}
        {!props.PiecesIsFetched ? <p>Fetching {props.armorType} armor pieces...</p> : props.skillsIsFetched ? <p>Fetching skill for {props.armorType} armor pieces...</p> : props.getPiecesTiles(props.armorType)}
      </div>
    </div>
  );
}

export default ArmorPieces;
