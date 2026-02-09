import React, { useState } from 'react';
import LiquidEther from './LiquidEther';

const AuthScreen = ({ onLogin, onGuestLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ name: name || 'User', email });
    };

    return (
        <div className="screen active" id="auth-screen">
            <LiquidEther
                colors={['#121212', '#720E1E', '#F8C8DC']}
                mouseForce={20}
                cursorSize={100}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.0}
                resolution={0.5}
            />
            <div className="auth-container">
                <div className="auth-brand">
                    <h1>KHALI WORLD</h1>
                    <p className="tagline">Where Fashion Meets Innovation</p>
                    <p>Premium clothing reimagined through 3D customization and AI design intelligence.</p>
                </div>
                <div className="auth-forms">
                    <div className="auth-tabs">
                        <div className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</div>
                        <div className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign Up</div>
                    </div>

                    {activeTab === 'login' ? (
                        <form className="auth-form active" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                        </form>
                    ) : (
                        <form className="auth-form active" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
                        </form>
                    )}

                    <div className="guest-link" onClick={onGuestLogin}>Continue as Guest</div>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
