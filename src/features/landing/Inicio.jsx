const Inicio = () => {
  return (
    <div className="flex items-center justify-between lg:flex-row flex-col gap-8 lg:px-20 px-0 lg:mx-0 mx-35 lg:pt-0 pt-4">
      <div className="xl:text-5xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold text-center lg:text-left xl:pr-15 pr-0">
        <span className="text-green-600 animate-pulse">Software </span>para
        pequeñas y medianas empresas<span className="text-green-600">.</span>
        <p className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm mt-4 lg:mt-10 lg:pr-30 pr-0">
          Revoluciona tu negocio con una moderna solución de punto de venta
          ideal para todo tipo de negocio
          <span className="text-green-600">.</span>
        </p>
      </div>
      <div className="flex justify-center items-center lg:pt-20 pt-0">
        <div className="flex lg:w-lg w-sm justify-center shadow-2xl shadow-green-400">
          <img
            src="https://res.cloudinary.com/deucbjygt/image/upload/v1743115902/Dise%C3%B1o_sin_t%C3%ADtulo_1_fxv3kl.png"
            alt="imagen de fondo"
            className="lg:object-cover lg:w-md lg:h-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
