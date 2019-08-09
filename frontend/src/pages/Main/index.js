import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import dislike from '../../assets/dislike.svg';
import like from '../../assets/like.svg';
import itsamatch from '../../assets/itsamatch.png';

import { MainContainer, Buttons, MatchContainer } from './styles';

export default function Main({ match }) {
  const { id: userId } = match.params;

  const [users, setUsers] = useState([]);
  const [matchDev, setmatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: userId },
      });
      setUsers(response.data);
    }

    loadUsers();
  }, [userId]);

  useEffect(() => {
    const socket = io('http://localhost:3333', { query: { user: userId } });

    socket.on('match', dev => {
      setmatchDev(dev);
    });
  }, [userId]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: userId },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: userId },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <MainContainer>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <Buttons>
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="" />
                </button>
              </Buttons>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}
      {matchDev && (
        <MatchContainer>
          <img src={itsamatch} alt="" />
          <img className="avatar" src={matchDev.avatar} alt="Avatar" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setmatchDev(null)}>
            FECHAR
          </button>
        </MatchContainer>
      )}
    </MainContainer>
  );
}
