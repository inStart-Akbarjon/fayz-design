import { useRef, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Add throttle utility at the top of the file
const throttle = (func, limit) => {
    let inThrottle
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Проверим импорты в консоли для отладки
const projectImages = {
    project1: import.meta.glob('/src/assets/projects/project-18/*.{png,jpg,jpeg,webp}', { eager: true }),
    project2: import.meta.glob('/src/assets/projects/project-2/*.{png,jpg,jpeg,webp}', { eager: true }),
    project3: import.meta.glob('/src/assets/projects/project-5/*.{png,jpg,jpeg,webp}', { eager: true }),
    project4: import.meta.glob('/src/assets/projects/project-9/*.{png,jpg,jpeg,webp}', { eager: true }),
    project5: import.meta.glob('/src/assets/projects/project-1/*.{png,jpg,jpeg,webp}', { eager: true }),
    project6: import.meta.glob('/src/assets/projects/project-13/*.{png,jpg,jpeg,webp}', { eager: true }),
    project7: import.meta.glob('/src/assets/projects/project-8/*.{png,jpg,jpeg,webp}', { eager: true }),
    project8: import.meta.glob('/src/assets/projects/project-16/*.{png,jpg,jpeg,webp}', { eager: true }),
    project9: import.meta.glob('/src/assets/projects/project-12/*.{png,jpg,jpeg,webp}', { eager: true }),
    project10: import.meta.glob('/src/assets/projects/project-6/*.{png,jpg,jpeg,webp}', { eager: true }),
    project11: import.meta.glob('/src/assets/projects/project-11/*.{png,jpg,jpeg,webp}', { eager: true }),
    project12: import.meta.glob('/src/assets/projects/project-14/*.{png,jpg,jpeg,webp}', { eager: true }),
}

// Добавим проверку при получении изображений
const getProjectImages = projectKey => {
    const images = Object.values(projectImages[projectKey] || {}).map(module => module.default)
    if (images.length === 0) {
        console.warn(`No images found for ${projectKey}`)
    }
    return images
}

const ProjectsSection = styled.section`
    background-color: #0f0f0f;
    position: relative;
    width: 100%;
    padding: 150px 0;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%);
        background-size: 20px 20px;
        opacity: 0.1;
    }
`

const BackgroundElements = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
`

const DrawingLine = styled.div`
    position: absolute;
    background: none;
    pointer-events: none;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        clip-path: ${props => props.path || 'none'};
        animation: draw 4s linear infinite;
    }

    @keyframes draw {
        0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        }
        50% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        100% {
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
        }
    }
`

const Blueprint = styled.div`
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    animation: fadeInOut 8s ease-in-out infinite;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: draw 4s linear infinite;
    }

    &.circle {
        border-radius: 50%;
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px dashed rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: rotate 20s linear infinite;
        }
    }

    &.square {
        &::before {
            border: none;
            background: rgba(255, 255, 255, 0.05);
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            animation: drawSquare 4s linear infinite;
        }
    }

    @keyframes fadeInOut {
        0%,
        100% {
            opacity: 0;
        }
        50% {
            opacity: 0.15;
        }
    }

    @keyframes drawSquare {
        0% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
        25% {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        }
        50% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        75% {
            clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
        }
        100% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
    }
`

const ArchitecturalElement = styled.div`
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    animation: drawAndFade 6s ease-in-out infinite;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.05);
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        animation: drawElement 3s linear infinite;
    }

    @keyframes drawAndFade {
        0%,
        100% {
            opacity: 0;
            transform: scale(0.95);
        }
        50% {
            opacity: 0.2;
            transform: scale(1);
        }
    }

    @keyframes drawElement {
        0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
    }
`

const ArchLine = styled.div`
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    height: 1px;
    width: 100%;

    &.line1 {
        top: 20%;
        animation: slideLine 8s linear infinite;
    }
    &.line2 {
        top: 40%;
        animation: slideLine 8s linear infinite 2s;
    }
    &.line3 {
        top: 60%;
        animation: slideLine 8s linear infinite 4s;
    }
    &.line4 {
        top: 80%;
        animation: slideLine 8s linear infinite 6s;
    }

    @keyframes slideLine {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
`

const Grid = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
    background-size: 50px 50px;
`

const GridLines = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const ShiningLine = styled.div`
    position: absolute;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.2) 45%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.2) 55%,
        transparent 100%
    );

    ${props =>
        props.horizontal
            ? `
        width: 100%;
        height: 1px;
        top: ${props.position}px;
        animation: moveHorizontal 10s linear infinite;
        animation-delay: ${props.delay}s;
    `
            : `
        width: 1px;
        height: 100%;
        left: ${props.position}px;
        background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 45%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.2) 55%,
            transparent 100%
        );
        animation: moveVertical 10s linear infinite;
        animation-delay: ${props.delay}s;
    `}

    @keyframes moveHorizontal {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes moveVertical {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(100%);
        }
    }
`

const GridOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 50% 50%,
        rgba(15, 15, 15, 0) 0%,
        rgba(15, 15, 15, 0.2) 50%,
        rgba(15, 15, 15, 0.5) 100%
    );
    pointer-events: none;
`

const ArchitecturalDrawing = styled.div`
    position: absolute;
    width: ${props => props.size || '200px'};
    height: ${props => props.size || '200px'};
    opacity: 0;
    animation: fadeInOutSlow 8s ease-in-out infinite;
    animation-delay: ${props => props.delay || '0s'};

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.15);
        animation: drawArchitectural 4s linear infinite;
    }

    &.floor-plan::before {
        border: none;
        background: rgba(255, 255, 255, 0.1);
        mask: ${props => props.maskImage || 'none'};
        -webkit-mask: ${props => props.maskImage || 'none'};
        mask-size: contain;
        -webkit-mask-size: contain;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
    }

    &.measurement-lines::after {
        content: '';
        position: absolute;
        width: 120%;
        height: 120%;
        border-left: 1px dashed rgba(255, 255, 255, 0.1);
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        transform: translate(-10%, -10%);
    }

    @keyframes fadeInOutSlow {
        0%,
        100% {
            opacity: 0;
            transform: scale(0.95) rotate(${props => props.rotate || '0deg'});
        }
        50% {
            opacity: 0.2;
            transform: scale(1) rotate(${props => props.rotate || '0deg'});
        }
    }

    @keyframes drawArchitectural {
        0% {
            clip-path: inset(0 100% 100% 0);
        }
        25% {
            clip-path: inset(0 0 100% 0);
        }
        50% {
            clip-path: inset(0 0 0 0);
        }
        75% {
            clip-path: inset(0 0 0 100%);
        }
        100% {
            clip-path: inset(0 100% 0 100%);
        }
    }
`

const ProjectsContainer = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const ProjectCard = styled(motion.div)`
    position: relative;
    height: 400px;
    opacity: 0;
    transform: translate3d(0, 50px, 0);
    will-change: transform, opacity;

    &.visible {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    @media (max-width: 1200px) {
        height: 350px;
    }

    @media (max-width: 768px) {
        height: 300px;
    }
`

const ProjectImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
`

const ProjectImage = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
    transform: ${props => `translate3d(${props.offset}%, 0, 0)`};
    opacity: ${props => (props.active ? 1 : 0)};
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border: 0 solid rgba(255, 255, 255, 0.1);
        transition: border-width 0.5s ease;
    }

    &:hover {
        &::before {
            opacity: 1;
        }

        &::after {
            border-width: 1px;
        }

        .project-info {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        &::before {
            opacity: 1;
        }
    }
`

const GalleryButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    z-index: 2;
    transition: all 0.3s ease;
    border-radius: 30px;
    opacity: 0;

    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    ${ProjectImage}:hover & {
        opacity: 1;
    }

    &.prev {
        left: 0;
    }

    &.next {
        right: 0;
    }

    ${ProjectImage}:active & {
        opacity: 1;
        border: none;
    }

    @media (max-width: 1920px) {
        opacity: 1;
        padding: 1rem;
        margin: 0rem 1rem 0rem 1rem;
        background: rgba(0, 0, 0, 0.66);
        font-size: 1rem;
        border-radius: 30px;
    }

    @media (max-width: 768px) {
        padding: 0.8rem;
        border-radius: 30px;
    }
`

const ProjectInfo = styled.div`
    padding: 2rem;
    color: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(30px);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 768px) {
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

        &.visible {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

const ProjectTitle = styled.h3`
    font-family: 'Mazzard H', sans-serif;
    font-size: clamp(1.2rem, 2vw, 2rem);
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #fff, #a8a8a8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const ProjectDescription = styled.p`
    font-size: clamp(0.8rem, 1.2vw, 1rem);
    opacity: 0.8;
    line-height: 1.6;
    max-width: 400px;
`

const SectionTitle = styled.h2`
    font-size: clamp(2rem, 5vw, 4rem);
    text-align: center;
    margin-bottom: 4rem;
    color: white;
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(45deg, #fff, #666);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const Projects = () => {
    const projectRefs = useRef([])
    const [currentImageIndices, setCurrentImageIndices] = useState(() => {
        // Создаем массив с 12 нулями для всех проектов
        return Array(12).fill(0)
    })
    const [visibleProjects, setVisibleProjects] = useState(new Set())

    const projects = [
        {
            title: 'Проект №1',
            description: 'Современный жилой комплекс с панорамными видами на город.',
            images: getProjectImages('project1'),
        },
        {
            title: 'Проект №2',
            description: 'Частный дом в неоклассическом стиле — сочетание изящества и вечной эстетики✨',
            images: getProjectImages('project2'),
        },
        {
            title: 'Проект №3',
            description:
                'Дизайн-проект жилого дома, сочетающий элементы легкой неоклассики, представленной в изысканных формах и стилях✨',
            images: getProjectImages('project3'),
        },
        {
            title: 'Проект №4',
            description: 'Проект частной резиденции с пентхаусом и отдельным входом с улицы в неоклассическом стиле✨',
            images: getProjectImages('project4'),
        },
        {
            title: 'Проект №5"',
            description: 'В этом проекте мы сохранили лучшие решения из предыдущего, добавив по просьбе клиента летнюю кухню и удобный тамбур при входе✨',
            images: getProjectImages('project5'),
        },
        {
            title: 'Проект №6',
            description: 'Устойчивый архитектурный проект, гармонично вписанный в природный ландшафт.',
            images: getProjectImages('project6'),
        },
        {
            title: 'Проект №7',
            description: 'Устойчивый архитектурный проект, гармонично вписанный в природный ландшафт.',
            images: getProjectImages('project7'),
        },
        {
            title: 'Проект №8',
            description: 'Проект частного дома в неоклассическом стиле✨',
            images: getProjectImages('project8'),
        },
        {
            title: 'Проект №9',
            description: 'Устойчивый архитектурный проект, гармонично вписанный в природный ландшафт.',
            images: getProjectImages('project9'),
        },
        {
            title: 'Проект №10',
            description: 'Дом в стиле неоклассицизма, который сочетает в себе элегантность и функциональность✨',
            images: getProjectImages('project10'),
        },
        {
            title: 'Проект №11',
            description: 'Устойчивый архитектурный проект, гармонично вписанный в природный ландшафт.',
            images: getProjectImages('project11'),
        },
        {
            title: 'Проект №12',
            description: 'Устойчивый архитектурный проект, гармонично вписанный в природный ландшафт.',
            images: getProjectImages('project12'),
        },
    ].filter(project => {
        const hasImages = project.images && project.images.length > 0
        if (!hasImages) {
            console.warn('Project filtered out due to missing images')
        }
        return hasImages
    })

    // Добавим консоль лог для проверки количества изображений
    useEffect(() => {
        projects.forEach((project, index) => {
            console.log(`Project ${index + 1} has ${project.images.length} images`)
        })
    }, [])

    const handlePrevImage = projectIndex => {
        setCurrentImageIndices(prevIndices => {
            const newIndices = [...prevIndices]
            const project = projects[projectIndex]
            if (project && project.images) {
                newIndices[projectIndex] =
                    (newIndices[projectIndex] - 1 + project.images.length) % project.images.length
            }
            return newIndices
        })
    }

    const handleNextImage = projectIndex => {
        setCurrentImageIndices(prevIndices => {
            const newIndices = [...prevIndices]
            const project = projects[projectIndex]
            if (project && project.images) {
                newIndices[projectIndex] = (newIndices[projectIndex] + 1) % project.images.length
            }
            return newIndices
        })
    }

    useEffect(() => {
        const cards = projectRefs.current
        let scrollTriggers = []

        cards.forEach((card, i) => {
            const trigger = ScrollTrigger.create({
                trigger: card,
                start: 'top bottom-=100',
                end: 'bottom top+=100',
                toggleClass: 'visible',
                once: true,
                onEnter: () => {
                    gsap.to(card, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        overwrite: true,
                    })
                },
            })
            scrollTriggers.push(trigger)
        })

        return () => {
            scrollTriggers.forEach(trigger => trigger.kill())
            scrollTriggers = []
        }
    }, [])

    // Optimize scroll handler with throttle
    const handleScroll = useCallback(
        throttle(() => {
            requestAnimationFrame(() => {
                projectRefs.current.forEach(ref => {
                    if (ref) {
                        const rect = ref.getBoundingClientRect()
                        const isInView = rect.top < window.innerHeight && rect.bottom > 0

                        if (isInView) {
                            ref.style.willChange = 'transform, opacity'
                        } else {
                            ref.style.willChange = 'auto'
                        }
                    }
                })
            })
        }, 100),
        [],
    )

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    // Optimize observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                requestAnimationFrame(() => {
                    entries.forEach(entry => {
                        const projectId = entry.target.getAttribute('data-project-id')
                        setVisibleProjects(prev => {
                            const newSet = new Set(prev)
                            if (entry.isIntersecting) {
                                newSet.add(projectId)
                            } else {
                                newSet.delete(projectId)
                            }
                            return newSet
                        })
                    })
                })
            },
            {
                threshold: 0.2,
                rootMargin: '50px',
            },
        )

        projectRefs.current.forEach(ref => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    const generateGridLines = () => {
        const lines = []
        const gridSize = 50 // размер ячейки сетки
        const numHorizontalLines = Math.ceil(window.innerHeight / gridSize)
        const numVerticalLines = Math.ceil(window.innerWidth / gridSize)

        // Горизонтальные линии
        for (let i = 0; i < numHorizontalLines; i++) {
            lines.push(<ShiningLine key={`h-${i}`} horizontal position={i * gridSize} delay={-Math.random() * 4} />)
        }

        // Вертикальные линии
        for (let i = 0; i < numVerticalLines; i++) {
            lines.push(<ShiningLine key={`v-${i}`} position={i * gridSize} delay={-Math.random() * 4} />)
        }

        return lines
    }

    const renderProjectImages = (project, index) => {
        if (!project.images || project.images.length === 0) {
            console.warn(`No images for project ${index + 1}`)
            return null
        }

        const images = project.images
        const currentIndex = currentImageIndices[index] || 0

        return images.map((image, imgIndex) => {
            let offset = (imgIndex - currentIndex) * 100
            if (offset > 100) offset -= images.length * 100
            if (offset < -100) offset += images.length * 100

            return (
                <ProjectImage
                    key={imgIndex}
                    style={{ backgroundImage: `url(${image})` }}
                    offset={offset}
                    active={imgIndex === currentIndex}>
                    {imgIndex === currentIndex && (
                        <ProjectInfo
                            className={`project-info ${visibleProjects.has(`project-${index}`) ? 'visible' : ''}`}>
                            <ProjectTitle>{project.title}</ProjectTitle>
                            <ProjectDescription>{project.description}</ProjectDescription>
                        </ProjectInfo>
                    )}
                </ProjectImage>
            )
        })
    }

    return (
        <ProjectsSection id="projects">
            <BackgroundElements>
                <Grid />
                <GridLines>{generateGridLines()}</GridLines>
                <ArchitecturalDrawing
                    className="measurement-lines"
                    size="300px"
                    style={{ bottom: '15%', right: '10%' }}
                    delay="2s"
                    rotate="30deg"
                />
                <ArchitecturalDrawing size="250px" style={{ top: '40%', left: '15%' }} delay="4s" rotate="-5deg" />
            </BackgroundElements>
            <SectionTitle>Наши Проекты</SectionTitle>
            <ProjectsContainer>
                {projects.map(
                    (project, i) =>
                        project.images &&
                        project.images.length > 0 && (
                            <ProjectCard
                                key={i}
                                ref={el => (projectRefs.current[i] = el)}
                                data-project-id={`project-${i}`}>
                                <ProjectImageWrapper>
                                    {renderProjectImages(project, i)}
                                    <GalleryButton
                                        className="prev"
                                        onClick={e => {
                                            e.stopPropagation()
                                            handlePrevImage(i)
                                        }}>
                                        &#8249;
                                    </GalleryButton>
                                    <GalleryButton
                                        className="next"
                                        onClick={e => {
                                            e.stopPropagation()
                                            handleNextImage(i)
                                        }}>
                                        &#8250;
                                    </GalleryButton>
                                </ProjectImageWrapper>
                            </ProjectCard>
                        ),
                )}
            </ProjectsContainer>
        </ProjectsSection>
    )
}

export default Projects
