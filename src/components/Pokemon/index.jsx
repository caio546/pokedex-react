/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

function Pokemon({ image, name, id, kind }) {
  const handleFavorite = useCallback(() => {}, []);

  return (
    <>
      <Link to="/infopokemon" className="pokemon" key={id}>
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
      <button
        type="button"
        className="pokemon-favorite"
        onClick={handleFavorite}
      >
        <FiStar />
      </button>
    </>
  );
}

export default Pokemon;
