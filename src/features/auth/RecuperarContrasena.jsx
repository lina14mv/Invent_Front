import React, { useState } from 'react';
import axios from 'axios';

const RecuperarContraseña = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('usuario'); // Puede ser 'usuario', 'negocio', o 'administrador'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/enviar-codigo', {
        correo: email,
        tipo: tipo,
      });

      if (response.status === 200) {
        setSuccess('Código enviado al correo electrónico.');
        setError('');

        //Guardar el correo y el tipo de usuario en el almacenamiento local
        localStorage.setItem('correo', email);
        localStorage.setItem('tipo', tipo);
        
        onSubmit(); // Avanzar al siguiente paso (verificación del código)
      }
    } catch (err) {
      console.error(err);
      setError('Error al enviar el código. Verifique el correo y el tipo de usuario.');
      setSuccess('');
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
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'black',
          padding: '30px',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#467d08' }}>Recuperar contraseña</h2>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de usuario</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={{
                padding: '10px',
                width: '100%',
                borderRadius: '10px',
                border: '1px solid #ccc',
              }}
            >
              <option value="usuario">Usuario</option>
              <option value="negocio">Negocio</option>
              <option value="administrador">Administrador</option>
            </select>
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
            Enviar código
          </button>
        </form>
      </div>
    </section>
  );
};

export default RecuperarContraseña;