import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = useCallback(async () => {
    try {
      const response = await api.post('/users', {
        username,
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
    history.replace({
      pathname: '/main',
      state: { username },
    });
  }, [username, history]);

  return (
    <div className="App" id="container">
      <div id="content">
        <div>
          <form>
            <h1>Faça seu logon:</h1>

            <div>
              <input
                className="inputuser"
                placeholder="Usuário"
                onChange={e => setUsername(e.target.value)}
              />
              <input
                className="inputsenha"
                placeholder="Senha"
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </div>

            <button type="button" onClick={handleSubmit}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
