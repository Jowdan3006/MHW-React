import React from 'react';
import ArmorIcon from './ArmorIcon';

import Col from 'react-bootstrap/Col';

const EquippedArmor = (props) => {

  let equippedArmorImage = [];
  // let capitalGender = props.gender.charAt(0).toUpperCase() + props.gender.slice(1);

  // Sets the equippedArmorImage array to an array of images checking if the image url in the current piece is valid.
  Object.keys(props.equippedArmor).forEach(
    armor => {
      if (props.equippedArmor[armor] !== null) {
        equippedArmorImage.push(
          <span key={armor} className="equippedPiece">
            <ArmorIcon piece={props.equippedArmor[armor]} skills={props.skills} />
            <p className="t-border">{props.updatedArmorName(props.equippedArmor[armor].name)}</p>
          </span>
        );
      } else {
        equippedArmorImage.push(
          <div key={armor} className="equippedPiece">
            <ArmorIcon piece={{type: armor, rarity: 1}} />
          </div>
        );     
      }
      // if (props.equippedArmor[armor] === null || props.equippedArmor[armor].assets === null || props.equippedArmor[armor].assets["image" + capitalGender] === "https://assets.mhw-db.com/armor/9067d30515d01c6739160f65c680f49c12bf0c06.d20ffa258ec987a3638a7f6bb4c63761.png") {
      //   equippedArmorImage.push(
      //     <span key={armor} className={`${armor}Piece`}>
      //       <img src={`/img/armor/placeholder_${armor}_${props.gender}.png`} alt={`Missing ${armor} armor`} />
      //     </span>
      //   )
      // } else {
      //   equippedArmorImage.push(
      //     <div key={armor} className={`${armor}Piece`}>              
      //       <img src={props.equippedArmor[armor].assets["image" + capitalGender]} alt={`${armor} armor`} />
      //       <div>{props.equippedArmor[armor].name}</div>
      //     </div>
      //   );
      // }
    }
  );

  return (
    <Col sm={4} className="equippedArmor">
      <div className="equippedHeader t-border">
        Equipped Armor
      </div>
      {equippedArmorImage}
    </Col>
  )
}

export default EquippedArmor;
