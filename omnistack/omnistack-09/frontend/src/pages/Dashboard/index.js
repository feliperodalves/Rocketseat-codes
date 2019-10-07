import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketIO from 'socket.io-client';
import api from '../../services/api';

import { List, Item, Container, Notifications } from './styles';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');

  const socket = useMemo(
    () =>
      socketIO('http://192.168.15.10:3333', {
        query: { user_id },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on('booking-request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('dashboard', {
        headers: { user_id },
      });

      setSpots(response.data);
    }

    async function loadRequests() {
      const response = await api.get('bookings', {
        headers: { user_id },
      });

      setRequests(response.data);
    }

    loadSpots();
    loadRequests();
  }, []);

  async function handleAccept(id) {
    await api.post(`bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <Container>
      {requests && (
        <Notifications>
          {requests.map(request => (
            <li key={request._id}>
              <p>
                <strong>{request.user.email}</strong> está solicitando uma
                reserva em <strong>{request.spot.company}</strong> para a data:
                <strong> {request.date}</strong>
              </p>
              <button
                className="accept"
                type="button"
                onClick={() => handleAccept(request._id)}
              >
                ACEITAR
              </button>
              <button
                className="reject"
                type="button"
                onClick={() => handleReject(request._id)}
              >
                REJEITAR
              </button>
            </li>
          ))}
        </Notifications>
      )}
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
