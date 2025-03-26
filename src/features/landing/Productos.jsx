import Card from "../../shared/Card";

const Productos = () => {
  return (
    <section>
      <h1 className="text-5xl text-center mt-10 px-40">Productos.</h1>
      <p className="text-center mt-10 px-40 text-xl">
        Conoce nuestros productos y servicios.
      </p>
      <section className="flex justify-center mt-8 pl-15">
        <div className="grid grid-cols-2 grid-rows-3 gap-3 bg-gray-100 p-5 border rounded-2xl max-w-sm border-green-300">
          <img
            src="src\assets\react.svg"
            alt="imagen"
            className="row-span-3 w-full h-full"
          />
          <h2 className="text-3xl font-bold">Invent++</h2>
          <p className="text-xl">Sistema de inventario para tu empresa.</p>
        </div>
      </section>
      <section className="flex justify-center mt-8 pl-15">
        <div className="flex flex-wrap justify-center gap-8 p-8">
          <Card
            image="/src/assets/dev.jpg"
            title="Diego Moreno"
            subtitle="Frontend Developer"
            description="Apasionado por React y el diseño web."
            LinkedIn="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
            Github="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
          />
          <Card
            image="https://via.placeholder.com/150"
            title="Lina Maria"
            subtitle="FullStack Developer"
            description="Apasionada por React y el diseño web."
            LinkedIn="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
            Github="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
          />
        </div>
      </section>
    </section>
  );
};

export default Productos;
