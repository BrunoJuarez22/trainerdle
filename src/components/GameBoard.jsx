export default function GameBoard({ intentos, personajeSecreto, haPerdido }) {
  const obtenerColor = (valorJugador, valorSecreto) => {
    if (valorJugador === valorSecreto) {
      return "bg-green-600 border-green-400 text-white";
    }
    return "bg-red-600 border-red-500 text-slate-200";
  };

  return (
    // Eliminamos el overflow-x-auto y ajustamos el padding para móviles
    <div className="mt-8 w-full max-w-5xl bg-slate-800/50 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-xl">
      {intentos.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-slate-500 text-lg md:text-xl font-medium text-center px-4">
            Busca un personaje para empezar a jugar
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:gap-3 w-full">
          {/* Encabezado: Oculto en móviles (hidden), visible en escritorio (md:grid) */}
          <div className="hidden md:grid grid-cols-5 gap-3 text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 px-2">
            <div className="text-center">Personaje</div>
            <div className="text-center">Región</div>
            <div className="text-center">Rol</div>
            <div className="text-center">Especialidad</div>
            <div className="text-center">Género</div>
          </div>

          {/* Renderizado de los intentos */}
          {intentos.map((intento) => (
            // Contenedor del intento: Tarjeta en móvil (bg-slate-800), fila transparente en escritorio
            <div
              key={intento.id}
              className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 p-3 md:p-0 bg-slate-800 md:bg-transparent rounded-xl md:rounded-none border md:border-none border-slate-700 shadow-sm md:shadow-none"
            >
              {/* Personaje: Ocupa las 2 columnas en móvil (col-span-2), 1 en escritorio */}
              <div
                className={`col-span-2 md:col-span-1 h-14 md:h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${intento.id === personajeSecreto.id ? "bg-green-600 border-green-400 text-white" : "bg-slate-700 border-slate-600 text-slate-200"}`}
                style={{ animationDelay: "0ms" }}
              >
                {intento.nombre}
              </div>

              {/* Resto de atributos: 1 columna en móvil, 1 en escritorio */}
              <div
                className={`h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.region, personajeSecreto.region)}`}
                style={{ animationDelay: "150ms" }}
              >
                {/* Etiqueta microscópica solo visible en móvil */}
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Región
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {intento.region}
                </span>
              </div>

              <div
                className={`h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.rol, personajeSecreto.rol)}`}
                style={{ animationDelay: "300ms" }}
              >
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Rol
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {intento.rol}
                </span>
              </div>

              <div
                className={`h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.especialidad, personajeSecreto.especialidad)}`}
                style={{ animationDelay: "450ms" }}
              >
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Especialidad
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {intento.especialidad}
                </span>
              </div>

              <div
                className={`h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 shadow-md animate-flip ${obtenerColor(intento.genero, personajeSecreto.genero)}`}
                style={{ animationDelay: "600ms" }}
              >
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Género
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {intento.genero}
                </span>
              </div>
            </div>
          ))}

          {/* Fila del Perdedor (Solución) con la misma lógica responsiva */}
          {haPerdido && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 animate-fade-in border-2 border-yellow-500 rounded-xl p-3 md:p-2 bg-yellow-500/10 mt-2 shadow-lg">
              <div className="col-span-2 md:col-span-1 h-14 md:h-20 rounded-xl flex items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white shadow-md">
                {personajeSecreto.nombre}
              </div>
              <div className="h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white shadow-md">
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Región
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {personajeSecreto.region}
                </span>
              </div>
              <div className="h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white shadow-md">
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Rol
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {personajeSecreto.rol}
                </span>
              </div>
              <div className="h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white shadow-md">
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Especialidad
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {personajeSecreto.especialidad}
                </span>
              </div>
              <div className="h-16 md:h-20 rounded-xl flex flex-col md:flex-row items-center justify-center font-bold text-center border-2 border-green-400 bg-green-600 text-white shadow-md">
                <span className="text-[10px] md:hidden font-normal opacity-75 uppercase tracking-wider mb-0.5">
                  Género
                </span>
                <span className="text-sm md:text-base leading-tight">
                  {personajeSecreto.genero}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
