import React from "react";
import Button from "../Button";
import Latex from "react-latex";


const OperationCard = (props) => {
  const { operation, handleDelete } = props;
  return (
    <div className={operation && operation.isCorrect ? "operation-detail-container" : "operation-detail-container-red"}>
      <div className="title-div">
        <h1 className="title-style-yellow">Operation detail</h1>
      </div>
      {operation &&
        <div className='equation'>
          <Latex>{`$$${operation.mathLatexSimplified}$$`}</Latex>
          {operation.isCorrect
            ? <div className='operation-feedback'>
              <p>This operation is correct. Good job!</p>
            </div>
            : <div className='operation-feedback'>
              <p>{operation.feedBacks[0].text}</p>
            </div>}
        </div>
      }
      <div className="button-container">
        <Button color="pink" action={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default OperationCard;