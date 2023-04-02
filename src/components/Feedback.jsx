import React, { useEffect, useState } from 'react';
import handleOperation from '../utils/handleSteps';
import Latex from 'react-latex';


function Feedback({ latexArr, imageUrl }) {
    const [isCorrect, setIsCorrect] = useState();
    const [clouredOperation, setColouredOperation] = useState(null);

    useEffect(() => {
        const result = handleOperation(latexArr);
        setIsCorrect(result.isCorrect);
        setColouredOperation(result.operation);
    },[]);
    return ( 
        <div>
            {clouredOperation && <div>
                {isCorrect ? <h2>It is correct</h2> : <h2>There is a mistake</h2>}
                {clouredOperation.map((elem, idx) => {
                    return (
                        <div className='equation' key={idx}>
                            <Latex>{`$$${elem}$$`}</Latex>
                        </div>
                    );
                })}
            </div>}
        </div>
     );
}

export default Feedback;