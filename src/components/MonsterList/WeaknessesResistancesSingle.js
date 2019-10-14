import React from "react";

const Weaknesses = (props) => {
  console.log("Weakness Render");
  const getstars = () => {
      let stars = props.weakness.stars === undefined ? <i className="fas fa-times"></i> : [];
      for (let i = 0; i < props.weakness.stars; i++) {
        stars.push(<i className="fas fa-star" key={i}></i>);
      }
      return stars;
  }
  const stars = getstars();
  return(
    <li className={props.weakness.element}>
      <img src={`/img/general/${props.weakness.element}.svg`} alt="blank" />
      {props.weakness.element + (props.weakness.condition === null ? "" : ` when ${props.weakness.condition}`)}
      {stars}
    </li>
  );
}

export default Weaknesses;
