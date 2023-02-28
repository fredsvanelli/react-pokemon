import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 62.5%;
    }

    html, body, #root {
        min-height: 100vh;
    }

    body {
        font-size: 1.6rem;
        font-weight: 400;
    }

    a, a:hover { color: inherit; }
`;
