import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Loading from './components/Loading'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import gsap from 'gsap'
import { initSmoothScroll } from './utils/smoothScroll'

const AppContainer = styled.div`
    position: relative;
    min-height: 100vh;
    background-color: #0f0f0f;
    overflow: hidden;
`

const Main = styled.main`
    position: relative;
    width: 100%;
    opacity: ${props => props.loading ? 0 : 1};
    transition: opacity 0.5s ease;
`

const App = () => {
    const [loading, setLoading] = useState(true)
    const mainRef = useRef(null)
    const [showContact, setShowContact] = useState(false)
    const lenis = useRef(null)

    useEffect(() => {
        const lenis = initSmoothScroll()

        // Сократим время загрузки
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            if (lenis) lenis.destroy()
        }
    }, [])

    useEffect(() => {
        if (!loading) {
            gsap.to(mainRef.current, {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
            })
        }
    }, [loading])

    return (
        <>
            <GlobalStyles />
            {loading ? (
                <Loading />
            ) : (
                <AppContainer>
                    <Header />
                    <Main ref={mainRef} loading={loading}>
                        <Hero id="hero" />
                        <About id="about" />
                        <Services id="services" />
                        <Projects id="projects" />
                        <Contact id="contact" />
                    </Main>
                </AppContainer>
            )}
        </>
    );
};

export default App;
