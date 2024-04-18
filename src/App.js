import './App.css';
import Game from './components/Game/Game';
// import new Constants from './utils/constants';
import Constants from "./utils/constants";

export default function App() {
    return (
        <div className="App">
            <Game 
                numberOfBalloons={Constants.gameCells}
                gameDuration={
                    (
                        Constants.gameDuration // seconds
                        * 
                        10000 // 1 second is 1000 miliseconds
                    ) 
                    / 
                    10 // I will decrease 10 miliseconds each time
                }
            />
        </div>
    );
}