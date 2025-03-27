import React, { useState } from 'react';
import Login from '../features/auth/login'
import Navbar from "/src/features/landing/components/navbar";
import CodeVerification from '../features/auth/codeVerificationLogin';
import PasswordChange from '../features/auth/passwordChange';

const App = () => {
  const [step, setStep] = useState('login'); // Estados: login, code, changePassword

  const handleLoginSubmit = () => {
    console.log('Login exitoso');
    // Si el login es exitoso, pasa a la siguiente etapa
    setStep('code');
  };

  const handleCodeSubmit = () => {
    console.log('Código validado');
    // Si el código es correcto, pasa a la siguiente etapa
    setStep('changePassword');
  };

  const handlePasswordSubmit = () => {
    console.log('Contraseña cambiada');
    // Después de cambiar la contraseña, puede redirigir o finalizar el proceso
    alert('Proceso completado');
  };

  return (
    <>
      <header className="flex items-center justify-center top-0 left-0 w-full h-30 pr-10 bg-white shadow-md">
        <Navbar />
      </header>
      <div>
        {step === 'login' && <Login onSubmit={handleLoginSubmit} />}
        {step === 'code' && <CodeVerification onSubmit={handleCodeSubmit} />}
        {step === 'changePassword' && <PasswordChange onSubmit={handlePasswordSubmit} />}
      </div>
    </>
  );
};

export default App;
