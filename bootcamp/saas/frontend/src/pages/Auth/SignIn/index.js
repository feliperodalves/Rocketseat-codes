import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

import { Container, SignForm } from '~/pages/Auth/styles';
import Button from '~/styles/components/Button';

const SignIn = ({ signInRequest }) => {
  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = useCallback(
    e => {
      setSigninData({ ...signinData, [e.target.name]: e.target.value });
    },
    [signinData],
  );

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      signInRequest(signinData.email, signinData.password);
    },
    [signinData.email, signinData.password, signInRequest],
  );

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Signin</h1>

        <span>E-mail</span>
        <input
          type='email'
          name='email'
          value={signinData.email}
          onChange={handleInputChange}
        />

        <span>Senha</span>
        <input
          type='password'
          name='password'
          value={signinData.name}
          onChange={handleInputChange}
        />

        <Button size='big' type='submit'>
          Acessar
        </Button>
      </SignForm>
    </Container>
  );
};

const mapsDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapsDispatchToProps)(SignIn);
