import { useRef, useEffect, useState } from 'react' // Add useState
import styled from 'styled-components'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { FaInstagram, FaTelegram, FaXTwitter } from 'react-icons/fa6' // Add this import

gsap.registerPlugin(ScrollTrigger)

const ContactSection = styled.section`
    background-color: #0f0f0f;
    position: relative;
    min-height: 100vh;
    padding: 100px 0;
    overflow: hidden;
`

const ContactGrid = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`

const TitleWrapper = styled.div`
    text-align: center;
    margin-bottom: 4rem;
`

const ContactTitle = styled.h2`
    font-size: clamp(2rem, 5vw, 4rem);
    color: white;
    font-family: 'Mazzard H', sans-serif;
    background: linear-gradient(45deg, #fff, #666);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
`

const ContactSubtitle = styled.p`
    color: #888;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    max-width: 600px;
    margin: 0 auto;
`

const ContactForm = styled(motion.form)`
    background: rgba(255, 255, 255, 0.03);
    padding: 3rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05));
        pointer-events: none;
        border-radius: 15px;
    }

    &::after {
        content: '';
        position: absolute;
        inset: -1px;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        border-radius: 15px;
        z-index: -1;
        animation: borderGlow 3s linear infinite;
    }

    @keyframes borderGlow {
        0%,
        100% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
    }
`

const FormGroup = styled.div`
    margin-bottom: 2rem;
`

const Label = styled.label`
    display: block;
    color: #fff;
    margin-bottom: 0.5rem;
    font-family: 'Mazzard H', sans-serif;
`

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(5px);

    &:focus {
        border-color: rgba(255, 255, 255, 0.3);
        outline: none;
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
`

const TextArea = styled(Input).attrs({ as: 'textarea' })`
    min-height: 150px;
    resize: vertical;
`

const SubmitButton = styled(motion.button)`
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #1a1a1a, #333);
    border: none;
    border-radius: 5px;
    color: #fff;
    font-family: 'Mazzard', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    }

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
`

const ContactInfo = styled(motion.div)`
    color: #fff;
`

const InfoCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.03);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transition: 0.5s;
    }

    &:hover::before {
        left: 100%;
    }
`

const InfoTitle = styled.h3`
    font-family: 'Mazzard H', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #fff, #888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const InfoText = styled.p`
    color: #aaa;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
        font-size: 1.2rem;
        color: #666;
    }
`

const Map = styled.div`
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 2rem;

    iframe {
        width: 100%;
        height: 100%;
        border: 0;
    }
`

const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
`

const SocialIcon = styled(motion.a)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }

    svg {
        width: 20px;
        height: 20px;
        color: #fff;
    }
`

const FormStatus = styled(motion.div)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 10px;
    background: ${props => (props.success ? 'rgba(0, 180, 0, 0.9)' : 'rgba(180, 0, 0, 0.9)')};
    color: white;
    z-index: 1000;
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`

const Contact = () => {
    const formRef = useRef()
    const infoRef = useRef()
    const [formStatus, setFormStatus] = useState(null)

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top center+=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse',
                },
            },
        )

        gsap.fromTo(
            infoRef.current,
            { x: 100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: 'top center+=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse',
                },
            },
        )
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        try {
            // Здесь будет логика отправки формы
            setFormStatus({ success: true, message: 'Сообщение успешно отправлено!' })
            e.target.reset() // Очищаем форму после успешной отправки

            // Автоматически скрываем сообщение через 3 секунды
            setTimeout(() => setFormStatus(null), 3000)
        } catch (error) {
            setFormStatus({ success: false, message: 'Ошибка при отправке. Попробуйте позже.' })
            setTimeout(() => setFormStatus(null), 3000)
        }
    }

    return (
        <ContactSection id="contact">
            {' '}
            {/* Убедимся, что ID установлен здесь */}
            <TitleWrapper>
                <ContactTitle>Свяжитесь с нами</ContactTitle>
                <ContactSubtitle>
                    Готовы обсудить ваш проект? Мы всегда на связи и готовы помочь воплотить ваши идеи в жизнь.
                </ContactSubtitle>
            </TitleWrapper>
            <ContactGrid>
                <ContactForm ref={formRef} onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Имя</Label>
                        <Input type="text" required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Номер телефона</Label>
                        <Input type="number" required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Сообщение</Label>
                        <TextArea required />
                    </FormGroup>
                    <SubmitButton whileTap={{ scale: 0.95 }} type="submit">
                        Отправить
                    </SubmitButton>
                </ContactForm>

                <ContactInfo ref={infoRef}>
                    <InfoCard>
                        <InfoTitle>Контактная информация</InfoTitle>
                        <InfoText>
                            Email: <span style={{ color: `#f0eeee` }}>sharifjonfaizulloev88@gmail.com</span>
                        </InfoText>
                        <InfoText>
                            Телефон: <span style={{ color: `#f0eeee` }}>+992 (93) 733-50-00</span>
                        </InfoText>
                        <InfoText>
                            Адрес:{' '}
                            <span style={{ color: `#f0eeee` }}>Б. Гафуровский район, ул. Наимджон Махмудов №1</span>
                        </InfoText>
                    </InfoCard>

                    <InfoCard>
                        <InfoTitle>Часы работы</InfoTitle>
                        <InfoText>Пн-Пт: 8:00 - 24:00</InfoText>
                        <InfoText>Воскресенье: Выходной</InfoText>
                    </InfoCard>

                    <Map>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377.03721825054973!2d69.76248013972878!3d40.193692637146384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDExJzM3LjMiTiA2OcKwNDUnNDQuOSJF!5e0!3m2!1sru!2s!4v1635789245844!5m2!1sru!2s"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </Map>

                    <SocialLinks>
                        <SocialIcon
                            href="https://www.instagram.com/fayzdesign/"
                            target="_blank"
                            whileHover={{ y: -3 }}
                            aria-label="Instagram">
                            <FaInstagram />
                        </SocialIcon>
                        <SocialIcon
                            href="https://t.me/fayzdesigntj"
                            target="_blank"
                            whileHover={{ y: -3 }}
                            aria-label="Telegram">
                            <FaTelegram />
                        </SocialIcon>
                        <SocialIcon href="https://x.com/sharifjon_fayz" target="_blank" whileHover={{ y: -3 }}>
                            <FaXTwitter />
                        </SocialIcon>
                    </SocialLinks>
                </ContactInfo>
            </ContactGrid>
            {formStatus && (
                <FormStatus
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    success={formStatus.success}>
                    {formStatus.message}
                </FormStatus>
            )}
        </ContactSection>
    )
}

export default Contact
