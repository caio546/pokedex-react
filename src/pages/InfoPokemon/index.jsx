import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';

function InfoPokemon() {
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState();

  const location = useLocation();

  useEffect(() => {
    setName(location && location.state ? location.state.name : '');
  }, [location]);

  useEffect(() => {
    api.get(`/pokemons/${name}`).then(response => {
      setPokemon(response.data);
    });
  }, [name]);

  return (
    <div id="container">
      <Header />
      {pokemon && (
        <div>
          <img src={pokemon.image_url} alt={pokemon.name} />
          <h1>{`#${pokemon.number} ${pokemon.name}`}</h1>
          <ul>
            <li>{`Peso: ${pokemon.weight} kg`}</li>
            <li>{`Altura: ${pokemon.height} cm`}</li>
          </ul>
          {pokemon.kind &&
            pokemon.kind.split(';').map(kind1 => (
              <p className={`pokemon-type ${kind1}`} key={kind1}>
                {kind1.toUpperCase()}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}

export default InfoPokemon;
