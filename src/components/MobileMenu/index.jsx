import { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(var(--color-accent-rgb), 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const MenuHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuLogo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0;
  transform: translateY(-20px);
`;

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  opacity: 0;
  transform: translateY(-20px);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 1px;
    background: white;
    transition: transform 0.3s ease;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    &::before {
      transform: translate(-50%, -50%) rotate(225deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(135deg);
    }
  }
`;

const MobileNavLinks = styled.nav`
    font-family: 'Cormorant', serif;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

const MobileNavLink = styled.a`
    font-size: 1.5rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    opacity: 0;
    transform: translateY(20px);

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--color-accent);
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
    }
`;

const MobileMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      gsap.set('.mobile-menu-overlay', { visibility: 'visible' });
      
      // Анимация появления меню
      const tl = gsap.timeline();
      
      tl.to('.mobile-menu-overlay', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut'
      })
      .to(['.menu-logo', '.close-button'], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out',
        stagger: 0.1
      })
      .to('.mobile-nav-link', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out'
      });
    } else {
      gsap.to('.mobile-menu-overlay', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('.mobile-menu-overlay', { visibility: 'hidden' });
        }
      });
    }
  }, [isOpen]);

  const scrollToSection = (id) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 100;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  return (
    <MobileMenuOverlay className="mobile-menu-overlay" isOpen={isOpen}>
      <MenuHeader>
        <MenuLogo className="menu-logo">Fayz Design</MenuLogo>
        <CloseButton className="close-button" onClick={onClose} />
      </MenuHeader>
      <MobileNavLinks>
        {[
          { id: 'hero', label: 'Главная' },
          { id: 'about', label: 'О нас' },
          { id: 'services', label: 'Услуги' },
          { id: 'projects', label: 'Проекты' },
          { id: 'price', label: 'Наши тарифы' },
          { id: 'contact', label: 'Контакты' }
        ].map(({ id, label }) => (
          <MobileNavLink
            key={id}
            className="mobile-nav-link"
            onClick={() => scrollToSection(id)}
          >
            {label}
          </MobileNavLink>
        ))}
      </MobileNavLinks>
    </MobileMenuOverlay>
  );
};

export default MobileMenu;
