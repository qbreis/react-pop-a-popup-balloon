import "./CoverScreen.css";
import Button from "../Button/Button";

export default function CoverScreen({onStartGame, gameStarted, coverScreenTransition



    ,coverScreenTopPosition




}) {
    return (
        <div className={`
            intro
            ${(
                gameStarted
                ||
                // Assign `gameStarted` as a class name to `intro` (or not) depending also on `coverScreenTopPosition` value.
                coverScreenTopPosition 
            ) ? 'gameStarted' : ''}
            ${coverScreenTransition ? 'coverScreenTransition' : ''}
        `}>
            <div>
                <h1>Pop a Balloon Game</h1>
                <p>
                    A basic balloon game built with React.
                </p>
                <Button onClick={onStartGame}>
                    Start Game
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
        </div>
    );
}