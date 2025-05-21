import React, { useState, useEffect } from 'react';
import IniciarSesion from '../features/auth/IniciarSesion';
import VerificarCodigo from '../features/auth/VerificarCodigo';
import CambiarContrasena from '../features/auth/CambiarContrasena';
import RecuperarContrasena from '../features/auth/RecuperarContrasena';
import CodeVerificationChange from '../features/auth/codeVerificationChange';
import Notiflix from 'notiflix';

const LoginPage = () => {
  const [step, setStep] = useState('login'); // Estados: login, passwordRecovery, code, codeRecovery, changePassword
  const [currentImage, setCurrentImage] = useState('https://res.cloudinary.com/deucbjygt/image/upload/v1743107783/Login1_bwjjrg.png');

  useEffect(() => {
    // Alternar entre las dos imágenes cada 5 segundos
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === 'https://res.cloudinary.com/deucbjygt/image/upload/v1743107783/Login1_bwjjrg.png'
          ? 'https://res.cloudinary.com/deucbjygt/image/upload/v1743107944/Dise%C3%B1o_sin_t%C3%ADtulo_xxaj7y.png'
          : 'https://res.cloudinary.com/deucbjygt/image/upload/v1743107783/Login1_bwjjrg.png'
      );
    }, 5000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const handleLoginSubmit = () => {
    console.log('Login exitoso');
    setStep('code'); // Cambiar al paso de verificación de código después de iniciar sesión
  };

  const handleCodeSubmit = () => {
    console.log('Código validado');
    setStep('changePassword'); // Cambiar al paso de cambio de contraseña
  };

  const handlePasswordSubmit = () => {
    console.log('Contraseña cambiada');
    Notiflix.Notify.success('Proceso completado');
    setStep('login'); // Volver al inicio de sesión después de cambiar la contraseña
  };

  const handlePasswordRecovery = () => {
    console.log('Recuperación de contraseña iniciada');
    setStep('passwordRecovery'); // Cambiar al paso de recuperación de contraseña
  };

  const handleRecoverySubmit = () => {
    console.log('Código enviado para recuperación');
    setStep('codeRecovery'); // Cambiar al paso de verificación de código después de recuperación de contraseña
  };

  const handleCodeRecoverySubmit = () => {
    console.log('Código validado para recuperación');
    setStep('changePassword'); // Cambiar al paso de cambio de contraseña después de recuperación
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/deucbjygt/image/upload/v1743108025/Login_jodkcr.png)' }}>
      {/* Contenedor principal */}
      <div className="w-11/12 h-4/5 flex shadow-lg rounded-lg overflow-hidden">
        {/* Parte izquierda con la imagen alternante */}
        <div
          className="flex-1 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>

        {/* Parte derecha con el contenido dinámico */}
        <div className="flex-1 flex justify-center items-center p-5">
          <div className="w-4/5 text-center">
            {step === 'login' && <IniciarSesion onSubmit={handleLoginSubmit} onPasswordRecovery={handlePasswordRecovery} />}
            {step === 'passwordRecovery' && <RecuperarContrasena onSubmit={handleRecoverySubmit} />}
            {step === 'code' && <VerificarCodigo onSubmit={handleCodeSubmit} />}
            {step === 'codeRecovery' && <CodeVerificationChange onSubmit={handleCodeRecoverySubmit} />}
            {step === 'changePassword' && <CambiarContrasena onSubmit={handlePasswordSubmit} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;