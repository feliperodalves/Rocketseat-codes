import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {
  const [github, setGithub] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      },
      (err) => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({ github, techs, lat: latitude, lng: longitude });

    setGithub('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github">Usuário do Github</label>
        <input
          name="github"
          id="github"
          required
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="lat">Latitude</label>
          <input
            type="number"
            name="lat"
            id="lat"
            required
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="lng">Longitude</label>
          <input
            type="number"
            name="lng"
            id="lng"
            required
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
