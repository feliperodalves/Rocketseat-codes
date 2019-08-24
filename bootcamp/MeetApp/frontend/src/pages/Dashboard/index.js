import React from 'react';

import { MdAddCircle, MdChevronRight } from 'react-icons/md';
import { Container, List } from './styles';

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
        <li>
          <strong>Meetup de React Native</strong>
          <div>
            <p>24 de Junho, às 20h</p>
            <button>
              <MdChevronRight size={25} color="#fff" />
            </button>
          </div>
        </li>
        <li>
          <strong>NodeJS Meetup</strong>
          <div>
            <p>17 de Julho, às 13h</p>
            <MdChevronRight size={25} color="#fff" />
          </div>
        </li>
        <li>
          <strong>Rocketseat Meetup</strong>
          <div>
            <p>30 de Agosto, às 20h</p>
            <MdChevronRight size={25} color="#fff" />
          </div>
        </li>
        <li>
          <strong>React on the house!</strong>
          <div>
            <p>17 de Novembro, às 10h</p>
            <MdChevronRight size={25} color="#fff" />
          </div>
        </li>
      </List>
    </Container>
  );
}
