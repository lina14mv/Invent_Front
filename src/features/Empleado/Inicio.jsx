import React from "react";

export const Inicio = () => {
  const cambiaColor = () => {
    document.documentElement.style.setProperty("--background-color", "yellow");
  };

  return (
    <>
      <section>
        <div className="h-full w-98">Hello Asalariao</div>
        <button onClick={cambiaColor} className="cursor-pointer">Holaa</button>
      </section>
    </>
  );
};
