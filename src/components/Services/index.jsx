import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = styled.section`
  min-height: 100vh;
  background-color: var(--color-secondary);
  color: #fff;
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 4rem;
  text-align: center;
  opacity: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: var(--color-accent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1);
  opacity: 0;
  transform: translateY(30px);

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    transform: none;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    background: var(--color-accent);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-heading);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ServiceTag = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  background: var(--color-accent);
  border-radius: 20px;
  margin-bottom: 1rem;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  margin-top: 1rem;
  opacity: 0.8;
  
  li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    
    &:before {
      content: '•';
      color: var(--color-accent);
      margin-right: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    margin-top: 0.8rem;
    
    li {
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
    }
  }
`;

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      title: 'Архитектурное проектирование',
      description: 'Создаем уникальные архитектурные решения, объединяющие эстетику, функциональность и инновации',
      icon: '🏛️',
      tag: 'Комплексный подход',
      features: [
        'Концептуальное проектирование',
        'Рабочая документация',
        'Авторский надзор',
        'Согласование проектов'
      ]
    },
    {
      title: 'Интерьерный дизайн',
      description: 'Разрабатываем эстетичные и функциональные интерьерные решения, отражающие вашу индивидуальность',
      icon: '🎨',
      tag: 'Под ключ',
      features: [
        'Планировочные решения',
        'Подбор материалов и мебели',
        'Визуализация интерьера',
        'Строительные чертежи'
      ]
    },
    {
      title: 'Ландшафтный дизайн',
      description: 'Создаем гармоничные outdoor пространства, интегрированные с архитектурой и природой',
      icon: '🌳',
      tag: 'Eco-friendly',
      features: [
        'Генеральный план участка',
        'Дендрологический проект',
        'Системы полива',
        'Ландшафтное освещение'
      ]
    },
    {
      title: '3D Визуализация',
      description: 'Создаем фотореалистичные визуализации проектов с вниманием к деталям и материалам',
      icon: '💻',
      tag: 'Реалистично',
      features: [
        'Экстерьерная визуализация',
        'Интерьерная визуализация',
        'Анимация проекта',
        'VR-презентации'
      ]
    },
    {
      title: 'Реконструкция и реставрация',
      description: 'Обновляем и восстанавливаем существующие здания с сохранением их исторической ценности',
      icon: '🏰',
      tag: 'Сохраняем наследие',
      features: [
        'Техническое обследование',
        'Проект реставрации',
        'Усиление конструкций',
        'Адаптация под современное использование'
      ]
    },
    {
      title: 'Строительный консалтинг',
      description: 'Предоставляем экспертные консультации по всем аспектам строительства и проектирования',
      icon: '📋',
      tag: 'Экспертиза',
      features: [
        'Техническая экспертиза',
        'Оптимизация проектов',
        'Подбор подрядчиков',
        'Управление проектами'
      ]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ServicesSection ref={sectionRef} id="services">
      <Container>
        <Title ref={titleRef}>Наши услуги</Title>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              ref={el => cardsRef.current[index] = el}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTag>{service.tag}</ServiceTag>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;