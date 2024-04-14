import calculateSeconds from "../../utils/calculateSeconds";
import "./ProgressBar.css";

export default function ProgressBar({time, delay, gameDuration}) {
    //const percentageRemaining = (time / gameDuration) * 100;

    // To display the percentage only at intervals of 10 (i.e., 10%, 20%, 30%, etc.), I can modify the percentageRemaining calculation to round it to the nearest multiple of 10.
    const percentageRemaining = Math.round((time / gameDuration) * 100 / 10) * 10; // Round to the nearest multiple of 10

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

