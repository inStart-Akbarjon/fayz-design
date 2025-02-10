import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MobileMenu from '../MobileMenu';

gsap.registerPlugin(ScrollTrigger)

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 0 4rem;
    z-index: 1000;
    background: ${props => (props.isScrolled ? 'rgba(15, 15, 15, 0.95)' : 'transparent')};
    backdrop-filter: ${props => (props.isScrolled ? 'blur(10px)' : 'none')};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        padding: 0 2rem;
    }
`

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
`

const Logo = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
    font-optical-sizing: auto;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 4px;
`

const MenuButton = styled.button`
    width: 50px;
    height: 50px;
    position: relative;
    background: transparent;
    border: none;
    padding: 0;
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

    @media (max-width: 768px) {
        display: flex;
    }

    span {
        width: 100%;
        height: 1px;
        text-decoration: none;
        background: white;
        display: block;
        transition: transform 0.3s ease;

        &:first-child {
            width: 70%;
            margin-left: auto;
        }
    }

    &:hover {
        text-decoration: none;
        span {
            &:first-child {
                transform: translateX(-10px);
            }
            &:last-child {
                transform: translateX(10px);
            }
        }
    }
`

const NavLinks = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
    text-decoration: none;

    @media (max-width: 768px) {
        display: none;
    }
`

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    padding: 0.5rem 0;
    transition: opacity 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        text-decoration: none;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;

        background-color: white;
        transition: width 0.3s ease;
    }

    &:hover {
        opacity: 0.8;
        text-decoration: none;
        color: white;
        &::after {
            width: 100%;
        }
    }
`

const RightSection = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 4rem;
`

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerHeight = 100;
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
        // Блокируем скролл при открытом меню
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
    };

    return (
        <>
            <HeaderContainer ref={headerRef} isScrolled={isScrolled}>
                <Nav>
                    <Logo>Fayz Design</Logo>
                    <RightSection>
                        <NavLinks>
                            {[
                                { id: 'hero', label: 'Главная' },
                                { id: 'about', label: 'О нас' },
                                { id: 'services', label: 'Услуги' },
                                { id: 'projects', label: 'Проекты' },
                                { id: 'contact', label: 'Контакты' }
                            ].map(({ id, label }) => (
                                <NavLink
                                    key={id}
                                    href={`#${id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(id);
                                    }}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </NavLinks>
                        <MenuButton 
                            onClick={handleMenuClick}
                            aria-label="Toggle menu"
                        >
                            <span />
                            <span />
                        </MenuButton>
                    </RightSection>
                </Nav>
            </HeaderContainer>
            {isMenuOpen && (
                <MobileMenu isOpen={isMenuOpen} onClose={() => {
                    setIsMenuOpen(false);
                    document.body.style.overflow = 'unset';
                }} />
            )}
        </>
    );
};

export default Header
