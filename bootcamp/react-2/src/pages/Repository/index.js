import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssueList, ListOptions, Button } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
    prevProps: PropTypes.shape({
      state: PropTypes.string,
      page: PropTypes.number,
    }),
  };

  static defaultProps = {
    prevProps: {
      state: 'all',
      page: 1,
    },
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { state, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  fetchData = async () => {
    const { match } = this.props;
    const { state, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    console.log(page);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        page,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  render() {
    const { repository, issues, loading, state, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <ListOptions>
          <div>
            <Button
              active={state === 'all' ? 1 : 0}
              onClick={async () => {
                await this.setState({ state: 'all' });
                this.fetchData();
              }}
            >
              All
            </Button>
            <Button
              active={state === 'open' ? 1 : 0}
              onClick={async () => {
                await this.setState({ state: 'open' });
                this.fetchData();
              }}
            >
              Open
            </Button>
            <Button
              active={state === 'closed' ? 1 : 0}
              onClick={async () => {
                await this.setState({ state: 'closed' });
                this.fetchData();
              }}
            >
              Closed
            </Button>
          </div>
          <div>
            <Button
              disabled={page === 1 ? 1 : 0}
              onClick={async () => {
                if (page > 1) {
                  await this.setState({ page: page - 1 });
                  this.fetchData();
                }
              }}
            >
              Prev
            </Button>
            <span>{page}</span>
            <Button
              onClick={async () => {
                if (issues.length <= 30) {
                  await this.setState({ page: page + 1 });
                  this.fetchData();
                }
              }}
            >
              Next
            </Button>
          </div>
        </ListOptions>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
