import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  const filePath = join(process.cwd(), "api", "personajes.json");
  const personajes = JSON.parse(readFileSync(filePath, "utf-8"));

  const fechaInicio = new Date("2026-08-01T00:00:00-06:00");
  const hoy = new Date();

  const diferenciaTiempo = hoy.getTime() - fechaInicio.getTime();
  const diasPasados = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));

  const indice = diasPasados % personajes.length;

  res.status(200).json(personajes[indice]);
}
