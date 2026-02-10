import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteMenu from './InfiniteMenu';
import Prism from './Prism';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

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

const MobileCard = ({ step, index, isStandalone }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const scroller = isStandalone ? undefined : ".slider-wrapper";

        // Entry animation
        gsap.fromTo(card,
            { scale: 0.85, opacity: 0.4 },
            {
                scale: 1,
                opacity: 1,
                scrollTrigger: {
                    trigger: card,
                    scroller: scroller,
                    start: "top 90%",
                    end: "top 45%",
                    scrub: true,
                }
            }
        );

        // Exit animation
        gsap.to(card, {
            scale: 0.85,
            opacity: 0.4,
            scrollTrigger: {
                trigger: card,
                scroller: scroller,
                start: "bottom 55%",
                end: "bottom 10%",
                scrub: true
            }
        });
    }, [isStandalone]);

    const handleInteraction = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 12;
        const rotateY = (x - centerX) / 12;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    };

    const handleLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)'
        });
    };

    return (
        <div
            className="mobile-step-card"
            ref={cardRef}
            onMouseMove={handleInteraction}
            onTouchMove={handleInteraction}
            onMouseLeave={handleLeave}
            onTouchEnd={handleLeave}
        >
            <div className="card-inner">
                <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="card-image-content">
                    <img src={step.image} alt={step.title} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
            </div>
        </div>
    );
};

const HowItWorks = ({ onNavigate, isStandalone = false }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`screen active ${isStandalone ? 'standalone-screen' : ''}`} id="how-it-works">
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

            <div className={`slider-wrapper ${isStandalone ? 'standalone' : ''}`}>
                {isMobile ? (
                    <div className="mobile-card-stack">
                        {steps.map((step, index) => (
                            <MobileCard key={index} step={step} index={index} isStandalone={isStandalone} />
                        ))}
                    </div>
                ) : (
                    <InfiniteMenu items={steps} scale={1} />
                )}
            </div>

            <div className="how-it-works-footer">
                <button className="btn" onClick={() => onNavigate('dashboard')}>Enter KHALI WORLD</button>
            </div>
        </div>
    );
};

export default HowItWorks;
