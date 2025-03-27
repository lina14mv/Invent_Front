import React, { useState } from 'react';
import axios from 'axios';

const PasswordChange = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que ambas contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Validar que la contraseña cumpla con los requisitos
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+\-?&])[A-Za-z\d@$!%*+\-?&]{8,}$/;
if (!regex.test(password)) {
  setError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*+-?&]).');
  return;
}

    try {
      // Obtener el correo guardado en el localStorage
      const correo = localStorage.getItem('correo');
      const token = localStorage.getItem('token');

      // Aquí debes hacer la solicitud para cambiar la contraseña
      const response = await axios.put('http://localhost:5000/api/empresa/cambiar-contrasena', {
        correo: correo, // Utiliza el correo del usuario que está logueado
        nuevaContrasena: password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Contraseña cambiada con éxito');
        onSubmit();
      }
    } catch (err) {
        console.error(err);
      setError('Error al cambiar la contraseña.');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}>
      <h2>Cambiar contraseña</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
        </div>
        <div>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#467d08', color: 'white', padding: '10px 20px' }}>
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
