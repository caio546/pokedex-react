/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Pokemon from '../../components/Pokemon';

import './styles.css';

function Main() {
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState();
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState();

  const location = useLocation();

  const getPokemons = useCallback(async () => {
    const response = await api.get('/pokemons', {
      params: {
        page,
      },
    });

    setPokemons(response.data);
  }, [page]);

  const getUserInfo = useCallback(async () => {
    const response = await api.get(`/users/${username}`);

    setUserInfo(response.data);
  }, [username]);

  const handleNextPage = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setPage(prevState => prevState - 1);
  }, []);

  const previousPage = useMemo(() => {
    return page !== 1 ? page - 1 : null;
  }, [page]);

  const nextPage = useMemo(() => {
    return page !== 33 ? page + 1 : null;
  }, [page]);

  useEffect(() => {
    setUsername(location.state ? location.state.username : '');

    getPokemons();
  }, [location, getPokemons]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div id="container">
      <Header />

      <section className="profile-container">
        <span className="profile-text">{userInfo && userInfo.user && `@${userInfo.user.username}`}</span>
        <img src="https://images.unsplash.com/photo-1585251309844-3eec340559ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="Foto do perfil" className="profile-image" />

        <nav>
          <ul className="menu">
            <li className="nav-item">
              <Link to="/main">
                Pokédex
              </Link>
            </li>
            <li className="nav-item">
              <Link to={{
                pathname: '/favourites',
                state: {username: userInfo && userInfo.user ? userInfo.user.username : username}
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
          pokemons.data.map(({image_url, name, id, kind}) => (
            <Pokemon key={id} image={image_url} name={name} id={id} kind={kind} starred={false} username={username} />
        ))}
      </div>

      <nav>
        <ul className="pagination-menu">
          {previousPage && (
            <li className="pagination-menu-item">
              <button type="button" onClick={handlePreviousPage}>
                {previousPage}
              </button>
            </li>
          )}
          <li>
            <span>
              {page}
            </span>
          </li>
          {nextPage && (
            <li className="pagination-menu-item">
              <button type="button" onClick={handleNextPage}>
                {nextPage}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Main;
