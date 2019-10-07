import React from 'react';

import GlobalStyle, { Container } from './styles/global';
import logo from './assets/logo.svg';
import Routes from './routes';

function App() {
  return (
    <>
      <Container>
        <img src={logo} alt="AirCnC" />
        <div className="content">
          <Routes />
        </div>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
