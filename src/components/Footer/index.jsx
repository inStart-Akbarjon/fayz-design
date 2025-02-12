import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const FooterContainer = styled.footer`
    background-color: #080808;
    padding: 4rem 0 2rem;
    position: relative;
    overflow: hidden;
`

const FooterContent = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`

const FooterColumn = styled.div`
    color: #fff;
`

const FooterTitle = styled.h4`
    font-family: 'Mazzard H', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #fff, #666);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const FooterLink = styled(motion.a)`
    display: block;
    color: #888;
    margin-bottom: 0.8rem;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #fff;
    }
`

const Copyright = styled.div`
    text-align: center;
    color: #aaaaaa;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    span {
        font-family: 'Poppins', serif;
        color: #00bb06;
    }
    @media (max-width: 768px) {
        padding: 2rem 2rem 0rem 2rem;
    }
`

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterColumn>
                    <FooterTitle>О компании</FooterTitle>
                    <FooterLink href="#">О нас</FooterLink>
                    <FooterLink href="#">Наша команда</FooterLink>
                    <FooterLink href="#">Карьера</FooterLink>
                    <FooterLink href="#">Новости</FooterLink>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Услуги</FooterTitle>
                    <FooterLink href="#">Проектирование</FooterLink>
                    <FooterLink href="#">Дизайн интерьера</FooterLink>
                    <FooterLink href="#">Ландшафтный дизайн</FooterLink>
                    <FooterLink href="#">Консультации</FooterLink>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Проекты</FooterTitle>
                    <FooterLink href="#">Жилые комплексы</FooterLink>
                    <FooterLink href="#">Коммерческая недвижимость</FooterLink>
                    <FooterLink href="#">Частные дома</FooterLink>
                    <FooterLink href="#">Реконструкция</FooterLink>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Контакты</FooterTitle>
                    <FooterLink href="+937335000">+992 (93) 733-50-00</FooterLink>
                    <FooterLink href="mailto:info@example.com">sharifjonfaizulloev88@gmail.com</FooterLink>
                    <FooterLink href="#">ул. Наимджон Махмудов №1</FooterLink>
                </FooterColumn>
            </FooterContent>

            <Copyright>
                <p>
                    © 2024 Файз Дизайн. Все права защищены. Веб-сайт был создан компанией <span>Fayz-Innovation</span>
                </p>
            </Copyright>
        </FooterContainer>
    )
}

export default Footer
