import React from 'react';

import { MdAddCircle } from 'react-icons/md';
import { Container, List, Meetup } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>
        <button type="button">
          <MdAddCircle size={20} color="#fff" />
          Novo Meetup
        </button>
      </div>
      <List>
        <Meetup>
          <strong>Meetup de React Native</strong>
          <p>24 de Junho, às 20h</p>
        </Meetup>
        <Meetup>
          <strong>NodeJS Meetup</strong>
          <p>17 de Julho, às 13h</p>
        </Meetup>
        <Meetup>
          <strong>Rocketseat Meetup</strong>
          <p>30 de Agosto, às 20h</p>
        </Meetup>
        <Meetup>
          <strong>React on the house!</strong>
          <p>17 de Novembro, às 10h</p>
        </Meetup>
      </List>
    </Container>
  );
}
