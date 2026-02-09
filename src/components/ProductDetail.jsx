import React, { useState } from 'react';

const ProductDetail = ({ product, onAddToCart, onNavigate, addAIMessage }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    if (!product) return null;

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        addAIMessage(`Excellent choice! ${color} is trending this season. Consider pairing with silver accessories.`);
    };

    return (
        <div className="screen active" id="product-detail">
            <div className="detail-container">
                <div className="detail-gallery">
                    <div className="main-image" id="mainProductImage">{product.name}</div>
                </div>
                <div className="detail-info">
                    <h2 id="detailProductName">{product.name}</h2>
                    <p className="tagline" id="detailProductPrice" style={{ color: 'var(--deep-red)' }}>${product.price}.00</p>

                    <h3 style={{ margin: '30px 0 15px', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Color</h3>
                    <div className="color-options" id="colorOptions">
                        {['Burgundy', 'Teal', 'Black', 'Grey'].map(color => (
                            <div
                                key={color}
                                className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                                style={{
                                    background: color === 'Burgundy' ? 'var(--burgundy)' :
                                        color === 'Teal' ? 'var(--muted-teal)' :
                                            color === 'Black' ? '#333' : '#ddd'
                                }}
                                onClick={() => handleColorSelect(color)}
                            ></div>
                        ))}
                    </div>

                    <h3 style={{ margin: '30px 0 15px', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Size</h3>
                    <div className="size-options" id="sizeOptions">
                        {['S', 'M', 'L', 'XL'].map(size => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >{size}</div>
                        ))}
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '40px' }} onClick={() => onAddToCart({ ...product, selectedColor, selectedSize })}>Add to Cart</button>
                    <button className="btn" style={{ width: '100%', marginTop: '20px' }} onClick={() => onNavigate('studio')}>Customize in 3D Studio</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
