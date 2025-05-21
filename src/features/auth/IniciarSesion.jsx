import React, { useState } from 'react';
import axios from 'axios';

const IniciarSesion = ({ onSubmit, onPasswordRecovery }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a la ruta de actualizar activo antes de hacer login
    axios.post('http://localhost:5002/api/actualizar-activo-negocios');
      const response = await axios.post('http://localhost:5002/api/login', {
        correo: email,
        contraseña: password,
      });

      if (response.status === 200) {
        localStorage.setItem('correo', email);
        // localStorage.setItem('nombre', nombre);
        onSubmit();
      }
      
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión, revisa tu correo o contraseña.');
    }
  };

  return (
    <section className="flex justify-center items-center h-screen p-5">
      <div className="bg-white bg-opacity-80 text-black p-8 rounded-lg w-full max-w-md shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿Olvidaste tu contraseña?{' '}
          <span
            onClick={onPasswordRecovery}
            className="text-green-700 hover:underline cursor-pointer"
          >
            Recupérala aquí
          </span>
        </p>
      </div>
    </section>
  );
};

export default IniciarSesion;