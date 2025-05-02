import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import CardSoporte from "./components/CardSoporte";

const Soporte = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/ver-tickets")
      .then((response) => {
        setTask(response.data.tickets);
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, []);

  const getList = (list) => {
    return task.filter((item) => item.estado == list);
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", JSON.stringify(item));
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = (evt, estado) => {
    evt.preventDefault();

    const itemID = evt.dataTransfer.getData("itemID");
    const droppedItem = JSON.parse(itemID);

    const item = task.find((item) => item.id_ticket == droppedItem.id_ticket); // ← comparar correctamente

    const newState = task.map((item) => {
      if (item.id_ticket == droppedItem.id_ticket) {
        return { ...item, estado: estado };
      }
      return item;
    });

    if (item) {
      axios.put("http://localhost:5002/api/actualizar-ticket", {
        id_ticket: item.id_ticket,
        nuevo_estado: estado,
      });
      setTask(newState);
    } else {
      console.error("No se encontró el item con ID:", itemID);
    };

    
  };

  const Card = (item) => {
    return (
      <div
        key={item.id_ticked}
        draggable
        onDragStart={(evt) => startDrag(evt, item)}
        className={`rounded-lg border-2 ${
          item.prioridad === "baja"
            ? "bg-red-500"
            : item.prioridad === "media"
            ? "bg-yellow-400"
            : "bg-green-500"
        }
        `}
      >
        <strong className="text-lg">{item.asunto}</strong>
        <p className="text-sm">{item.descripcion}</p>
      </div>
    );
  };
  

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Soporte</h1>
        <i>
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
        </i>
      </div>
      <div className="flex columns-4 justify-evenly mt-8 text-xl h-full">
        <div className="px-4 text-center">
          <h3 className="text-red-500 text-2xl font-bold">Pendiente</h3>
          <div
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "abierto")}
            className="flex flex-col p-4 w-80 rounded-lg mt-3 gap-y-4 h-full"
          >
            {getList("abierto").map((item) => (
              Card(item)
            ))}
          </div>
        </div>
        <div className="px-4 text-center">
          <h3 className="text-yellow-500 text-2xl font-bold">Proceso</h3>
          <div
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "en progreso")}
            className="flex flex-col p-4 w-80 rounded-lg mt-3 gap-y-4 h-full"
          >
            {getList("en progreso").map((item) => (
              Card(item)
            ))}
          </div>
        </div>
        <div className="px-4 text-center">
          <h3 className="text-green-500 text-2xl font-bold">Finalizado</h3>
          <div
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "cerrado")}
            className="flex flex-col p-4 w-80 rounded-lg mt-3 gap-y-4 h-full"
          >
            {getList("cerrado").map((item) => (
              Card(item)
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Soporte;
