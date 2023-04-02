import React, { useEffect, useState, useCallback } from 'react';
import handleOperation from '../utils/handleSteps';
import Latex from 'react-latex';
import operationsService from '../services/operationsService';


function Feedback({ operation, imageUrl }) {
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [clouredOperation, setColouredOperation] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [feedBacks, setFeedBacks] = useState(undefined);

    const getFeedback = useCallback(async () => {
        try {
            const mathOperation = await operationsService.newOperation({
                prompt: prompt,
                mathLatex: operation.join(' \\\\ '),
                mathLatexSimplified: clouredOperation.join(' \\\\ '),
                cloudinaryPhoto: imageUrl
            });
            console.log(mathOperation.feedBacks);
            setFeedBacks(mathOperation.feedBacks);
        } catch (error) {
            console.error(error);
        }
    }, [prompt, operation, clouredOperation, imageUrl]);

    useEffect(() => {
        const result = handleOperation(operation);
        setIsCorrect(result.isCorrect);
        setColouredOperation(result.operation);
        setPrompt(result.prompt);
    }, [operation]);

    useEffect(() => {
        if (!isCorrect && clouredOperation !== undefined && prompt !== undefined) {
            getFeedback();
        }
    }, [isCorrect, clouredOperation, prompt, getFeedback]);

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
            {feedBacks && <div>
                <h3>Here is my guess of what is incorrect</h3>
                {feedBacks.map((elem, elemIdx) => {
                    return (
                        <p key={elemIdx}>{elem.text}</p>
                    )
                })}
            </div>}
        </div>
     );
}

export default Feedback;