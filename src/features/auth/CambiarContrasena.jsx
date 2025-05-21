import React, { useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

const CambioContrasena = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+\-?&])[A-Za-z\d@$!%*+\-?&]{8,}$/;
    if (!regex.test(password)) {
      setError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.');
      return;
    }

    try {
      const correo = localStorage.getItem('correo');
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5002/api/cambiar-contrasena',
        { correo, nuevaContrasena: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        Notiflix.Notify.success('Contraseña cambiada con éxito');
        onSubmit();
      }
    } catch (err) {
      console.error(err);
      setError('Error al cambiar la contraseña.');
    }
  };

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semitransparente
          color: 'black',
          padding: '30px',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#467d08' }}>Cambiar contraseña</h2>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '10px',
                width: '100%',
                borderRadius: '10px',
                border: '1px solid #ccc',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#467d08')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                padding: '10px',
                width: '100%',
                borderRadius: '10px',
                border: '1px solid #ccc',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#467d08')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#467d08',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#356306')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#467d08')}
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </section>
  );
};

export default CambioContrasena;