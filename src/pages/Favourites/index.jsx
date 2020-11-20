import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Pokemon from '../../components/Pokemon';

import './styles.css';

function Favourites() {
  const [username, setUsername] = useState('');
  const [pokemons, setPokemons] = useState();

  const location = useLocation();

  const getPokemons = useCallback(async () => {
    const { data } = await api.get(`/users/${username}`);

    setPokemons(data ? data.pokemons : '');
  }, [username]);

  useEffect(() => {
    setUsername(location.state.username);
  }, [location.state.username]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  return (
    <div id="container">
      <Header />

      <section className="profile-container">
        <nav>
          <ul className="menu">
            <li className="nav-item">
              <Link
                to={{
                  pathname: '/main',
                  state: { username },
                }}
              >
                Pokédex
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={{
                  pathname: '/favourites',
                  state: { username },
                }}
              >
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
      </section>

      <div className="pokemons-container">
        {pokemons &&
          pokemons.map(({ image_url, name, id, kind }) => (
            <Pokemon
              key={id}
              image={image_url}
              name={name}
              id={id}
              kind={kind}
              starred
              username={username}
            />
          ))}
      </div>
    </div>
  );
}

export default Favourites;
