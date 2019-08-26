import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEdit, MdDeleteForever, MdPlace, MdEvent } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { Loading, Container, Details } from './styles';

export default function MeetupDetails({ match }) {
  const [meetup, setMeetup] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`/meetups/${match.params.id}`);
        setMeetup({
          ...response.data,
          formattedDate: format(
            parseISO(response.data.datetime),
            "d 'de' MMMM', às' HH'h'",
            {
              locale: pt,
            }
          ),
        });
        setLoading(false);
      } catch (err) {
        toast.error('Erro ao acessar os detalhes do meetup');
        setLoading(false);
        history.push('/dashboard');
      }
    }
    loadMeetup();
  }, [match.params.id]);

  async function deleteMeetup() {
    try {
      await api.delete(`/meetups/${match.params.id}`);
      history.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao cancelar o Meetup');
    }
  }

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <button
            type="button"
            onClick={() => history.push(`/meetup/editor/${meetup.id}`)}
            className="edit"
          >
            <MdEdit size={20} color="#fff" />
            Editar
          </button>
          <button type="button" onClick={deleteMeetup} className="cancel">
            <MdDeleteForever size={20} color="#fff" />
            Cancelar
          </button>
        </div>
      </header>
      <Details>
        <img src={meetup.banner.url} alt={meetup.title} />
        <p>{meetup.description}</p>
        <div>
          <MdEvent size={20} />
          <p>{meetup.formattedDate}</p>
          <MdPlace size={20} />
          <p>{meetup.location}</p>
        </div>
      </Details>
    </Container>
  );
}

MeetupDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
