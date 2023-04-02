import React from "react";
import { Link } from "react-router-dom";


const ListCard = ({ props }) => {
  return (
    <div>
      {props.map((prop) => {
        return (
          <div key={prop._id}>
            <Link to={`/exercises/${prop._id}`}><img style={{ width: "100%" }} src={prop.exerciseFile} alt="exercise" /></Link>
          </div>
        );
      })
      }
    </div>
  );
}

export default ListCard;