import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import dislike from '../../assets/dislike.svg';
import like from '../../assets/like.svg';

import { MainContainer, Buttons } from './styles';

export default function Main({ match }) {
  const { id: userId } = match.params;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: userId }
      });
      setUsers(response.data);
    }

    loadUsers();
  }, [userId]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: userId }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: userId }
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
    </>
  );
}
