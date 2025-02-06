"use client";

import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    const requestData = {};
    if (startDate) requestData.from = startDate.toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'
    if (endDate) requestData.to = endDate.toISOString().split("T")[0];

    axios
      .post(`${baseUrl}/cash/getCash`, requestData)
      .then((response) => {
        setData(response?.data?.getCash);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = async (id) => {
    const isConfirm = confirm(`Seguro que deseas eliminar?`);

    if (isConfirm) {
      setLoading(true);

      try {
        const response = await axios.delete(`${baseUrl}/cash/${id}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        handleSubmit();
        setLoading(false); // Desactivar el loading al finalizar
      }
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 pb-20 gap-16 sm:p-20">
      <div className="flex justify-center">
        <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      </div>
      <h1 className="text-center">Buscar por fechas</h1>
      <div className="flex gap-8 flex-col ">
        <div className="flex justify-center  gap-2 items-center flex-wrap overflow-x-hidden">
          <div className="w-full sm:w-auto flex flex-col items-center ">
            <h2>Desde: </h2>
            <DatePicker
              className="bg-slate-200 p-1 rounded-lg"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Seleccionar fecha de inicio"
            />
          </div>
          <div className="w-full sm:w-auto flex flex-col items-center">
            <h2>Hasta (opcional): </h2>
            <DatePicker
              className="bg-slate-200 p-1 rounded-lg"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Seleccionar fecha de fin"
              minDate={startDate}
            />
          </div>
        </div>
        <button
          className="w-full  rounded-lg text-white bg-green-600 p-4"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
      {data && (
        <div>
          <div>
            <p className="text-green-600">
              Total Entrada: $
              {data
                .filter((d) => d.type === "input")
                .reduce((acc, curr) => acc + curr.cash, 0)}
            </p>
            <p className="text-red-600">
              Total Salida: $
              {data
                .filter((d) => d.type === "output")
                .reduce((acc, curr) => acc + curr.cash, 0)}
            </p>

            <p
              className={`${
                data
                  .filter((d) => d.type === "input")
                  .reduce((acc, curr) => acc + curr.cash, 0) -
                  data
                    .filter((d) => d.type === "output")
                    .reduce((acc, curr) => acc + curr.cash, 0) <
                0
                  ? "text-yellow-600"
                  : "text-cyan-600"
              }`}
            >
              Diferencia: $
              {(
                data
                  .filter((d) => d.type === "input")
                  .reduce((acc, curr) => acc + curr.cash, 0) -
                data
                  .filter((d) => d.type === "output")
                  .reduce((acc, curr) => acc + curr.cash, 0)
              ).toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between gap-4 mt-6 bg-cyan-900 text-white rounded-lg p-2">
            <div className="w-full sm:w-1/2">
              <h2 className="text-center">Entradas</h2>
              {data
                .filter((d) => d.type === "input")
                .map((d) => (
                  <div
                    className="bg-green-500 mt-4 p-2 rounded-lg text-white flex flex-col"
                    key={d.id}
                  >
                    <button
                      className="self-end"
                      onClick={() => handleDelete(d.id)}
                    >
                      X
                    </button>
                    <p>Fecha: {d.createdAt.slice(0, 8)}</p>
                    <p>Descripcion: {d.description}</p>
                    <p>Tipo: Entrada</p>
                    <p>Total: ${d.cash}</p>
                  </div>
                ))}
            </div>

            <div className="w-full sm:w-1/2">
              <h2 className="text-center">Salidas</h2>
              {data
                .filter((d) => d.type === "output")
                .map((d) => (
                  <div
                    className="bg-red-500 flex flex-col mt-4 p-2 rounded-lg text-white"
                    key={d.id}
                  >
                    <button
                      className="self-end"
                      onClick={() => handleDelete(d.id)}
                    >
                      X
                    </button>
                    <p>Fecha: {d.createdAt.slice(0, 8)}</p>
                    <p>Descripcion: {d.description}</p>
                    <p>Tipo: Salida</p>
                    <p>Total: ${d.cash}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
