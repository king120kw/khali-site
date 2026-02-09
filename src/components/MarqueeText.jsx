import React from 'react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const MarqueeText = ({ items, speed = 50, direction = 'left' }) => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        const marqueeContent = marquee.querySelector('.marquee-content');
        const marqueeItems = marquee.querySelectorAll('.marquee-item');

        // Clone items for seamless loop
        marqueeItems.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeContent.appendChild(clone);
        });

        // Calculate total width
        const totalWidth = marqueeContent.scrollWidth / 2;

        // GSAP infinite horizontal scroll
        const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: 'none' }
        });

        tl.to(marqueeContent, {
            x: direction === 'left' ? -totalWidth : totalWidth,
            duration: totalWidth / speed,
            ease: 'none'
        });

        return () => {
            tl.kill();
        };
    }, [items, speed, direction]);

    return (
        <div className="marquee" ref={marqueeRef} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div className="marquee-content" style={{ display: 'inline-flex', gap: '40px' }}>
                {items.map((item, index) => (
                    <span key={index} className="marquee-item" style={{ fontSize: '4rem', fontFamily: 'Oswald', fontWeight: 300, color: 'rgba(255,255,255,0.1)' }}>
                        {item} •
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeText;
