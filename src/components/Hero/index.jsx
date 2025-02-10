import { useEffect, useRef } from 'react'
import backgroundImage from '../../assets/black-marble-natural-pattern-background-abstract-black-white.jpg'
import styled from 'styled-components'
import gsap from 'gsap'

const HeroSection = styled.section`
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const HeroContent = styled.div`
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 2rem;

    @media (max-width: 768px) {
        padding: 0 1rem;
        margin-top: -2rem;
    }
`

const HeroTitle = styled.h1`
    font-size: clamp(2rem, 8vw, 7rem);
    font-family: 'Cinzel', serif;
    font-weight: 500;
    line-height: 1;
    margin: 0;
    padding: 0;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    mix-blend-mode: difference;
    cursor: default;

    .char {
        display: inline-block;
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        will-change: transform;
    }

    @media (max-width: 768px) {
        font-size: clamp(4rem, 12vw, 4rem);
        letter-spacing: 0.01em;
    }
`

const HeroSubtitle = styled.p`
    font-size: clamp(1rem, 2vw, 1.8rem);
    font-family: 'Cormorant', serif;
    font-weight: 400;
    margin: 2rem 0;
    max-width: 600px;
    margin: 2rem auto;
    color: rgba(255, 255, 255, 0.8);
    opacity: 0;
    transform: translateY(20px);

    @media (max-width: 768px) {
        font-size: clamp(1rem, 5vw, 2rem);
        margin: -2rem auto;
        margin-top: 0.5rem;
        padding: 0 1rem;
        max-width: 100%;
    }
`

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url('https://images.unsplash.com/photo-1545486332-9e0999c535b2?q=80&w=3387&auto=format&fit=crop');
    // Альтернативные варианты:
    // https://images.unsplash.com/photo-1552423314-cf29ab68ad73
    // https://images.unsplash.com/photo-1511818966892-d7d671e672a2
    // https://images.unsplash.com/photo-1506947411487-a56738267384
    background-size: cover;
    background-position: center;
    transform: scale(1.1);
    transition: transform 0.6s ease-out;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2) 100%);
    }

    @media (max-width: 768px) {
        &::after {
            background: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.4) 100%);
        }
    }
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
`

const ScrollIndicator = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    z-index: 2;
    opacity: 0;

    span {
        font-size: 0.9rem;
        text-transform: uppercase;
        color: #ffffff;
        letter-spacing: 0.2em;
    }

    &::after {
        content: '';
        width: 1px;
        height: 60px;
        background: #fff;
        animation: scrollIndicator 2s ease-in-out infinite;
    }

    @keyframes scrollIndicator {
        0% {
            transform: scaleY(0);
            transform-origin: top;
        }
        50% {
            transform: scaleY(1);
            transform-origin: top;
        }
        50.1% {
            transform: scaleY(1);
            transform-origin: bottom;
        }
        100% {
            transform: scaleY(0);
            transform-origin: bottom;
        }
    }

    @media (max-width: 768px) {
        bottom: 1rem;

        span {
            font-size: 0.8rem;
        }

        &::after {
            height: 40px;
        }
    }
`

const CircleContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 50vw;
    max-width: 700px;
    max-height: 700px;
    z-index: 1;
    opacity: 0.6;
    mix-blend-mode: difference;
    animation: pulseContainer 8s ease-in-out infinite;

    @keyframes pulseContainer {
        0%,
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.8;
        }
    }

    @media (max-width: 768px) {
        width: 110vw;
        height: 110vw;
        opacity: 0.4;
    }
`

const Circle = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:nth-child(1) {
        animation: rotateAndScale 12s linear infinite;
        border-width: 1px;
        border-style: dashed;
    }

    &:nth-child(2) {
        width: 75%;
        height: 75%;
        top: 12.5%;
        left: 12.5%;
        animation: rotateReverse 10s linear infinite;
        border-width: 2px;
        opacity: 0.6;
        border-style: solid;
    }

    &:nth-child(3) {
        width: 50%;
        height: 50%;
        top: 25%;
        left: 25%;
        animation: rotateAndPulse 8s linear infinite;
        border-width: 1px;
        opacity: 0.4;
        border-style: dotted;
    }

    @keyframes rotateAndScale {
        0% {
            transform: rotate(0deg) scale(1);
            border-color: rgba(255, 255, 255, 0.81);
        }
        50% {
            transform: rotate(180deg) scale(1.1);
            border-color: rgba(255, 255, 255, 0.86);
        }
        100% {
            transform: rotate(360deg) scale(1);
            border-color: rgba(255, 255, 255, 0.75);
        }
    }

    @keyframes rotateReverse {
        0% {
            transform: rotate(360deg);
            border-color: rgba(255, 255, 255, 0.86);
        }
        50% {
            border-color: rgba(255, 255, 255, 0.84);
        }
        100% {
            transform: rotate(0deg);
            border-color: rgba(255, 255, 255, 0.79);
        }
    }

    @keyframes rotateAndPulse {
        0% {
            transform: rotate(0deg);
            opacity: 0.4;
        }
        50% {
            transform: rotate(-180deg);
            opacity: 0.6;
        }
        100% {
            transform: rotate(-360deg);
            opacity: 0.4;
        }
    }
`

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;

    @media (max-width: 768px) {
        background: radial-gradient(
            circle at center,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.9) 100%
        );
    }
`

const NoiseTexture = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.06;
    z-index: 2;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
`

const ScrollText = styled.div`
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: rotate(90deg) translateX(50%);
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    z-index: 2;
    mix-blend-mode: difference;

    @media (max-width: 768px) {
        display: none;
    }
`

const HeroYear = styled.div`
    position: absolute;
    left: 2rem;
    bottom: 2rem;
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.4);
    z-index: 2;
    mix-blend-mode: difference;

    @media (max-width: 768px) {
        display: none;
    }
`

const Hero = () => {
    const heroRef = useRef(null)
    const contentRef = useRef(null)
    const scrollIndicatorRef = useRef(null)
    const backgroundRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    useEffect(() => {
        // Упрощенная анимация без курсора
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo('.hero-bg', 
            { scale: 1.1 },
            { scale: 1, duration: 1.5, ease: 'power2.out' }
        )
        .fromTo(titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 }
        )
        .fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
        )
        .fromTo(scrollIndicatorRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.3'
        );

        // Простой parallax эффект без сложной анимации
        const handleMouseMove = e => {
            const { clientX, clientY } = e;
            const xValue = (clientX - window.innerWidth / 2) * 0.02;
            const yValue = (clientY - window.innerHeight / 2) * 0.02;

            gsap.to('.hero-bg', {
                x: xValue,
                y: yValue,
                duration: 1,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <HeroSection ref={heroRef} id="hero">
            <BackgroundImage className="hero-bg" ref={backgroundRef} />
            <GradientOverlay />
            <NoiseTexture />
            <CircleContainer>
                <Circle />
                <Circle />
                <Circle />
            </CircleContainer>
            <HeroContent ref={contentRef}>
                <HeroTitle ref={titleRef}>Fayz Design</HeroTitle>
                <HeroSubtitle ref={subtitleRef}>
                    Создаем уникальные архитектурные решения, где каждая деталь имеет значение
                </HeroSubtitle>
            </HeroContent>
            <ScrollText>Scroll to explore</ScrollText>
            <HeroYear>© 2025</HeroYear>
            <ScrollIndicator ref={scrollIndicatorRef}>
                <span>Scroll</span>
            </ScrollIndicator>
        </HeroSection>
    );
};

export default Hero;
