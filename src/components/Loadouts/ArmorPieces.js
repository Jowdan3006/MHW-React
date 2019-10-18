import React from 'react';

import Pagination from 'react-bootstrap/Pagination';

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

  let paginatedContent = []
  let pagination = [];
  if (Array.isArray(content)) {
    let count = content.length;
    const page = props.pieceTilePagination;
    const maxTiles = 24;
    const pages = Math.ceil(count / maxTiles)
    for (let i = ((page - 1) * maxTiles) + 1; i > (page - 1) * maxTiles && i <= page * maxTiles && i <= count; i++) {
      paginatedContent.push(content[i-1]);
    }
    for (let i = 1; i <= pages; i++) {
      pagination.push(
        <Pagination.Item key={`page-${i}`} active={i === page} onClick={() => props.updatedPieceTilePagination(i)} />
      )
    }
  }

  return (
    <div className={`armorPieces b-shadow-50 ${props.armorType}Pieces`}>
      <h2 className="t-border">Change Equipment</h2>
      <div className="row">
        {/* Display only when fetched */}
        {/* {content} */}
        {Array.isArray(content) ? paginatedContent : content}
      </div>
      {Array.isArray(content) ? <Pagination>{pagination}</Pagination> : null}
    </div>
  );
}

export default ArmorPieces;
