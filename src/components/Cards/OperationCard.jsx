import React, { useState, useEffect } from "react";
import Button from "../Button";
import Latex from "react-latex";
import './cards.css';


const OperationCard = (props) => {
  const { operation, handleDelete, isCompletion } = props;
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (operation && operation.mathLatexSimplified) {
      setLines(operation.mathLatexSimplified.split('\\\\'));
    }
  }, [operation]);

  return (
    <div className={operation && operation.isCorrect ? "operation-detail-container" : "operation-detail-container-red"}>
      {!isCompletion && <div className="title-div">
        <h1 className="title-style-yellow">Operation detail</h1>
      </div>}
      {operation &&
        <div className='equation'>
          <div className="latex-container">
            {lines.map((line, index) => (
              <div key={index} className="equation-latex">
                <Latex>{`$$${line}$$`}</Latex>
              </div>
            ))}
          </div>
          {operation.isCorrect
            ? <div className='operation-feedback'>
              <p>This operation is correct. Good job!</p>
            </div>
            : <div className='operation-feedback'>
              <p>{operation.feedBacks[0].text}</p>
            </div>}
        </div>
      }
      {handleDelete && <div className="button-container">
        <Button color="pink" action={handleDelete}>Delete</Button>
      </div>}
    </div>
  );
}

export default OperationCard;