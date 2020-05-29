import { createGlobalStyle } from 'styled-components';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=flow');

  * {
    margin:0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    background: #353940;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-family: 'Source Sans Pro', sans-serif;
    text-rendering: optimizeLegibility !important;
    color: #fff;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
