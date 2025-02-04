import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import React, { useState } from "react";

const CreateCash = ({ close }) => {
  const [data, setData] = useState({
    cash: 0,
    description: "",
    type: "input",
  });

  const handleData = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (data.cash === 0 || !data.type) {
        alert("No hay datos para enviar");
        return;
      }

      const response = await axios.post(`${baseUrl}/cash`, data);

      if (response?.status === 201) {
        alert("Creado con exito");
        close();
      } else {
        alert("Fallo al crear ingreso / egreso");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  console.log(data);

  return (
    <div className="absolute top-1/2 left-1/2  bg-slate-200 rounded-lg p-8 -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-end">
        <button
          className="flex justify-center items-center w-6 h-6 bg-red-500 p-2 rounded-full text-white"
          onClick={close}
        >
          X
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-center mt-6">Crear Ingreso / Egreso de dinero</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label>Cantidad</label>
            <input
              className="p-1 rounded-lg"
              onChange={(e) => handleData("cash", e.target.value)}
              type="number"
              placeholder="8500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Descripcion</label>
            <input
              className="p-1 rounded-lg"
              onChange={(e) => handleData("description", e.target.value)}
              type="text"
              placeholder="Ventas"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Tipo</label>
            <select
              className="p-1 rounded-lg"
              onChange={(e) => handleData("type", e.target.value)}
            >
              <option value="input">Entrada</option>
              <option value="output">Salida</option>
            </select>
          </div>
          <button
            disabled={data.cash === 0 || data.cash === "" || !data.type}
            onClick={handleSubmit}
            className={`text-white p-2 rounded-lg transition-colors ${
              data.cash === 0 || data.cash === "" || !data.type
                ? "bg-gray-400 cursor-not-allowed" // Deshabilitado
                : "bg-green-600 hover:bg-green-700" // Habilitado
            }`}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCash;
