import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
  min-height: 100vh;
  background-color: #ffffff;
  color: var(--color-text);
  padding: 8rem 2rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  line-height: 1.1;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const ContactDetails = styled.div`
  margin-top: 4rem;
`;

const ContactItem = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--color-accent);
  }
  
  p {
    font-size: 1.1rem;
  }
`;

const FormContainer = styled.div`
  background: #ffffff;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: var(--font-primary);

  &:focus {
    outline: none;
    border-bottom-color: var(--color-accent);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  font-family: var(--font-primary);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: var(--color-accent);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--color-accent);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(146, 121, 99, 0.2);
  }
`;

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Устанавливаем начальное состояние
    gsap.set([infoRef.current.children, formRef.current], {
      opacity: 0,
      y: 50
    });

    // Анимация для информационного блока
    gsap.to(infoRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Анимация для формы
    gsap.to(formRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
  };

  return (
    <ContactSection ref={sectionRef} id="contact">
      <Container>
        <ContactInfo ref={infoRef}>
          <Title>Давайте обсудим ваш проект</Title>
          <Description>
            Мы всегда открыты для обсуждения новых проектов и идей. 
            Свяжитесь с нами любым удобным способом, и мы ответим вам в ближайшее время.
          </Description>
          <ContactDetails>
            <ContactItem>
              <h3>Адрес</h3>
              <p>ул. Примерная, 123, Город</p>
            </ContactItem>
            <ContactItem>
              <h3>Email</h3>
              <p>info@fayzdesign.com</p>
            </ContactItem>
            <ContactItem>
              <h3>Телефон</h3>
              <p>+7 (999) 123-45-67</p>
            </ContactItem>
          </ContactDetails>
        </ContactInfo>
        <FormContainer ref={formRef}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input type="text" placeholder="Ваше имя" required />
            </InputGroup>
            <InputGroup>
              <Input type="email" placeholder="Email" required />
            </InputGroup>
            <InputGroup>
              <Input type="tel" placeholder="Телефон" />
            </InputGroup>
            <InputGroup>
              <TextArea placeholder="Расскажите о вашем проекте" required />
            </InputGroup>
            <SubmitButton type="submit">Отправить сообщение</SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact; 