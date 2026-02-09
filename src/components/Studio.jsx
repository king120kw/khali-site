import React, { useState, useEffect } from 'react';

const Studio = ({ onAddToCart, addAIMessage }) => {
    const [design, setDesign] = useState({
        fabric: 'cotton',
        color: 'burgundy',
        pattern: 'solid',
        fit: 'Slim Fit',
        price: 349
    });

    const updatePrice = (newDesign) => {
        let basePrice = 349;
        if (newDesign.fabric === 'wool') basePrice += 100;
        if (newDesign.fabric === 'silk') basePrice += 150;
        if (newDesign.fabric === 'tech') basePrice += 80;
        if (newDesign.pattern !== 'solid') basePrice += 50;
        return basePrice;
    };

    const handleUpdate = (key, value) => {
        const newDesign = { ...design, [key]: value };
        newDesign.price = updatePrice(newDesign);
        setDesign(newDesign);

        // AI Messages
        if (key === 'fabric') {
            const fabricTips = {
                cotton: 'Premium cotton offers breathability and comfort for daily wear.',
                wool: 'Luxury wool provides excellent insulation and drapes beautifully.',
                silk: 'Silk blend adds elegance and a subtle sheen.',
                tech: 'Technical fabric is perfect for active lifestyles and weather resistance.'
            };
            addAIMessage(fabricTips[value]);
        } else if (key === 'color') {
            const colorAdvice = {
                burgundy: 'This deep burgundy complements most skin tones and pairs well with neutrals.',
                teal: 'A sophisticated choice that works for both formal and casual occasions.',
                pink: 'Soft and romantic, perfect for making a subtle statement.',
                black: 'Timeless and versatile—always in style.',
                white: 'Clean and minimalist, ideal for layering.'
            };
            addAIMessage(colorAdvice[value]);
        } else if (key === 'pattern') {
            addAIMessage(`${value.charAt(0).toUpperCase() + value.slice(1)} patterns add visual interest. Great for creating a focal point!`);
        }
    };

    const getColorHex = (color) => {
        const colorMap = {
            burgundy: '#4a0404',
            teal: '#4a5d5a',
            pink: '#f8c8dc',
            black: '#333',
            white: '#fff'
        };
        return colorMap[color];
    };

    const getFitScale = (fit) => {
        const scales = { 'Slim Fit': 'scaleX(0.9)', 'Regular Fit': 'scaleX(1)', 'Relaxed Fit': 'scaleX(1.1)' };
        return scales[fit];
    };

    return (
        <div className="screen active" id="studio">
            <div className="studio-container">
                <div className="mannequin-area">
                    <div className="mannequin-model" id="mannequinModel">
                        <div style={{
                            position: 'absolute', top: '50px', left: '-100px', right: '-100px', height: '200px',
                            background: getColorHex(design.color),
                            borderRadius: '100px 100px 0 0',
                            transition: 'var(--transition)',
                            transform: getFitScale(design.fit)
                        }} id="garmentTop"></div>
                        <div style={{ position: 'absolute', bottom: '100px', left: '-50px', right: '-50px', height: '150px', background: '#333', borderRadius: '20px', transition: 'var(--transition)' }} id="garmentBottom"></div>
                    </div>
                </div>
                <div className="controls-panel">
                    <h2 style={{ fontFamily: 'Oswald', fontSize: '32px', letterSpacing: '2px', marginBottom: '30px' }}>DESIGN STUDIO</h2>

                    <div className="design-section">
                        <h3>Fabric Type</h3>
                        <select className="btn" style={{ width: '100%', textAlign: 'left' }} value={design.fabric} onChange={(e) => handleUpdate('fabric', e.target.value)}>
                            <option value="cotton">Premium Cotton</option>
                            <option value="wool">Luxury Wool</option>
                            <option value="silk">Silk Blend</option>
                            <option value="tech">Technical Fabric</option>
                        </select>
                    </div>

                    <div className="design-section">
                        <h3>Color Palette</h3>
                        <div className="color-palette">
                            {['burgundy', 'teal', 'pink', 'black', 'white'].map(color => (
                                <div
                                    key={color}
                                    className={`color-option ${design.color === color ? 'active' : ''}`}
                                    style={{ background: getColorHex(color) }}
                                    onClick={() => handleUpdate('color', color)}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="design-section">
                        <h3>Pattern</h3>
                        <div className="pattern-options">
                            {['solid', 'stripe', 'check', 'print'].map(pattern => (
                                <div
                                    key={pattern}
                                    className={`pattern-option ${design.pattern === pattern ? 'active' : ''}`}
                                    onClick={() => handleUpdate('pattern', pattern)}
                                >{pattern.charAt(0).toUpperCase() + pattern.slice(1)}</div>
                            ))}
                        </div>
                    </div>

                    <div className="design-section">
                        <h3>Fit Style</h3>
                        <select className="btn" style={{ width: '100%' }} value={design.fit} onChange={(e) => handleUpdate('fit', e.target.value)}>
                            <option>Slim Fit</option>
                            <option>Regular Fit</option>
                            <option>Relaxed Fit</option>
                        </select>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ fontSize: '32px', fontFamily: 'Oswald' }} id="studioPrice">${design.price}.00</p>
                        <button className="btn" style={{ width: '100%', background: 'white', color: 'black', marginTop: '10px' }} onClick={() => onAddToCart(design)}>Add Design to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studio;
