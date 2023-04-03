import React from "react";
import { Link } from "react-router-dom";


const ListCard = ({ props, typeData }) => {
  return (
    <div>
      {props.map((prop) => {
        return (
          <div key={prop._id}>
            <Link to={typeData === 'operations' ? `/operation/${prop._id}`:`/exercises/${prop._id}`}><img style={{ width: "100%" }} src={typeData === 'operations' ? prop.cloudinaryPhoto : prop.exerciseFile} alt="exercise" /></Link>
          </div>
        );
      })
      }
    </div>
  );
}

export default ListCard;