import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeText from './MarqueeText';
// import InteractiveGlobe from './InteractiveGlobe'; // Temporarily disabled

gsap.registerPlugin(ScrollTrigger);

const Dashboard = ({ onSelectCollection, addAIMessage }) => {
    const containerRef = useRef(null);

    // Data
    const categories = [
        { id: 'mens', name: 'Menswear', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2187&auto=format&fit=crop' },
        { id: 'womens', name: 'Womenswear', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop' },
        { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2000&auto=format&fit=crop' },
        { id: 'exclusive', name: 'Exclusives', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop' },
    ];

    useEffect(() => {
        // Initial Message
        setTimeout(() => {
            addAIMessage("Welcome to the Collection. Scroll to explore our latest cinematic releases.");
        }, 500);

        // Simple Fade In for cards
        gsap.fromTo('.category-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.category-grid',
                    start: 'top 80%'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="screen active" id="dashboard" ref={containerRef}>
            {/* Screen Effects */}
            <div className="scanlines"></div>
            <div className="noise"></div>

            <div className="dashboard-container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', marginBottom: '10px' }}>THE COLLECTION</h1>
                    <p className="tagline">Select a category to begin</p>
                </div>

                <div className="category-grid">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card"
                            onClick={() => onSelectCollection(cat.id)}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${cat.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transition: 'transform 0.5s ease'
                                }}
                            />
                            <div className="category-overlay">
                                <h2 style={{ fontSize: '40px', marginBottom: '10px' }}>{cat.name}</h2>
                                <button className="btn btn-primary">View Collection</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee Text Rows - Grilled Pixels Style */}
            <div style={{ position: 'fixed', bottom: '20px', left: 0, width: '100%', zIndex: 5, pointerEvents: 'none', opacity: 0.5 }}>
                <MarqueeText items={['KHALI WORLD', 'PREMIUM FASHION', 'EXCLUSIVE DESIGNS', 'LUXURY', 'CRAFTSMANSHIP', 'INNOVATION']} speed={40} direction="left" />
            </div>
        </div>
    );
};

export default Dashboard;
