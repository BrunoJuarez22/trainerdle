import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  // El servidor lee el JSON secreto de forma segura sin enviarlo al navegador
  const filePath = join(process.cwd(), "api", "personajes.json");
  const personajes = JSON.parse(readFileSync(filePath, "utf-8"));

  // Ajustamos el reloj para que el corte sea a la medianoche (CST -06:00)
  const fechaInicio = new Date("2026-08-01T00:00:00-06:00");
  const hoy = new Date();

  const diferenciaTiempo = hoy.getTime() - fechaInicio.getTime();
  const diasPasados = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));

  // La matemática ahora ocurre en Vercel, lejos de los inspectores de código
  const indice = diasPasados % personajes.length;

  // Solo devolvemos a la víctima de hoy
  res.status(200).json(personajes[indice]);
}
