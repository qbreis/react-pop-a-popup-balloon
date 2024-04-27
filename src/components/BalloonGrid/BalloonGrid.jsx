import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
// Import GameScore component
import GameScore from "../GameScore/GameScore";
import "./BalloonGrid.css";

export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,
        numberOfBalloons,
        timeRemaining,
        gameTimeDelay,
        gameDuration,
        onBalloonClick,
        activeBalloons,
        score,
        balloonToggleTransition,
        balloonPoppingTransition,

        coinCounterDelay
    }
) {
    const handleBalloonClick = (index) => {
        if (onBalloonClick) {
            onBalloonClick(index);
        }
    };

    const balloons = [];
    for (let i = 0; i < numberOfBalloons; i++) {
        balloons.push(
            <Balloon
                key={i}
                color="#9980FA"
                isActive={activeBalloons.includes(i)}
                onClick={() => handleBalloonClick(i)}
                balloonToggleTransition={balloonToggleTransition}
                balloonPoppingTransition={balloonPoppingTransition}

                coinCounterDelay={coinCounterDelay}
            />
        );
    }

    return (
        <div className={`
            balloon-grid-wrapper
            ${gameStarted ? 'gameStarted' : ''}
            ${gameScreenStartTransition ? 'gameScreenStartTransition' : ''}
            `}>
            <div className="game-header">
                <p className="balloon-grid-caption">
                    Click a balloon!
                </p>

                {/* New GameScore component */}
                <GameScore score={score} />
                
                <ProgressBar time={timeRemaining} delay={gameTimeDelay} gameDuration={gameDuration} />
                <Button onClick={onStopGame}>
                    Stop
                </Button>
            </div>
            <div className="balloon-grid">
                {balloons}
            </div>
        </div>
    );
}