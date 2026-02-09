import React, { useEffect, useState } from 'react';

const Confirmation = ({ onNavigate }) => {
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        setOrderNumber('KHW' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    return (
        <div className="screen active" id="confirmation">
            <div className="confirmation-container">
                <div className="confirmation-icon">✓</div>
                <h1>Order Confirmed</h1>
                <p className="tagline">Your custom design is being created</p>
                <p style={{ margin: '40px 0' }}>
                    Thank you for choosing KHALI WORLD. Your unique piece will be crafted with precision and delivered within 14-21 days.
                </p>
                <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '40px' }}>Order #: {orderNumber}</p>
                <button className="btn" onClick={() => onNavigate('dashboard')}>Continue Shopping</button>
            </div>
        </div>
    );
};

export default Confirmation;
