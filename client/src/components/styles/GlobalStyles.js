import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: ${({ theme }) => theme.colors.body};
    font-family: ${({ theme }) => theme.fonts.defaultFont}
}

h1, h2, h3, h4, h5 {
    color: ${({ theme }) => theme.colors.heading};
}

p {
    color: ${({ theme }) => theme.colors.text}
}

li {
    list-style: none;
}

a {
    text-decoration: none;
    color ${({ theme }) => theme.colors.orangeBtn};
    transition: 0.2s ease all;
}

a:hover {
    color: ${({ theme }) => theme.colors.greenBtn};
}

`;

export default GlobalStyles;
