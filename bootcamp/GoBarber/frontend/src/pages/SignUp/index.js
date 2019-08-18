import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

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
  function handleSubmit(data) {}

  return (
    <>
      <img src={logo} alt="" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="name" type="text" placeholder="Seu nome completo" />
        <Input name="email" type="text" placeholder="Seu email" />
        <Input name="password" type="text" placeholder="Sua senha" />
        <Input
          name="confirmPassword"
          type="text"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Criar</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
