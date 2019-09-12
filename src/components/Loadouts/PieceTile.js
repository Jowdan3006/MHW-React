import React from 'react';

const PieceTile = (props) => {
  console.log("PieceTile Render");
  let name = props.name;
  if (props.name.includes("Alpha")) {
    name = props.name.substring(0, props.name.length - 5) + "α";
  } else if (props.name.includes("Beta")) {
    name = props.name.substring(0, props.name.length - 4) + "β";
  } else if (props.name.includes("Gamma")) {
    name = props.name.substring(0, props.name.length - 5) + "γ";
  };
  let armorIcon = null;
  switch (props.type) {
    case "head":
      armorIcon = <span>&#xe910;<span>&#xe911;</span></span>;
      break;
    case "chest":
      armorIcon = <span>&#xe90e;<span>&#xe90f;</span></span>;
      break;
    case "gloves":
      armorIcon = <span>&#xe900;<span>&#xe901;</span></span>;
      break;
    case "waist":
      armorIcon = <span>&#xe914;<span>&#xe915;</span></span>;
      break;
    case "legs":
      armorIcon = <span>&#xe912;<span>&#xe913;</span></span>;
      break;
    default:
      break;
  }
  return (
    <div className="col-2">
      <div>{name}</div>
      <div className={`rarity rarity-${props.rarity}`}>{armorIcon}</div>
      <form>
        <button type="button" className="btn btn-primary btn-sm" value={props.value} onChange={props.equiparmor(event, props.key)}>Equip</button>
      </form>
    </div>
  );
}

export default PieceTile;