import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import { Form } from './styles';

import camera from '../../assets/camera.svg';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('price', price);
    data.append('techs', techs);

    await api.post('spots', data, {
      headers: { user_id },
    });

    history.push('/dashboard');
  }

  return (
    <Form thumbnail={thumbnail ? 1 : 0} onSubmit={handleSubmit}>
      <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }}>
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Selecionar imagem" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Nome da Empresa"
        value={company}
        onChange={e => setCompany(e.target.value)}
        type="text"
      />
      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        type="text"
      />
      <label htmlFor="price">
        VALOR DA DIÁRIA <span>(deixe em branco para Gratuito)</span>
      </label>
      <input
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={e => setPrice(e.target.value)}
        type="text"
      />
      <button type="submit">Criar</button>
    </Form>
  );
}
