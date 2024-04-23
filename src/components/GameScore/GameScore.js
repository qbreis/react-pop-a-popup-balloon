import "./GameScore.css";
export default function GameScore({score}) {
    return (
        <div className="game-score">
            Score: {score}
        </div>
    );
};