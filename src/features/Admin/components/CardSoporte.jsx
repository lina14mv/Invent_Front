const CardSoporte = (props) => {
  return (
    <div
      key={props.id_ticked}
      draggable
      onDragStart={(evt) => startDrag(evt, item)}
      className={`rounded-lg border-2 ${
        props.prioridad === "baja"
          ? "bg-red-500"
          : item.prioridad === "media"
          ? "bg-yellow-400"
          : "bg-green-500"
      }
      `}
    >
      <strong className="text-lg">{props.asunto}</strong>
      <p className="text-sm">{props.descripcion}</p>
    </div>
  );
};

export default CardSoporte;