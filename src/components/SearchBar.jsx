import { useState } from "react";
import personajesData from "../data/personajes.json";

export default function SearchBar({ onSeleccionarPersonaje, deshabilitado }) {
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  const manejarCambio = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.length > 0) {
      const filtrados = personajesData.filter((p) =>
        p.nombre.toLowerCase().includes(valor.toLowerCase()),
      );
      setSugerencias(filtrados);
    } else {
      setSugerencias([]);
    }
  };

  const seleccionar = (personaje) => {
    onSeleccionarPersonaje(personaje);
    setBusqueda("");
    setSugerencias([]);
  };

  return (
    // Contenedor principal con ancho máximo adaptativo
    <div className="w-full max-w-md mx-auto relative z-20 mt-4 mb-6 px-2">
      <input
        type="text"
        value={busqueda}
        onChange={manejarCambio}
        disabled={deshabilitado}
        placeholder={
          deshabilitado ? "Juego terminado" : "Escribe un personaje..."
        }
        // Clases optimizadas para móvil y modo oscuro
        className="w-full px-4 py-3 bg-slate-800 text-slate-100 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {sugerencias.length > 0 && (
        <ul className="absolute w-full left-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-30 divide-y divide-slate-700">
          {sugerencias.map((personaje) => (
            <li
              key={personaje.id}
              onClick={() => seleccionar(personaje)}
              // Área de clic amplia y cómoda para el pulgar
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex items-center transition-colors"
            >
              <span className="font-medium text-slate-200">
                {personaje.nombre}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
