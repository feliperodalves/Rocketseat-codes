import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';

import { Container } from './styles';

export default function MeetupEditor() {
  return (
    <Container>
      <Form>
        {/** <AvatarInput name="avatar_id" /> */}
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Endereço de Email" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Senha antiga" />
        <Input name="password" type="password" placeholder="Nova Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de Senha"
        />
        <button type="submit">
          <MdSave size={24} color="#fff" />
          Atualizar perfil
        </button>
      </Form>
    </Container>
  );
}
