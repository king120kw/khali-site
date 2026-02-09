import React from 'react';

const AIAssistant = ({ isOpen, toggleOpen, messages }) => {
    return (
        <>
            <div className="ai-toggle" onClick={toggleOpen}>AI</div>

            <div className={`ai-assistant-panel ${isOpen ? 'open' : ''}`} id="aiPanel">
                <h3 style={{ fontFamily: 'Oswald', marginBottom: '30px' }}>AI DESIGN ASSISTANT</h3>
                <div id="aiMessages">
                    {messages.map((msg, index) => (
                        <div key={index} className="ai-message">
                            <strong>AI DESIGNER:</strong><br />"{msg}"
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AIAssistant;
