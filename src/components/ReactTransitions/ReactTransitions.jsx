import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './ReactTransitions.css';

export default function ReactTransition() {
    const [showButton, setShowButton] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const nodeRef = useRef(null);
    return (
        <div style={{ paddingTop: '2rem', textAlign: 'center' }}>
            {showButton && (
                <button
                    className="test"
                    onClick={() => setShowMessage(true)}
                    size="lg"
                >
                    Show Message
                </button>
            )}
            <CSSTransition
                in={showMessage}
                nodeRef={nodeRef}
                timeout={3000}
                classNames="alert"
                unmountOnExit
                onEnter={() => setShowButton(false)}
                onExited={() => setShowButton(true)}
            >
                <div
                    className="test"
                    ref={nodeRef}
                    onClose={() => setShowMessage(false)}
                >
                    <h2>
                        Animated alert message
                    </h2>
                    <p>
                        This alert message is being transitioned in and
                        out of the DOM.
                    </p>
                    <button
                        onClick={() => setShowMessage(false)}
                    >
                        Close
                    </button>
                </div>
            </CSSTransition>
        </div>
    );
}