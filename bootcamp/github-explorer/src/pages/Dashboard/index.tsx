import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';

import logoImg from '../../assets/images/logo.svg';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="">
          <img src="" alt="" />
          <div>
            <strong />
            <p />
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};
