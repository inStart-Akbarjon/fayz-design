import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0f0f0f;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transform-origin: top;
`;

const LoadingText = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 5vw, 4rem);
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    position: relative;
    overflow: hidden;
    opacity: 0;
    font-weight: 500;
    
    span {
        display: inline-block;
        transform: translateY(100%);
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background: white;
        transform: scaleX(0);
        transform-origin: left;
    }
`;

const Loading = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.5,
            yoyo: true
        });

        gsap.set(textRef.current, { opacity: 1 });

        // Анимация текста
        tl.fromTo(textRef.current.querySelector('span'),
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }
        )
        .fromTo(textRef.current.querySelector('::after'),
            {
                scaleX: 0,
                opacity: 0
            },
            {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.inOut'
            }
        );

        // Таймер для завершения загрузки
        const timer = setTimeout(() => {
            tl.pause();
            
            // Анимация исчезновения
            const exitTl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { display: 'none' });
                    onComplete();
                }
            });

            exitTl
                .to(textRef.current, {
                    y: -50,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in'
                })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut'
                });

        }, 3000);

        return () => {
            tl.kill();
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <LoadingContainer ref={containerRef}>
            <LoadingText ref={textRef}>
                <span>Fayz Design</span>
            </LoadingText>
        </LoadingContainer>
    );
};

export default Loading; 