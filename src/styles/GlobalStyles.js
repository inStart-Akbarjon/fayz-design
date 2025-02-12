import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.cdnfonts.com/css/mazzard');
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  :root {
    --color-bg: #f5f5f5;
    --color-text: #1a1a1a;
    --color-accent:rgb(65, 55, 46); // теплый архитектурный акцент
    --color-secondary:rgb(6, 18, 41);
    --font-primary: 'Mazzard H', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size: 16px;
    overflow-x: hidden;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior: none;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #0f0f0f;
    position: relative;
    font-family: var(--font-primary);
    color: var(--color-text);
    line-height: 1.5;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  #root {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-primary);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background-color: var(--color-accent);
    color: #ffffff;
  }

  html.has-scroll-smooth {
    overflow: hidden;
  }

  .has-scroll-smooth body {
    overflow: hidden;
  }

  [data-scroll-container] {
    transform-style: preserve-3d;
    will-change: transform;
  }

  .project-card {
    will-change: transform;
    transform-style: preserve-3d;
  }

  .project-section {
    overflow: hidden;
  }

  .project-container {
    transform-style: preserve-3d;
    will-change: transform;
  }

  section {
    position: relative;
    z-index: 1;
  }
`

export default GlobalStyles
