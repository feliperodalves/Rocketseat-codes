import React, { useState } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import { LoginContainer } from './styles';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', { username });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev" />
        <input
          type="text"
          placeholder="Digite seu usuário do Hithub"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </LoginContainer>
  );
}
