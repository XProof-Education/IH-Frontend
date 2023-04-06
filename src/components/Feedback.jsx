import React, { useEffect, useState, useCallback } from 'react';
import handleOperation from '../utils/handleOperation';
import Latex from 'react-latex';
import operationsService from '../services/operationsService';
import { Link } from 'react-router-dom';


function Feedback({ operation, imageUrl }) {
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [clouredOperation, setColouredOperation] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [feedBacks, setFeedBacks] = useState(undefined);

    const filterFeedBacks = (feedBacks) => {
        const confidentFeedBacks = feedBacks.filter(elem => elem.confidence > 90);
        if (confidentFeedBacks.length >= 1) {
            return [confidentFeedBacks[0]];
        } else {
            return feedBacks;
        }
    }

    const getFeedback = useCallback(async () => {
        try {
            const response = await operationsService.newOperation({
                prompt: prompt,
                mathLatex: operation.join(' \\\\ '),
                mathLatexSimplified: clouredOperation.join(' \\\\ '),
                cloudinaryPhoto: imageUrl,
                isCorrect: isCorrect
            });
            if (response.newMathOperation.feedBacks) {
                const filteredFeedBacks = filterFeedBacks(response.newMathOperation.feedBacks);
                setFeedBacks(filteredFeedBacks);
            }
        } catch (error) {
            console.error(error);
        }
    }, [prompt, operation, clouredOperation, imageUrl, isCorrect]);

    useEffect(() => {
        const result = handleOperation(operation);
        // const result = operation;
        setIsCorrect(result.isCorrect);
        setColouredOperation(result.operation);
        setPrompt(result.prompt);
    }, [operation]);

    useEffect(() => {
        if (isCorrect !== undefined && clouredOperation !== undefined && prompt !== undefined) {
            getFeedback();
        }
    }, [isCorrect, clouredOperation, prompt, getFeedback]);

    return ( 
        <div>
            {!setColouredOperation && <h2>Loading...</h2>}
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
            {!feedBacks && !isCorrect && <div className='loading-feedback'>
                <p>Figuring out the mistake...</p>
            </div>}
            {feedBacks && <div>
                {feedBacks.length > 1 ? <h3>This is a tricky one... My best guesses are:</h3> : <h3>Here is my guess of what is incorrect</h3>}
                {feedBacks.map((elem, elemIdx) => {
                    return (
                        <p key={elemIdx}>{elem.text}</p>
                    )
                })}
            </div>}
            {clouredOperation && <div>
                <button><Link to={'/camera'}>Take another photo</Link></button>
                <button><Link to={'/'}>Home</Link></button>
            </div>}
        </div>
     );
}

export default Feedback;