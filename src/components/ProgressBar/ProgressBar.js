import calculateSeconds from "../../utils/calculateSeconds";
import "./ProgressBar.css";

export default function ProgressBar({time, delay, gameDuration}) {
    const percentageRemaining = (time / gameDuration) * 100;
    const className = getClassName(percentageRemaining);

    return (
        <div className={className}>
            <div className="remaining-time" style={{
                width: `calc( 
                    (100% * ${time})
                    /
                    ${gameDuration}
                )`
            }}></div>
            <div className="remaining-time-in-seconds">
                {
                calculateSeconds(time, delay)
                }s ({percentageRemaining.toFixed(0)}%) remaining 
            </div>
            
        </div>
    );
};

function getClassName(percentageRemaining) {
    let className = "progress-bar";
    if (percentageRemaining < 50) {
        className += " less-than-half";
    }
    if (percentageRemaining < 20) {
        className += " less-than-20-percent";
    }
    if (percentageRemaining < 10) {
        className += " less-than-10-percent";
    }
    return className;
}

