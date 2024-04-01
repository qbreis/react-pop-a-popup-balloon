import React, { useState, useRef } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";





// npm install react-transition-group
import { CSSTransition } from 'react-transition-group';

import '../ReactTransitions/ReactTransitions.css';






export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    const nodeRef = useRef(null);

    return (
        <div className="game-container">
            {!gameStarted && (
                <CoverScreen onStartGame={startGame} />
            )}
            <CSSTransition
                in={gameStarted}
                nodeRef={nodeRef}
                timeout={1000}
                classNames="alert"
                unmountOnExit
                // onEnter={() => setShowButton(false)}
                onExited={() => setGameStarted(true)}
            >
                <div
                    className="test"
                    ref={nodeRef}
                    //onClose={() => setShowMessage(false)}
                >
                    <BalloonGrid />
                </div>
            </CSSTransition>




            {/*
                !gameStarted 
                ? 
                (<CoverScreen onStartGame={startGame} />) : ( <BalloonGrid /> )
            */}
        </div>
    );
};


/*
export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="game-container">
            {
            // Conditionally render BalloonGrid or a cover screen based on gameStarted
            }
            {
                !gameStarted 
                ? 
                (<CoverScreen onStartGame={startGame} />) : ( <BalloonGrid /> )
            }
        </div>
    );
};
*/