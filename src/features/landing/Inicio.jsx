const Inicio = () => {
  return (
    <div className="flex items-center justify-between xl:flex-row flex-col gap-8 xl:px-20 px-0 xl:mx-0 mx-35 xl:pt-0 pt-10">
      <div className="xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-center xl:text-left xl:pr-15 pr-0">
        <span className="text-green-600 animate-pulse">Software </span>para
        pequeñas y medianas empresas<span className="text-green-600">.</span>
        <p className="xl:text-3xl lg:text-2xl md:text-xl sm:text-lg mt-6 xl:mt-10 xl:pr-30 pr-0">
          Revoluciona tu negocio con una moderna solución de punto de venta
          ideal para todo tipo de negocio
          <span className="text-green-600">.</span>
        </p>
      </div>
      <div className="flex justify-center flex-1 xl:pt-20 pt-0">
        <div className="flex xl:w-2xl w-xl justify-center shadow-2xl shadow-green-400">
          <img
            src="https://res.cloudinary.com/deucbjygt/image/upload/v1743115902/Dise%C3%B1o_sin_t%C3%ADtulo_1_fxv3kl.png"
            alt="imagen de fondo"
            className="xl:object-cover xl:w-full w-lg h-lg xl:h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
