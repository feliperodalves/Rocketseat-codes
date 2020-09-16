import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';

import { Container, Project } from './styles';
import Button from '~/styles/components/Button';

const Projects = ({ getProjectsRequest, activeTeam, projects = [] }) => {
  useEffect(() => {
    if (activeTeam) {
      getProjectsRequest();
    }
  }, [activeTeam, getProjectsRequest]);

  if (!activeTeam) {
    return null;
  }

  return (
    <Container>
      <header>
        <h1>{activeTeam.name}</h1>
        <div>
          <Button type='button' onClick={() => {}}>
            + Novo
          </Button>
          <Button type='button' onClick={() => {}}>
            Membros
          </Button>
        </div>
      </header>

      {projects.data.map(project => (
        <Project key={project.id}>
          <p>{project.title}</p>
        </Project>
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
});

const mapsDispatchToProps = dispatch =>
  bindActionCreators(ProjectsActions, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Projects);
