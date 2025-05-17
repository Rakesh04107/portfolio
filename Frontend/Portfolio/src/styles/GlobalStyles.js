import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background: ${props => props.theme === 'dark' ? '#121212' : '#ffffff'};
    --text-primary: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
    --text-secondary: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background);
    color: var(--text-primary);
    transition: var(--transition);
    font-family: 'Inter', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme === 'dark' ? '#1e1e1e' : '#f1f1f1'};
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }
`;

export default GlobalStyles;