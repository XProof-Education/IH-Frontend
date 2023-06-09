import React, { useState, useEffect } from "react";
import Button from "../Button";
import Latex from "react-latex";
import './cards.css';


const OperationCard = (props) => {
  const { operation, handleDelete, isCompletion } = props;
  const [lines, setLines] = useState([]);
  const [divClassName, setDivClassName] = useState(undefined);

  useEffect(() => {
    if (operation && operation.mathLatexSimplified) {
      setLines(operation.mathLatexSimplified.split('\\\\'));
    }
    let divClass = '';
    if (operation && operation.isCorrect) {
      divClass += 'operation-detail-container';
    } else {
      divClass += 'operation-detail-container-red'
    }
    if (isCompletion) {
      divClass += ' completion-height';
    }
    setDivClassName(divClass);
    // eslint-disable-next-line
  }, [operation]);

  return (
    <div className={operation && divClassName}>
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