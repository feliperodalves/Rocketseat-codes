import React, { useState } from 'react';

import api from '../../services/api';

import { Form } from './styles';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{' '}
        <strong>talentos</strong> para sua empresa
      </p>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Acessar</button>
      </Form>
    </>
  );
}
