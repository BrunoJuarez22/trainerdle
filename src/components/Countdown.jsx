import { useState, useEffect } from "react";

export default function Countdown() {
  const [tiempoRestante, setTiempoRestante] = useState("");

  useEffect(() => {
    const calcularTiempo = () => {
      const ahora = new Date();
      const manana = new Date(ahora);
      manana.setHours(24, 0, 0, 0);

      const diferencia = manana.getTime() - ahora.getTime();

      const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferencia / 1000 / 60) % 60);
      const segundos = Math.floor((diferencia / 1000) % 60);

      const horasStr = horas.toString().padStart(2, "0");
      const minStr = minutos.toString().padStart(2, "0");
      const segStr = segundos.toString().padStart(2, "0");

      setTiempoRestante(`${horasStr}:${minStr}:${segStr}`);
    };

    calcularTiempo();
    const intervalo = setInterval(calcularTiempo, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="text-slate-400 text-sm uppercase tracking-widest mb-2 font-bold">
        Tiempo hasta el próximo personaje
      </p>
      <div className="text-3xl font-mono font-bold text-yellow-500 bg-slate-800/80 px-6 py-3 rounded-xl border-2 border-yellow-500/30 shadow-lg">
        {tiempoRestante}
      </div>
    </div>
  );
}
