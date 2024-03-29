import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'Precisa ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="name" type="text" placeholder="Seu nome completo" />
        <Input name="email" type="text" placeholder="Seu email" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Criar</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
