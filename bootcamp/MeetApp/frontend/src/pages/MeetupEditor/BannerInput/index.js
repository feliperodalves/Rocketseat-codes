import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdAddAPhoto } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line
  }, [ref]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {!preview ? (
          <div className="icon-add">
            <MdAddAPhoto size={50} />
            <p>Selecionar Imagem</p>
          </div>
        ) : (
          <img src={preview} alt="Banner" />
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
