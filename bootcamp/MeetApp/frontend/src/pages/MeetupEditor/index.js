import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import BannerInput from './BannerInput';
import DatePickerInput from './DatePickerInput';
import { Container, Loading } from './styles';

export default function MeetupEditor({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`/meetups/${id}`);
        const data = {
          title: response.data.title,
          description: response.data.description,
          datetime: parseISO(response.data.datetime),
          location: response.data.location,
          banner: {
            id: response.data.banner.id,
            url: response.data.banner.url,
            path: response.data.banner.path,
          },
        };

        setMeetup(data);
        setLoading(false);
      } catch (err) {
        toast.error('Ocorreu um erro ao tentar editar o meetup');
        history.push('/dashboard');
      }
    }

    if (id) {
      setLoading(true);
      loadMeetup();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`/meetups/${id}`, data);
        toast.success('Meetup atualizado com sucesso');
        history.push(`/meetup/details/${id}`);
      } else {
        await api.post('/meetups', data);
        toast.success('Meetup cadastrado com sucesso');
        history.push(`/dashboard`);
      }
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar cadastrar o meetup');
    }
  }

  const schema = Yup.object().shape({
    file_id: Yup.number()
      .transform(value => (!value ? undefined : value))
      .required('Banner do evento é obrigatório'),
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    datetime: Yup.date().required('Data do meetup é obrigatória'),
    location: Yup.string().required('Localização é obrigatória'),
  });

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input name="description" placeholder="Descrição completa" multiline />
        <DatePickerInput name="datetime" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <MdSave size={24} color="#fff" />
          {id ? 'Atualizar Meetup' : 'Salvar Meetup'}
        </button>
      </Form>
    </Container>
  );
}

MeetupEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};

MeetupEditor.defaultProps = {
  match: PropTypes.any,
};
