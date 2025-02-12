import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const PriceSection = styled.section`
    background: linear-gradient(135deg, #111111 0%, #1d1d1d 100%);
    padding: 150px 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 100% 0%, rgba(45, 45, 45, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(45, 45, 45, 0.5) 0%, transparent 50%);
        z-index: 1;
    }
`

const ArchitecturalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    pointer-events: none;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
                    45deg,
                    transparent 48%,
                    rgba(255, 255, 255, 0.1) 49%,
                    rgba(255, 255, 255, 0.1) 51%,
                    transparent 52%
                )
                0 0 / 50px 50px,
            linear-gradient(
                    -45deg,
                    transparent 48%,
                    rgba(255, 255, 255, 0.1) 49%,
                    rgba(255, 255, 255, 0.1) 51%,
                    transparent 52%
                )
                0 0 / 50px 50px;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
                0deg,
                transparent 0,
                transparent 48px,
                rgba(255, 255, 255, 0.05) 48px,
                rgba(255, 255, 255, 0.05) 50px
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0,
                transparent 48px,
                rgba(255, 255, 255, 0.05) 48px,
                rgba(255, 255, 255, 0.05) 50px
            );
        filter: blur(0.5px);
    }
`

const CircuitLines = styled.div`
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 1px, transparent 2px);
        background-size: 100px 100px, 100px 100px, 50px 50px;
        animation: circuitMove 90s linear infinite;
    }

    @keyframes circuitMove {
        0% {
            transform: rotate(0deg) scale(1.5);
        }
        100% {
            transform: rotate(360deg) scale(1.5);
        }
    }
`

const ArchitecturalAccents = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 500px;
        height: 500px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }

    &::before {
        top: -250px;
        right: -250px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
        animation: rotate 60s linear infinite;
    }

    &::after {
        bottom: -250px;
        left: -250px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
        animation: rotate 60s linear infinite reverse;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
`

const Title = styled.h2`
    font-size: clamp(2rem, 5vw, 4rem);
    text-align: center;
    margin-bottom: 4rem;
    color: white;
    font-family: 'Mazzard H', sans-serif;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #fff, transparent);
    }
`

const PriceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const PriceCard = styled(motion.div)`
    background: rgba(30, 30, 30, 0.9);
    border-radius: 2px;
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 50%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.1) 50%, transparent 52%);
        background-size: 30px 30px;
        opacity: 0.3;
    }

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: 0.5s;
    }

    &:hover::after {
        left: 100%;
    }
`

const PriceHeader = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
    padding-bottom: 1rem;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
`

const PriceTitle = styled.h3`
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;
    font-family: 'Mazzard H', sans-serif;
`

const PriceAmount = styled.div`
    font-size: 2.5rem;
    color: white;
    font-weight: bold;
    margin: 1rem 0;

    span {
        font-size: 1rem;
        opacity: 0.7;
    }
`

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const Feature = styled.li`
    color: #fff;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    opacity: 0.8;

    &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #00bb06;
    }
`

const OrderButton = styled(motion.button)`
    width: 100%;
    padding: 1rem;
    margin-top: 2rem;
    background: linear-gradient(45deg, #1e1e1e, #2a2a2a);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Mazzard H', sans-serif;
    position: relative;
    overflow: hidden;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 0.9rem;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: 0.5s;
    }

    &:hover::before {
        left: 100%;
    }

    &:hover {
        background: linear-gradient(45deg, #2a2a2a, #1e1e1e);
        border-color: rgba(255, 255, 255, 0.2);
    }
`

const Divider = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 15%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 85%,
        transparent 100%
    );
`

const Blueprint = styled.div`
    position: absolute;
    width: 300px;
    height: 300px;
    opacity: 0.1;
    pointer-events: none;

    &.top-left {
        top: 50px;
        left: 50px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        transform: rotate(-15deg);
    }

    &.bottom-right {
        bottom: 50px;
        right: 50px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        transform: rotate(15deg);
    }
`

const PriceSectionComponent = () => {
    const priceRef = useRef()

    const handleOrderClick = e => {
        e.preventDefault()
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    useEffect(() => {
        gsap.fromTo(
            '.price-card',
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: priceRef.current,
                    start: 'top center+=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse',
                },
            },
        )
    }, [])

    return (
        <PriceSection ref={priceRef} id="price">
            <ArchitecturalBackground />
            <CircuitLines />
            <ArchitecturalAccents />
            <Blueprint className="top-left" />
            <Blueprint className="bottom-right" />
            <Container>
                <Title>Наши тарифы</Title>
                <PriceGrid>
                    <PriceCard className="price-card">
                        <PriceHeader>
                            <PriceTitle>Дизайн экстерьера</PriceTitle>
                            <PriceAmount>
                                от $5 <span>/ м³</span>
                            </PriceAmount>
                        </PriceHeader>
                        <FeaturesList>
                            <Feature>3D визуализация экстерьера</Feature>
                            <Feature>Планировочное решение</Feature>
                            <Feature>Подбор материалов</Feature>
                            <Feature>Консультация по реализации</Feature>
                            <Feature>Рабочая документация</Feature>
                            <Feature>Авторский надзор</Feature>
                        </FeaturesList>
                        <OrderButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleOrderClick}>
                            Заказать проект
                        </OrderButton>
                    </PriceCard>

                    <PriceCard className="price-card">
                        <PriceHeader>
                            <PriceTitle>Дизайн интерьера</PriceTitle>
                            <PriceAmount>
                                от $15 <span>/ м³</span>
                            </PriceAmount>
                        </PriceHeader>
                        <FeaturesList>
                            <Feature>3D визуализация помещений</Feature>
                            <Feature>Планировочное решение</Feature>
                            <Feature>Подбор мебели и материалов</Feature>
                            <Feature>Строительные чертежи</Feature>
                            <Feature>Спецификация материалов</Feature>
                            <Feature>Авторский надзор</Feature>
                            <Feature>Подбор подрядчиков</Feature>
                        </FeaturesList>
                        <OrderButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleOrderClick}>
                            Заказать проект
                        </OrderButton>
                    </PriceCard>

                    <PriceCard className="price-card">
                        <PriceHeader>
                            <PriceTitle>Ландшафтный дизайн</PriceTitle>
                            <PriceAmount>
                                от $5 <span>/ м²</span>
                            </PriceAmount>
                        </PriceHeader>
                        <FeaturesList>
                            <Feature>Генеральный план участка</Feature>
                            <Feature>3D визуализация ландшафта</Feature>
                            <Feature>Дендроплан</Feature>
                            <Feature>План освещения</Feature>
                            <Feature>План полива</Feature>
                            <Feature>Подбор растений</Feature>
                            <Feature>Авторский надзор</Feature>
                        </FeaturesList>
                        <OrderButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleOrderClick}>
                            Заказать проект
                        </OrderButton>
                    </PriceCard>
                </PriceGrid>
            </Container>
            <Divider />
        </PriceSection>
    )
}

export default PriceSectionComponent
