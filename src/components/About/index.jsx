import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const AboutSection = styled.section` 
    min-height: 100vh;
    padding: 8rem 4rem;
    background-color: #ffffff;
    color: var(--color-text);
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    overflow: hidden;

    @media (max-width: 768px) {
        padding: 6rem 2rem;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 255, 255, 0.95) 100%);
        z-index: -1;
    }
`

const BlueprintGrid = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.15;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 50px 50px;
        background-image: linear-gradient(to right, var(--color-accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px);
    }
`

const Rulers = styled.div`
    position: absolute;
    top: -40px;
    left: -40px;
    width: 120%;
    height: 120%;
    z-index: -1;
    opacity: 0.2;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 30px;
        top: 50px;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 29h100M10 25v4M20 20v9M30 25v4M40 20v9M50 25v4M60 20v9M70 25v4M80 20v9M90 25v4' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E");
        background-repeat: repeat-x;
        animation: rulerMoveHorizontal 40s linear infinite;
    }

    &::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 100%;
        left: 50px;
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29 0v100M25 10h4M20 20h9M25 30h4M20 40h9M25 50h4M20 60h9M25 70h4M20 80h9M25 90h4' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E");
        background-repeat: repeat-y;
        animation: rulerMoveVertical 40s linear infinite;
    }
`

const RulersRight = styled(Rulers)`
    left: auto;
    right: -40px;
    transform: rotate(180deg);
`

const RulersBottom = styled(Rulers)`
    top: auto;
    bottom: -40px;
    transform: rotate(180deg);
`

const ArchitecturalElements = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 0%;
    z-index: -1;
    opacity: 0.1;

    &::before {
        content: '';
        position: absolute;
        width: 20%;
        height: 20%;
        background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h200v200H0z' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M100 0v200M0 100h200' stroke='%23000'/%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M50 50l100 100M150 50L50 150' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 200px 200px;
        animation: elementFloat 90s linear infinite;
    }

    @keyframes elementFloat {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) rotate(90deg);
        }
        50% {
            transform: translateY(0) rotate(180deg);
        }
        75% {
            transform: translateY(20px) rotate(270deg);
        }
        100% {
            transform: translateY(0) rotate(360deg);
        }
    }
`

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;

    @media (max-width: 768px) {
        gap: 1rem;
        max-width: 100%;
        padding: 0 1rem;
    }
`

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;

    & > *:first-child {
        order: 2;
    }
    & > *:last-child {
        order: 1;
    }

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 2rem;

        & > *:first-child {
            order: 1;
        }
        & > *:last-child {
            order: 2;
        }
    }
`

const Content = styled.div`
    padding: 2rem 0;
    visibility: inherit;
    max-width: 100%;

    @media (max-width: 768px) {
        padding: 1rem 0;
    }
`

const Title = styled.h2`
    font-size: clamp(1.8rem, 4vw, 3.5rem);
    margin-bottom: 2rem;
    line-height: 1.1;
    max-width: 100%;

    @media (max-width: 768px) {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        text-align: center;
    }
`

const Description = styled.p`
    font-size: clamp(1rem, 1.5vw, 1.3rem);
    line-height: 1.6;
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 100%;

    @media (max-width: 768px) {
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        text-align: center;
    }
`

const ImageContainer = styled.div`
    position: relative;
    height: 600px;
    overflow: hidden;
    border-radius: 7px;
    background-color: #f0f0f0;
    background-image: url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80');
    background-size: cover;
    background-position: center;
    width: 100%;
    margin-right: 0;
    animation: imageMove 20s ease-in-out infinite;
    transition: transform 0.5s ease;

    @keyframes imageMove {
        0% {
            transform: scale(1) translate(0, 0);
            background-position: 0% 50%;
        }
        25% {
            transform: scale(1) translate(-10px, 10px);
            background-position: 100% 50%;
        }
        50% {
            transform: scale(1) translate(10px, -10px);
            background-position: 50% 100%;
        }
        75% {
            transform: scale(1) translate(10px, 10px);
            background-position: 0% 50%;
        }
        100% {
            transform: scale(1) translate(0, 0);
            background-position: 0% 50%;
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
        animation: gradientMove 8s ease-in-out infinite;
    }

    &:hover {
        animation-play-state: paused;
        &::before {
            animation-play-state: paused;
        }
        transform: scale(1.02);
    }

    @media (max-width: 968px) {
        height: 400px;
    }

    @media (max-width: 480px) {
        height: 300px;
        margin: 0 auto;
        width: 100%;
    }
`

const Stats = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin-top: 4rem;
    padding: 3rem 0;
    visibility: inherit;
    width: 100%;
    position: relative;
    background: linear-gradient(
        90deg,
        rgba(156, 143, 131, 0.05) 0%,
        rgba(176, 157, 140, 0.1) 50%,
        rgba(190, 168, 148, 0.05) 100%
    );

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -50%;
        width: 200%;
        height: 1px;
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            var(--color-accent) 20px,
            var(--color-accent) 40px
        );
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: -50%;
        width: 200%;
        height: 1px;
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            var(--color-accent) 20px,
            var(--color-accent) 40px
        );
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 2rem;
        padding: 3rem 1.5rem;
    }
`

const StatItem = styled.div`
    visibility: inherit;
    text-align: center;
    flex: 1;
    position: relative;
    padding: 0 2rem;

    &::after {
        content: '';
        position: absolute;
        right: 0;
        top: -20px;
        height: calc(100% + 40px);
        width: 1px;
        background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 4px,
            var(--color-accent) 4px,
            var(--color-accent) 8px
        );
        opacity: 0.3;
    }

    &:last-child::after {
        display: none;
    }

    @media (max-width: 768px) {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: rgba(146, 121, 99, 0.05);
        border-radius: 12px;
        width: 100%;

        &::after {
            display: none;
        }
    }

    h3 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--color-accent);
        position: relative;
        display: inline-block;

        &::before {
            content: '';
            position: absolute;
            bottom: -5px;
            left: -10px;
            right: -10px;
            height: 2px;
            background: var(--color-accent);
            transform: skewX(-20deg);
            opacity: 0.3;
        }

        @media (max-width: 768px) {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
    }

    p {
        font-size: 1.2rem;
        opacity: 0.7;
        position: relative;

        @media (max-width: 768px) {
            font-size: 1.1rem;
            margin: 0;

            &::before {
                width: 40px;
                top: -10px;
            }
        }
    }
`

const About = () => {
    const contentRef = useRef(null)
    const imageRef = useRef(null)
    const statsRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const content = contentRef.current
        const stats = statsRef.current
        const title = content.querySelector('h2')
        const descriptions = content.querySelectorAll('p')
        const statItems = stats.children

        gsap.fromTo(
            [title, descriptions, statItems],
            {
                autoAlpha: 0,
                y: 50,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    toggleActions: 'restart none none reverse',
                },
            },
        )

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <AboutSection ref={sectionRef} id="about">
            <BlueprintGrid />
            <Rulers />
            <RulersRight />
            <RulersBottom />
            <ArchitecturalElements />
            <Container>
                <ContentWrapper>
                    <Content ref={contentRef}>
                        <Title>Архитектура, меняющая представление о пространстве</Title>
                        <Description>
                            Мы - команда профессионалов, объединенных страстью к инновационной архитектуре. Наша миссия
                            - создавать не просто здания, а уникальные пространства, которые вдохновляют, функциональны
                            и гармонично вписываются в окружающую среду. От концептуального проектирования до
                            реализации, мы уделяем пристальное внимание каждой детали, используя передовые технологии и
                            экологичные материалы для создания архитектуры будущего.
                        </Description>
                    </Content>
                    <ImageContainer
                        ref={imageRef}
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')`,
                        }}
                    />
                </ContentWrapper>
                <Stats ref={statsRef}>
                    <StatItem>
                        <h3>20+</h3>
                        <p>Лет в архитектуре</p>
                    </StatItem>
                    <StatItem>
                        <h3>180+</h3>
                        <p>Успешных проектов</p>
                    </StatItem>
                    <StatItem>
                        <h3>5+</h3>
                        <p>Экспертов в команде</p>
                    </StatItem>
                    <StatItem>
                        <h3>150+</h3>
                        <p>Довольных клиентов</p>
                    </StatItem>
                </Stats>
            </Container>
        </AboutSection>
    )
}

export default About
