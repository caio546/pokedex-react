/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

function Pokemon({ image, name, id, kind, starred, username }) {
  const handleFavorite = useCallback(async () => {
    await api.post(`/users/${username}/starred/${name}`);
  }, [name, username]);

  const handleRemoveFavorite = useCallback(async () => {
    await api.delete(`/users/${username}/starred/${name}`);
  }, [name, username]);

  return (
    <>
      <Link
        to={{
          pathname: '/infopokemon',
          state: { name },
        }}
        className="pokemon"
        key={id}
      >
        <img src={image} alt={name} className="pokemon-image" />
        <div className="pokemon-info">
          <span className="pokemon-name">{`#${id} ${name}`}</span>
          <div className="pokemon-types">
            {kind &&
              kind.split(';').map(kind1 => (
                <span className={`pokemon-type ${kind1}`} key={kind1}>
                  {kind1.toUpperCase()}
                </span>
              ))}
          </div>
        </div>
      </Link>
      {starred ? (
        <button
          type="button"
          className="pokemon-favorite"
          onClick={handleRemoveFavorite}
        >
          <FiTrash />
        </button>
      ) : (
        <button
          type="button"
          className="pokemon-favorite"
          onClick={handleFavorite}
        >
          <FiStar />
        </button>
      )}
    </>
  );
}

export default Pokemon;
