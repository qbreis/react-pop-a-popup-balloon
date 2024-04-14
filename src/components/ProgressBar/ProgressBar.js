import calculateSeconds from "../../utils/calculateSeconds";
import "./ProgressBar.css";

export default function ProgressBar({time, delay}) {
    return (
        <div className="progress-bar">
            <div className="remaining-time" style={{
                width: '70%'
            }}></div>
            {
            calculateSeconds(time, delay)
            }s remaining
        </div>
    );
};

