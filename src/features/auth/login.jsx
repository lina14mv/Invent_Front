import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hacer la solicitud al backend
      const response = await axios.post('http://localhost:5000/api/empresa/login', {
        correo: email,
        contraseña: password,
      });

      if (response.status === 200) {
        // Guardar el token y el correo en localStorage
        //localStorage.setItem('token', response.data.token);
        localStorage.setItem('correo', email);  // Guardamos el correo también

        // Si el login es exitoso, pasa a la siguiente etapa
        onSubmit();
      }
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión, revisa tu correo o contraseña.');
    }
  };

  return (
    <section className="flex items-center justify-center h-screen min-h-screen">
    <div style={{ backgroundColor: 'white', color: 'black', padding: '20px', justifyContent: 'center', borderRadius: '25px', width: '50%', textAlign: 'center' }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
        <div> 
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%', borderRadius: '15px', objectPosition: 'center' }}
          />
        </div>
        <div> 
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%', borderRadius: '15px' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#467d08', color: 'white', padding: '10px 20px', borderRadius: '25px', width: '50%'}}>
          Iniciar sesión
        </button>
      </div>
      </form>
    </div>
    </section>
  );
};

export default Login;
