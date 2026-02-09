import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`;

const fragmentShader = /* glsl */ `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform sampler2D u_texture;
uniform float u_hover;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}

float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;
    
    // Calculate mouse distance and influence
    float dist = distance(st, posMouse);
    // Base influence from mouse proximity
    float mouseInfluence = smoothstep(u_circleEdge + 0.3, 0.0, dist);
    
    // Total influence gated by hover state
    float influence = mouseInfluence * u_hover;
    
    // 1. DISPLACEMENT (Deformation / Morphing)
    float time = u_mouse.x * 0.001; // Fake time based on mouse move
    float wave = sin(dist * 15.0 - time * 5.0) * 0.02 * influence;
    vec2 dir = normalize(st - posMouse + 0.001);
    vec2 displacement = dir * influence * (0.07 + wave);
    
    vec2 displacedUV = v_texcoord + displacement;
    
    // 2. CHROMATIC ABERRATION
    float aberrationAmount = influence * 0.04;
    float r = texture2D(u_texture, displacedUV + vec2(aberrationAmount, 0.0)).r;
    float g = texture2D(u_texture, displacedUV).g;
    float b = texture2D(u_texture, displacedUV - vec2(aberrationAmount, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // 3. ADAPTIVE BLUR
    float blurAmount = influence * 0.05;
    vec3 blurredColor = vec3(0.0);
    float total = 0.0;
    for(float x = -2.0; x <= 2.0; x += 1.0) {
        for(float y = -2.0; y <= 2.0; y += 1.0) {
            vec2 offset = vec2(x, y) * blurAmount * 0.4;
            blurredColor += texture2D(u_texture, displacedUV + offset).rgb;
            total += 1.0;
        }
    }
    blurredColor /= total;
    
    // 4. FILM GRAIN / NOISE
    float noise = (fract(sin(dot(v_texcoord, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.05;
    
    // Mix and Final Color
    vec3 finalColor = mix(color, blurredColor, influence * 0.5);
    finalColor += noise * u_hover; // Grain only on hover too
    
    // Highlight and Glow
    finalColor *= (1.0 + influence * 0.25);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const ImageShaderBlur = ({
    className = '',
    imageUrl = '',
    pixelRatioProp = 2,
    shapeSize = 1.2,
    roundness = 0.4,
    borderSize = 0.05,
    circleSize = 0.3,
    circleEdge = 0.5
}) => {
    const mountRef = useRef();
    const textureRef = useRef();

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount || !imageUrl) return;

        let animationFrameId;
        let time = 0,
            lastTime = 0;

        const vMouse = new THREE.Vector2();
        const vMouseDamp = new THREE.Vector2();
        const vResolution = new THREE.Vector2();
        let vHover = 0;
        let vHoverDamp = 0;

        let w = 1,
            h = 1;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera();
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imageUrl, () => {
            // Texture loaded, start rendering
            update();
        });
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        textureRef.current = texture;

        const geo = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                u_mouse: { value: vMouseDamp },
                u_resolution: { value: vResolution },
                u_pixelRatio: { value: pixelRatioProp },
                u_texture: { value: texture },
                u_shapeSize: { value: shapeSize },
                u_roundness: { value: roundness },
                u_borderSize: { value: borderSize },
                u_circleSize: { value: circleSize },
                u_circleEdge: { value: circleEdge },
                u_hover: { value: vHoverDamp }
            },
            transparent: true
        });

        const quad = new THREE.Mesh(geo, material);
        scene.add(quad);

        const onPointerMove = e => {
            const rect = mount.getBoundingClientRect();
            vMouse.set(e.clientX - rect.left, e.clientY - rect.top);
        };

        mount.addEventListener('mousemove', onPointerMove);
        mount.addEventListener('pointermove', onPointerMove);

        const onMouseEnter = () => { vHover = 1.0; };
        const onMouseLeave = () => { vHover = 0.0; };

        mount.addEventListener('mouseenter', onMouseEnter);
        mount.addEventListener('mouseleave', onMouseLeave);

        const resize = () => {
            const container = mountRef.current;
            w = container.clientWidth;
            h = container.clientHeight;
            const dpr = Math.min(window.devicePixelRatio, 2);

            renderer.setSize(w, h);
            renderer.setPixelRatio(dpr);

            camera.left = -w / 2;
            camera.right = w / 2;
            camera.top = h / 2;
            camera.bottom = -h / 2;
            camera.updateProjectionMatrix();

            quad.scale.set(w, h, 1);
            vResolution.set(w, h).multiplyScalar(dpr);
            material.uniforms.u_pixelRatio.value = dpr;
        };

        resize();
        window.addEventListener('resize', resize);

        const ro = new ResizeObserver(() => resize());
        if (mountRef.current) ro.observe(mountRef.current);

        const update = () => {
            time = performance.now() * 0.001;
            const dt = time - lastTime;
            lastTime = time;

            ['x', 'y'].forEach(k => {
                vMouseDamp[k] = THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], 12, dt);
            });

            vHoverDamp = THREE.MathUtils.damp(vHoverDamp, vHover, 8, dt);
            material.uniforms.u_hover.value = vHoverDamp;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(update);
        };

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            if (ro) ro.disconnect();
            mount.removeEventListener('mousemove', onPointerMove);
            mount.removeEventListener('pointermove', onPointerMove);
            mount.removeEventListener('mouseenter', onMouseEnter);
            mount.removeEventListener('mouseleave', onMouseLeave);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            texture.dispose();
            material.dispose();
            geo.dispose();
        };
    }, [imageUrl, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);

    return (
        <div
            className={className}
            ref={mountRef}
            style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
                touchAction: 'auto'
            }}
        />
    );
};

export default ImageShaderBlur;
