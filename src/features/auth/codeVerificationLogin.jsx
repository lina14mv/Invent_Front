import React, { useState } from 'react';
import axios from 'axios';

const CodeVerification = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obtener el correo guardado en el localStorage
      const correo = localStorage.getItem('correo');

      // Hacer la solicitud al backend para validar el código
      const response = await axios.post('http://localhost:5000/api/empresa/validar-codigo', {
        correo: correo,
        codigoSesion: code,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
        // Si el código es correcto, pasa a la siguiente etapa
        onSubmit();
      }
    } catch (err) {
        console.error(err);
      setError('Código incorrecto. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}>
      <h2>Verificación de código</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Código de verificación</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#467d08', color: 'white', padding: '10px 20px' }}>
          Verificar código
        </button>
      </form>
    </div>
  );
};

export default CodeVerification;
