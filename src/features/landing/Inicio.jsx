const Inicio = () => {
  return (
    <div className="flex items-center justify-evenly xl:flex-row flex-col gap-8 xl:px-20 px-0 xl:mx-0 mx-35 xl:mt-0 mt-10">
      <div className="xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-center xl:text-left xl:pr-15 pr-0">
        <span className="text-green-600 animate-pulse">Software </span>para
        pequeñas y medianas empresas<span className="text-green-600">.</span>
        <p className="xl:text-3xl lg:text-2xl md:text-xl sm:text-lg mt-6 xl:mt-10 xl:pr-30 pr-0">
          Revoluciona tu negocio con una moderna solución de punto de venta
          ideal para todo tipo de negocio
          <span className="text-green-600">.</span>
        </p>
      </div>
      <div className="flex justify-center xl:pt-20 pt-0">
        <div className="flex xl:w-2xl w-xl justify-center">
          <img
            src="src\assets\Landing.png"
            alt="imagen de fondo"
            className="xl:object-cover xl:w-full w-lg h-lg xl:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
