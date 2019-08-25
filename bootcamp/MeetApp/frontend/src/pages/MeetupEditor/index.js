import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import BannerInput from './BannerInput';
import DatePickerInput from './DatePickerInput';
import { Container } from './styles';

export default function MeetupEditor() {
  async function handleSubmit(data) {
    try {
      await api.post('meetups', data);
      history.push(`/dashboard`);
      toast.success('Meetup cadastrado com sucesso');
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar o meetup');
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

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input name="description" placeholder="Descrição completa" multiline />
        <DatePickerInput name="datetime" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <MdSave size={24} color="#fff" />
          Salvar Meetup
        </button>
      </Form>
    </Container>
  );
}
