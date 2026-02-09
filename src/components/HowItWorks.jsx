import React from 'react';
import InfiniteMenu from './InfiniteMenu';
import Prism from './Prism';
import './HowItWorks.css';

const steps = [
    {
        image: '/khalifa2.png',
        title: 'Visual Audition',
        description: 'Begin your journey by exploring our digital archive of silhouettes that redefine the boundaries of modern identity.'
    },
    {
        image: '/khalifa3.png',
        title: 'Archetype Selection',
        description: 'Choose your foundation from a curated selection of architectural patterns, each a canvas for personal expression.'
    },
    {
        image: '/najib.png',
        title: 'The Design Lab',
        description: 'Enter our virtual 3D workspace where drape, texture, and form are manipulated with precision-engineered tools.'
    },
    {
        image: '/najib1.png',
        title: 'AI Synthesis',
        description: 'Collaborate with our proprietary neural engine to synthesize color palettes and structural refinements tailored to your aesthetic code.'
    },
    {
        image: '/vic1.png',
        title: 'Master Construct',
        description: 'Your blueprint is transmitted to our global network of artisanal ateliers where time-honored techniques meet digital precision.'
    },
    {
        image: '/ibrahim,png.png',
        title: 'Elite Acquisition',
        description: 'Receive your unique creation in our signature eco-luxury sanctuary packaging, delivered anywhere across the globe.'
    }
];

const HowItWorks = ({ onNavigate }) => {
    return (
        <div className="screen active" id="how-it-works">
            <Prism
                animationType="rotate"
                timeScale={0.5}
                height={3.5}
                baseWidth={5.5}
                scale={3.6}
                hueShift={0}
                colorFrequency={1}
                noise={0}
                glow={1}
            />
            <div className="how-it-works-header">
                <h1>How It Works</h1>
                <p className="tagline">A Seamless Journey into Bespoke Luxury</p>
            </div>

            <div className="slider-wrapper">
                <InfiniteMenu items={steps} scale={1} />
            </div>

            <div className="how-it-works-footer" style={{ textAlign: 'center', marginTop: '40px' }}>
                <button className="btn" onClick={() => onNavigate('dashboard')}>Enter KHALI WORLD</button>
            </div>
        </div>
    );
};

export default HowItWorks;
