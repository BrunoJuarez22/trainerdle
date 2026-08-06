import Countdown from "./Countdown";

export default function Header() {
  return (
    <header className="mb-10 text-center w-full flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-2">
        Trainer-dle
      </h1>
      <p className="text-slate-400 text-lg">
        Adivina el entrenador o personaje misterioso de hoy
      </p>
      <Countdown />
    </header>
  );
}
