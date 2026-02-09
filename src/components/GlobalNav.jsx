import React from 'react';

const GlobalNav = ({ onNavigate, cartCount, onLogout }) => {
    return (
        <nav className="global-nav visible" id="globalNav">
            <a onClick={() => onNavigate('dashboard')}>Collections</a>
            <a onClick={() => onNavigate('studio')}>3D Studio</a>
            <a onClick={() => onNavigate('checkout')}>Cart (<span>{cartCount}</span>)</a>
            <a onClick={onLogout}>Logout</a>
        </nav>
    );
};

export default GlobalNav;
