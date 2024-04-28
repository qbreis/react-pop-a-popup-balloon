import "./CoverScreen.css";
import Button from "../Button/Button";
import Balloon from "../Balloon/Balloon";

export default function CoverScreen({
    onStartGame, 
    gameStarted, 
    score,
    coverScreenTransition,
    coverScreenTopPosition
}) {
    return (
        <div className={`
            intro
            ${(gameStarted || coverScreenTopPosition) ? 'gameStarted' : ''}
            ${coverScreenTransition ? 'coverScreenTransition' : ''}
        `}>
            <div style={{zIndex: 1}}>
                <h1>
                    {score ? 'Game over' : 'Pop a Balloon Game'}
                </h1>
                {score > 0 && (
                    <p>
                        You popped {score} {score > 1 ? 'balloons' : 'balloon'}.
                    </p>
                )}
                <p>
                    A basic balloon game built with React.
                </p>
                <Button onClick={onStartGame}>
                    {score > 0 ? 'Play again' : 'Start Game'}
                </Button>
                <p>
                    Source code and content are available on&nbsp;
                    <a 
                        href="https://github.com/qbreis/react-pop-a-popup-balloon" 
                        rel="noreferrer" 
                        target="_blank"
                        >Github</a>
                    .
                </p>
            </div>
            {/* Add Balloon component */}
            <Balloon color="#9980FA" isActive="true" />
        </div>
    );
}