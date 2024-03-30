// import logo from './logo.svg';
import Balloon from './components/Balloon/Balloon';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*
                <img src={logo} className="App-logo" alt="logo" />
                */}
                <Balloon color="#9980FA" />
                <p>
                    The balloon is swinging!
                </p>
                <a
                    className="App-link"
                    href="https://github.com/qbreis/react-pop-a-popup-balloon/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React Pop a Popup Ballon
                </a>
            </header>
        </div>
    );
}
