import React from 'react';

const ArmorPieces = (props) => {
  console.log("HeadPieces Render");
  if (!props.PiecesIsFetching) {
    props.getPiecesFor(props.armorType);
  }

  return (
    <div className={`${props.armorType}Pieces`}>
      <form>
        <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text" value={props.value} onChange={props.searchField} />
      </form>
      <div className="row">
        {!props.PiecesIsFetched ? "Fetching..." : props.getPiecesTiles(props.armorType)}
      </div>
    </div>
  );
}

export default ArmorPieces;