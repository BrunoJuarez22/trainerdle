export default function ResultModal({
  mostrar,
  alCerrar,
  personajeSecreto,
  cantidadIntentos,
  haGanado,
}) {
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-800 border-2 border-yellow-500 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_40px_rgba(234,179,8,0.15)] relative">
        <button
          onClick={alCerrar}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2
          className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r mb-4 ${haGanado ? "from-red-500 to-yellow-500" : "from-slate-400 to-slate-600"}`}
        >
          {haGanado ? "¡Victoria!" : "¡Perdiste!"}
        </h2>

        <p className="text-slate-300 text-lg mb-8 font-medium">
          {haGanado ? (
            <>
              Adivinaste a{" "}
              <span className="text-white font-bold">
                {personajeSecreto.nombre}
              </span>{" "}
              en {cantidadIntentos}{" "}
              {cantidadIntentos === 1 ? "intento" : "intentos"}.
            </>
          ) : (
            <>
              El personaje misterioso era{" "}
              <span className="text-white font-bold">
                {personajeSecreto.nombre}
              </span>
              .
            </>
          )}
        </p>

        <button
          onClick={alCerrar}
          className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-slate-900 font-bold text-lg py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
