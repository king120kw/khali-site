import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Globe = ({ mouse }) => {
    const meshRef = useRef();

    // Smoothly interpolate rotation based on mouse position
    useFrame(() => {
        if (meshRef.current) {
            // Target rotation based on mouse position (normalized -1 to 1)
            const targetX = mouse.current.y * 0.5; // Vertical mouse -> X axis rotation (tilt)
            const targetY = mouse.current.x * 0.5; // Horizontal mouse -> Y axis rotation (spin)

            // Linear interpolation for smooth movement (inertia)
            meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
            meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
        }
    });

    return (
        <Sphere args={[1.5, 64, 64]} ref={meshRef}>
            {/* Wireframe-like material for a digital/holographic look */}
            <meshStandardMaterial
                color="#720e1e" // Brand deep red
                emissive="#300"
                wireframe={true}
                transparent={true}
                opacity={0.3}
            />
        </Sphere>
    );
};

const InteractiveGlobe = () => {
    // Store mouse coordinates in a ref to avoid re-renders on every move
    const mouse = useRef({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        // Normalize coordinates to -1 to 1
        mouse.current = {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        };
    };

    return (
        <div
            className="globe-container"
            onMouseMove={handleMouseMove}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind content
                pointerEvents: 'auto' // Needs to capture mouse for itself if completely covering, 
                // but usually Dashboard handles mouse. 
                // We'll attach listener to window or this container.
            }}
        >
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Globe mouse={mouse} />
            </Canvas>
        </div>
    );
};

export default InteractiveGlobe;
