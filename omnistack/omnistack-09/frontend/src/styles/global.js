import styled, { createGlobalStyle } from 'styled-components';

import background from '../assets/background.jpg';

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    min-height: 100%;
  }

  body {
    background: #000 url(${background});
    background-size: cover;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-size: 14px;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }

  button{
    cursor: pointer;
  }
`;

export const Container = styled.div`
  margin: 80px auto 0;
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 100%;
    background: #fff;
    margin-top: 50px;
    border-radius: 4px;
    padding: 30px;

    > p {
      font-size: 22px;
      line-height: 30px;
      margin-bottom: 30px;
    }
  }
`;
