const Somos = () => {
  return (
    <section>
      <h1 className="text-5xl text-center mt-20 px-40">
        Empoderamos tu negocio con tecnología sencilla y eficiente.
      </h1>
      <section className="flex justify-center gap-10 mt-20 flex-wrap px-7">
        <div className="flex flex-col bg-green-300 w-sm p-10 gap-5 rounded-4xl hover:border text-xl delay-150">
          <h1 className="text-center text-3xl font-semibold">Valores</h1>
          <p>
            En Invent++ nos enfocamos en la calidad y el servicio al cliente.
          </p>
          <ul className="list-disc list-inside">
            <li>Calidad</li>
            <li>Servicio</li>
            <li>Compromiso</li>
            <li>Responsabilidad</li>
            <li>Respeto</li>
          </ul>
        </div>
        <div className="flex flex-col bg-green-300 w-sm p-10 gap-5 rounded-4xl hover:border text-xl delay-150">
          <h1 className="text-center text-3xl font-semibold">Mision</h1>
          <p>
            Revolucionar la gestión de pequeños negocios con tecnología
            intuitiva y poderosa, permitiendo que cada emprendedor tenga el
            control total de sus ventas, inventario y clientes sin
            complicaciones. Queremos que tu negocio crezca con herramientas
            accesibles, automatizadas y diseñadas para tu éxito.
          </p>
        </div>
        <div className="flex flex-col bg-green-300 w-sm p-10 gap-5 rounded-4xl hover:border text-xl delay-150">
          <h1 className="text-center text-3xl font-semibold">
            Porque elegirnos?
          </h1>
          <ul className="list-disc list-inside">
            <li>Fácil y rápido de usar</li>
            <li>Control total de ventas e inventario</li>
            <li>Automatización inteligente</li>
            <li>Accesible desde cualquier lugar</li>
            <li>Crece con nosotros</li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Somos;
