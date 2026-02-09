import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageShaderBlur from './ImageShaderBlur';
import TextPressure from './TextPressure';
import BlurText from './BlurText';

gsap.registerPlugin(ScrollTrigger);

const BrandStory = ({ onNavigate }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // SCROLL ANIMATION: Parallax and Reveal
        const ctx = gsap.context(() => {
            // Animate text elements
            gsap.from('.story-title, .story-tagline, .story-paragraph', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.story-container',
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            });

            // Animate Hero Image (Parallax + Scale)
            gsap.fromTo('.hero-visual',
                {
                    y: 100,
                    scale: 0.9,
                    opacity: 0,
                    rotateX: 10
                },
                {
                    y: -50,
                    scale: 1,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.story-content',
                        start: 'top 85%',
                        end: 'bottom 80%',
                        scrub: 1.5
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="screen active" id="brand-story" ref={containerRef}>
            <div className="story-container">
                <TextPressure
                    text="MY STORY"
                    flex={false}
                    scale={false}
                    textColor="#FFFFFF"
                    fontSize="clamp(60px, 10vw, 120px)"
                    fontFamily="Oswald"
                    className="story-title"
                />
                <TextPressure
                    text="Where Art Meets Identity"
                    flex={false}
                    scale={false}
                    textColor="#FFFFFF"
                    fontSize="clamp(18px, 2.5vw, 28px)"
                    fontFamily="Playfair Display"
                    italic={true}
                    className="story-tagline"
                />
                <div className="story-content">
                    <div style={{ textAlign: 'left' }}>
                        <BlurText
                            text="I’m Khalifa Evans Ndung’u, a Nairobi-based creative driven by art, fashion, and self-expression. My journey didn’t start on a runway—it started in studios, streets, and real-life experiences that shaped how I see design today."
                            delay={30}
                            animateBy="words"
                            direction="bottom"
                            className="story-paragraph"
                        />

                        <BlurText
                            text="Art has always been my first language. Through my time at Dust-Depo Art Studio, I learned that creativity isn’t just about aesthetics—it’s about storytelling, emotion, and identity. Working as an artist for years sharpened my eye for detail, texture, and meaning, all of which now influence how I approach fashion. For me, clothing isn’t just worn—it’s felt, lived in, and remembered."
                            delay={30}
                            animateBy="words"
                            direction="bottom"
                            className="story-paragraph"
                        />

                        <BlurText
                            text="My background in customer service, sales, and financial advising gave me something many creatives overlook: a deep understanding of people. I’ve spent years listening—really listening—to different personalities, needs, and aspirations. That connection between people and purpose is what fuels my designs. Every piece, concept, and visual I create is rooted in real human experience."
                            delay={30}
                            animateBy="words"
                            direction="bottom"
                            className="story-paragraph"
                        />

                        <BlurText
                            text="Fashion, to me, is art in motion. It’s where structure meets freedom, where culture meets individuality. I’m inspired by bold expression, raw creativity, and the confidence that comes from wearing something that truly represents who you are. My work blends artistic storytelling with wearable design, creating pieces that speak without saying a word."
                            delay={30}
                            animateBy="words"
                            direction="bottom"
                            className="story-paragraph"
                        />

                        <div style={{ borderLeft: '3px solid var(--deep-red)', paddingLeft: '20px', marginTop: '30px' }}>
                            <BlurText
                                text="This is where art lives on fabric. This is where identity meets design. This is my story—and it’s only getting started."
                                delay={50}
                                animateBy="words"
                                direction="bottom"
                                className="story-paragraph"
                            />
                        </div>
                    </div>
                    <div className="hero-visual" style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '500px', margin: '40px auto 0', borderRadius: '8px', overflow: 'hidden' }}>
                        <ImageShaderBlur
                            imageUrl="/khalifa1.png"
                            pixelRatioProp={window.devicePixelRatio || 1}
                            shapeSize={1}
                            roundness={0.5}
                            borderSize={0.05}
                            circleSize={0.4}
                            circleEdge={2.0}
                        />
                    </div>
                </div>
                <button className="btn" onClick={() => onNavigate('onboarding')} style={{ marginTop: '40px' }}>Begin Your Journey</button>
            </div>
        </div>
    );
};

export default BrandStory;
