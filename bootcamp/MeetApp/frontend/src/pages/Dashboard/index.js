import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAddCircle, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import { Container, List } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/organizer');

      if (!response) {
        return;
      }
      const result = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.datetime),
          "d 'de' MMMM', às' HH'h'",
          {
            locale: pt,
          }
        ),
      }));

      setMeetups(result);
    }
    loadMeetups();
  }, []);

  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>
        <button type="button" onClick={() => history.push('/meetup/new')}>
          <MdAddCircle size={20} color="#fff" />
          Novo Meetup
        </button>
      </div>
      <List>
        {meetups.map(meetup => (
          <li key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <p>{meetup.dateFormatted}</p>
              <Link to={`meetup/details/${meetup.id}`}>
                <MdChevronRight size={25} color="#fff" />
              </Link>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}
