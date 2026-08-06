export default function GameBoard({ intentos, personajeSecreto, haPerdido }) {
  const obtenerColor = (valorJugador, valorSecreto) => {
    if (valorJugador === valorSecreto) {
      return "bg-green-600 border-green-400 text-white";
    }
    return "bg-red-600 border-red-500 text-slate-200";
  };

  return (
    <div className="mt-12 w-full max-w-5xl bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl overflow-x-auto">
      {intentos.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-slate-500 text-xl font-medium">
            Busca un personaje para empezar a jugar
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 min-w-[700px]">
          <div className="flex gap-3 text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 px-2">
            <div className="w-1/5 text-center">Personaje</div>
            <div className="w-1/5 text-center">Región</div>
            <div className="w-1/5 text-center">Rol</div>
            <div className="w-1/5 text-center">Especialidad</div>
            <div className="w-1/5 text-center">Género</div>
          </div>

          {intentos.map((intento) => (
            <div key={intento.id} className="flex gap-3">
              <div
                className={`w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${intento.id === personajeSecreto.id ? "bg-green-600 border-green-400 text-white" : "bg-slate-700 border-slate-600 text-slate-200"}`}
                style={{ animationDelay: "0ms" }}
              >
                {intento.nombre}
              </div>

              <div
                className={`w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.region, personajeSecreto.region)}`}
                style={{ animationDelay: "150ms" }}
              >
                {intento.region}
              </div>

              <div
                className={`w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.rol, personajeSecreto.rol)}`}
                style={{ animationDelay: "300ms" }}
              >
                {intento.rol}
              </div>

              <div
                className={`w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.especialidad, personajeSecreto.especialidad)}`}
                style={{ animationDelay: "450ms" }}
              >
                {intento.especialidad}
              </div>

              <div
                className={`w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.genero, personajeSecreto.genero)}`}
                style={{ animationDelay: "600ms" }}
              >
                {intento.genero}
              </div>
            </div>
          ))}

          {haPerdido && (
            <div className="flex gap-3 animate-fade-in border-2 border-yellow-500 rounded-xl p-1 bg-yellow-500/10 mt-4">
              <div className="w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white">
                {personajeSecreto.nombre}
              </div>
              <div className="w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white">
                {personajeSecreto.region}
              </div>
              <div className="w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white">
                {personajeSecreto.rol}
              </div>
              <div className="w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white">
                {personajeSecreto.especialidad}
              </div>
              <div className="w-1/5 h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white">
                {personajeSecreto.genero}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
