import React, { useEffect, useCallback, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';
import AuthActions from '~/store/ducks/auth';

import { Container, TeamList, Team, NewTeam, Logout } from './styles';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';

const TeamSwitcher = ({
  getTeamsRequest,
  selectTeam,
  openTeamModal,
  closeTeamModal,
  createTeamRequest,
  teams = [],
  signOut,
}) => {
  const [newTeam, setNewTeam] = useState('');

  useEffect(() => {
    getTeamsRequest();
  }, [getTeamsRequest]);

  const handleSelectTeam = useCallback(
    team => {
      selectTeam(team);
    },
    [selectTeam],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      createTeamRequest(newTeam);
    },
    [createTeamRequest, newTeam],
  );

  return (
    <Container>
      <TeamList>
        {teams.data.map(team => (
          <Team key={team.id} onClick={() => handleSelectTeam(team)}>
            <img
              src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`}
              alt={team.name}
            />
          </Team>
        ))}
        <NewTeam onClick={openTeamModal}>Novo</NewTeam>

        {teams.teamModalOpen && (
          <Modal>
            <h1>Criar Time</h1>
            <form onSubmit={handleSubmit}>
              <span>Nome:</span>
              <input
                type='text'
                name='newTeam'
                value={newTeam}
                onChange={e => setNewTeam(e.target.value)}
              />
              <Button size='big' type='submit'>
                Salvar
              </Button>
              <Button
                size='small'
                type='button'
                color='gray'
                onClick={closeTeamModal}
              >
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
      </TeamList>

      <Logout onClick={signOut}>Sair</Logout>
    </Container>
  );
};

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapsDispatchToProps = dispatch =>
  bindActionCreators({ ...TeamsActions, ...AuthActions }, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(TeamSwitcher);
