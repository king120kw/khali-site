import React, { useState } from 'react';

const productsData = [
    { id: 1, name: 'Premium Jacket', price: 349, category: 'Jackets', color: 'Burgundy', image: 'jacket' },
    { id: 2, name: 'Silk Evening Shirt', price: 189, category: 'Shirts', color: 'Black', image: 'shirt' },
    { id: 3, name: 'Tech T-Shirt', price: 89, category: 'T-Shirts', color: 'Grey', image: 'tshirt' },
    { id: 4, name: 'Wool Coat', price: 499, category: 'Jackets', color: 'Teal', image: 'coat' },
    { id: 5, name: 'Tailored Pants', price: 229, category: 'Pants', color: 'Black', image: 'pants' },
    { id: 6, name: 'Cashmere Sweater', price: 299, category: 'Sweaters', color: 'Pink', image: 'sweater' }
];

const CollectionBrowsing = ({ collection, onProductSelect }) => {
    const [filter, setFilter] = useState('All Categories');
    const [sort, setSort] = useState('Sort by: Featured');
    const [search, setSearch] = useState('');

    const filteredProducts = productsData.filter(product => {
        if (filter !== 'All Categories' && product.category !== filter) return false;
        if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    }).sort((a, b) => {
        if (sort === 'Price: Low to High') return a.price - b.price;
        if (sort === 'Price: High to Low') return b.price - a.price;
        return 0;
    });

    return (
        <div className="screen active" id="collection-browsing">
            <div className="collection-container">
                <h1 style={{ color: 'var(--burgundy)' }}>{collection === 'mens' ? "Men's Collection" : "Women's Collection"}</h1>
                <p className="tagline" style={{ color: 'var(--muted-teal)' }}>Curated for the modern gentleman</p>

                <div className="filter-bar">
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option>All Categories</option>
                        <option>Jackets</option>
                        <option>Shirts</option>
                        <option>T-Shirts</option>
                        <option>Pants</option>
                    </select>
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option>Sort by: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                    </select>
                    <input type="text" placeholder="Search..." onKeyUp={(e) => setSearch(e.target.value)} />
                </div>

                <div className="product-grid" id="productGrid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card" onClick={() => onProductSelect(product)}>
                            <div className="product-image">[{product.name}]</div>
                            <div className="product-info">
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">${product.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionBrowsing;
