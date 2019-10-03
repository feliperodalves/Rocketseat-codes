import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { List, Item, Container } from './styles';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('dashboard', {
        headers: { user_id },
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <Container>
      <List>
        {spots.map(spot => (
          <Item key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </Item>
        ))}
      </List>
      <Link to="/new">
        <button type="button">Cadastrar novo spot</button>
      </Link>
    </Container>
  );
}
