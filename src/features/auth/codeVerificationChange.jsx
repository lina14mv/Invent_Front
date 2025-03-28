import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeVerificationChange = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Recuperar el correo y el tipo de usuario desde localStorage
    const storedEmail = localStorage.getItem('correo');
    const storedTipo = localStorage.getItem('tipo');
    if (storedEmail) setEmail(storedEmail);
    if (storedTipo) setTipo(storedTipo);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/verificar-codigo-cambio', {
        correo: email,
        tipo: tipo,
        codigo: code,
      });

      if (response.status === 200) {
        setSuccess('Código verificado correctamente. Redirigiendo al cambio de contraseña...');
        setError('');
        onSubmit(); // Avanzar al siguiente paso (cambio de contraseña)
      }
    } catch (err) {
      console.error(err);
      setError('El código es incorrecto o ha expirado. Por favor, intenta nuevamente.');
      setSuccess('');
    }
  };

  return (
    <section className="flex justify-center items-center h-screen p-5">
      <div className="bg-white bg-opacity-80 text-black p-8 rounded-lg w-full max-w-md shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Verificación de código</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">Código de verificación</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300"
          >
            Verificar código
          </button>
        </form>
      </div>
    </section>
  );
};

export default CodeVerificationChange;