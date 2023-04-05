import React from "react";
import { Link } from "react-router-dom";


const ListCard = ({ props, typeData }) => {
  return (
    <div>
      {props.map((prop) => {
        return (
          <div key={prop._id}>
            <Link to={typeData === 'exercises'
              ? `/exercises/${prop._id}`
              : typeData === 'studentExercises'
              ? `/exercises/${prop.exerciseId._id}`
              : `/operations/${prop._id}`}>
              <img style={{ width: "100%" }} src={typeData === 'operations'
                ? prop.cloudinaryPhoto
                : typeData === 'studentExercises'
                ? prop.exerciseId.exerciseFile
                : prop.exerciseFile} alt="exercise" />
            </Link>
          </div>
        );
      })
      }
    </div>
  );
}

export default ListCard;