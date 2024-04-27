import "./CoinCounter.css";

export default function CoinCounter({ coinCounterDelay }) {
    return (
        <div 
            className="CoinCounter" 
            style={{
                animationDuration: `${coinCounterDelay}ms`
            }}
        >
            1 pop
        </div>
    );
};