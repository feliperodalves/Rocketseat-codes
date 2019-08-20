import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Seu nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas não correspondem'
  ),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password, confirmPassword }) {
    dispatch(signUpRequest(name, email, password, confirmPassword));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="name" type="text" placeholder="Seu Nome" />
        <Input name="email" type="text" placeholder="Seu email" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de Senha"
        />
        <button type="submit">{loading ? 'Criando...' : 'Criar'}</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
