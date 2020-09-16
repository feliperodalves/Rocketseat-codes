import React, { useEffect } from 'react';
import api from '~/services/api';
import TeamSwitcher from '~/components/TeamSwitcher';

import { Container } from './styles';
import Projects from '~/components/Projects';

const Main = () => {
  return (
    <Container>
      <TeamSwitcher />
      <Projects />
    </Container>
  );
};

export default Main;
