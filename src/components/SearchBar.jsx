import { useState } from "react";
import personajesData from "../data/personajes.json";


export default function SearchBar({ onSeleccionarPersonaje, deshabilitado }) {
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const manejarBusqueda = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (texto.trim().length > 0) {
      const filtrados = personajesData.filter((p) =>
        p.nombre.toLowerCase().includes(texto.toLowerCase()),
      );
      setSugerencias(filtrados);
      setMostrarMenu(true);
    } else {
      setSugerencias([]);
      setMostrarMenu(false);
    }
  };

  const manejarSeleccion = (personaje) => {
    onSeleccionarPersonaje(personaje);
    setBusqueda("");
    setMostrarMenu(false);
  };

  return (
    <div className="w-full max-w-md relative z-20">
      <input
        type="text"
        placeholder={
          deshabilitado
            ? "¡Juego terminado!"
            : "Escribe un personaje (ej. Cynthia)..."
        }
        value={busqueda}
        onChange={manejarBusqueda}
        disabled={deshabilitado} 
        className={`w-full bg-slate-800 border-2 rounded-xl py-3 px-4 text-white text-lg focus:outline-none transition-all shadow-lg placeholder-slate-500 
          ${deshabilitado ? "border-slate-700 opacity-50 cursor-not-allowed" : "border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"}`}
      />

      {mostrarMenu && sugerencias.length > 0 && !deshabilitado && (
        <ul className="absolute w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {sugerencias.map((personaje) => (
            <li
              key={personaje.id}
              onClick={() => manejarSeleccion(personaje)}
              className="px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors border-b border-slate-700/50 last:border-none"
            >
              {personaje.nombre}{" "}
              <span className="text-slate-500 text-sm ml-2">
                ({personaje.region})
              </span>
            </li>
          ))}
        </ul>
      )}

      {mostrarMenu &&
        sugerencias.length === 0 &&
        busqueda.length > 0 &&
        !deshabilitado && (
          <div className="absolute w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl px-4 py-3 text-slate-400">
            No se encontró ningún personaje.
          </div>
        )}
    </div>
  );
}
