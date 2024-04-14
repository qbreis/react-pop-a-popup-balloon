import calculateSeconds from "../../utils/calculateSeconds";

export default function GameScore({time, delay}) {
    return (
        <div className="game-score">
            {
            calculateSeconds(time, delay)
            }s remaining
        </div>
    );
};

