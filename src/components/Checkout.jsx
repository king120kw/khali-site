import React, { useState } from 'react';

const Checkout = ({ cart, onComplete }) => {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        zip: '',
        cardNumber: ''
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete();
    };

    return (
        <div className="screen active" id="checkout">
            <div className="checkout-container">
                <h1 style={{ color: 'var(--burgundy)' }}>Checkout</h1>
                <p className="tagline" style={{ color: 'var(--muted-teal)' }}>Complete your custom order</p>

                <div className="checkout-grid">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Shipping Address</label>
                                <input type="text" placeholder="Street Address" required onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="City" style={{ width: '48%', display: 'inline-block' }} required onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                <input type="text" placeholder="ZIP Code" style={{ width: '48%', display: 'inline-block', marginLeft: '4%' }} required onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Payment Method</label>
                                <select style={{ width: '100%' }}>
                                    <option>Credit Card</option>
                                    <option>PayPal</option>
                                    <option>Apple Pay</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Card Number" required onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Complete Order</button>
                        </form>
                    </div>
                    <div className="order-summary">
                        <h3 style={{ fontFamily: 'Oswald', marginBottom: '20px' }}>Order Summary</h3>
                        <div id="orderItems">
                            {cart.length === 0 ? <p>Your cart is empty</p> : cart.map((item, index) => (
                                <div key={index} className="summary-item">
                                    <span>{item.name || `Custom ${item.fabric} ${item.pattern}`}</span>
                                    <span>${item.price}.00</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-item" style={{ borderTop: '2px solid #000', marginTop: '20px', paddingTop: '20px' }}>
                            <span>Total</span>
                            <span className="total-price" id="orderTotal">${total}.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
