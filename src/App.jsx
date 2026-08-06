import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GameBoard from "./components/GameBoard";
import ResultModal from "./components/ResultModal";
import Footer from "./components/Footer";

function App() {
  const [intentos, setIntentos] = useState(() => {
    const guardados = window.localStorage.getItem("pokeWordleIntentos");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [personajeSecreto, setPersonajeSecreto] = useState(null);

  const [haGanado, setHaGanado] = useState(false);
  const [haPerdido, setHaPerdido] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    // Llamada segura a tu nuevo servidor de Vercel
    fetch("/api/daily")
      .then((res) => res.json())
      .then((personajeDiario) => {
        setPersonajeSecreto(personajeDiario);

        const intentoCorrecto = intentos.some(
          (p) => p.id === personajeDiario.id,
        );
        if (intentoCorrecto) {
          setHaGanado(true);
        } else if (intentos.length >= 5) {
          setHaPerdido(true);
        }
      })
      .catch((error) =>
        console.error("Error al conectar con el servidor:", error),
      );
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pokeWordleIntentos", JSON.stringify(intentos));
  }, [intentos]);

  const manejarNuevoIntento = (personajeSeleccionado) => {
    if (
      intentos.some((p) => p.id === personajeSeleccionado.id) ||
      haGanado ||
      haPerdido
    )
      return;

    const nuevosIntentos = [...intentos, personajeSeleccionado];
    setIntentos(nuevosIntentos);

    if (personajeSeleccionado.id === personajeSecreto.id) {
      setHaGanado(true);
      setTimeout(() => {
        setMostrarMensaje(true);
      }, 1500);
    } else if (nuevosIntentos.length >= 5) {
      setHaPerdido(true);
      setTimeout(() => {
        setMostrarMensaje(true);
      }, 1500);
    }
  };

  if (!personajeSecreto)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
        Cargando servidor...
      </div>
    );

  const juegoTerminado = haGanado || haPerdido;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-12 px-4 font-sans relative">
      <Header />
      <SearchBar
        onSeleccionarPersonaje={manejarNuevoIntento}
        deshabilitado={juegoTerminado}
      />

      {haGanado && (
        <div className="mt-6 bg-slate-800 border border-yellow-500/50 text-yellow-400 px-6 py-3 rounded-xl font-bold shadow-lg animate-fade-in">
          ¡Ganaste! Adivinaste el personaje en {intentos.length}{" "}
          {intentos.length === 1 ? "intento" : "intentos"}.
        </div>
      )}

      {haPerdido && (
        <div className="mt-6 bg-slate-800 border border-red-500/50 text-red-400 px-6 py-3 rounded-xl font-bold shadow-lg animate-fade-in">
          Agotaste tus 5 intentos. El personaje era {personajeSecreto.nombre}.
        </div>
      )}

      <GameBoard
        intentos={intentos}
        personajeSecreto={personajeSecreto}
        haPerdido={haPerdido}
      />
      <Footer />
      <ResultModal
        mostrar={mostrarMensaje}
        alCerrar={() => setMostrarMensaje(false)}
        personajeSecreto={personajeSecreto}
        cantidadIntentos={intentos.length}
        haGanado={haGanado}
      />
    </div>
  );
}

export default App;
