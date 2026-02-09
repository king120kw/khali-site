import React from 'react';

const Onboarding = ({ onNavigate }) => {
    return (
        <div className="screen active" id="onboarding">
            <div className="onboarding-container">
                <h1>How It Works</h1>
                <p className="tagline">Your Personal Fashion Journey in 4 Steps</p>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Explore Collections</h3>
                        <p>Browse curated collections by gender, style, and season.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Select & Customize</h3>
                        <p>Choose any piece and enter our 3D studio for complete personalization.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>AI Enhancement</h3>
                        <p>Receive intelligent suggestions for colors, fabrics, and design details.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">4</div>
                        <h3>Order & Create</h3>
                        <p>Your custom piece is crafted and delivered to your door.</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <button className="btn" onClick={() => onNavigate('dashboard')}>Enter KHALI WORLD</button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
