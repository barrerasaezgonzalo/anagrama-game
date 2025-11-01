"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

// Lista de palabras de 6 letras con sus pistas
const palabrasDB = [
  { palabra: "CABEZA", pista: "Parte superior del cuerpo" },
  { palabra: "BANANA", pista: "Fruta tropical amarilla" },
  { palabra: "CAMINO", pista: "Ruta o sendero" },
  { palabra: "AMIGOS", pista: "Compañeros cercanos" },
  { palabra: "CIUDAD", pista: "Área urbana grande" },
  { palabra: "DINERO", pista: "Medio de intercambio" },
  { palabra: "EQUIPO", pista: "Grupo de personas o herramientas" },
  { palabra: "FUTBOL", pista: "Deporte con balón redondo" },
  { palabra: "GUERRA", pista: "Conflicto armado" },
  { palabra: "HELADO", pista: "Postre frío y dulce" },
  { palabra: "JARDIN", pista: "Espacio con plantas" },
  { palabra: "LEONES", pista: "Felinos de la sabana" },
  { palabra: "MANZANA", pista: "Fruta del Edén" },
  { palabra: "NARANJA", pista: "Fruta cítrica" },
  { palabra: "OTOÑO", pista: "Estación con hojas caídas" },
  { palabra: "PUEBLO", pista: "Localidad pequeña" },
  { palabra: "QUESOS", pista: "Derivados lácteos" },
  { palabra: "REGALO", pista: "Presente para alguien" },
  { palabra: "SILENCIO", pista: "Ausencia de ruido" },
  { palabra: "TIEMPO", pista: "Magnitud física continua" },
  { palabra: "UNIDOS", pista: "Juntos o conectados" },
  { palabra: "VERANO", pista: "Estación más cálida" },
  { palabra: "ZAPATO", pista: "Calzado para el pie" },
  { palabra: "CALLES", pista: "Vías urbanas" },
  { palabra: "DORADO", pista: "Color del oro" },
  { palabra: "ENIGMA", pista: "Misterio o acertijo" },
  { palabra: "FLORES", pista: "Plantas con pétalos" },
  { palabra: "GAFAS", pista: "Lentes para ver mejor" },
  { palabra: "HARINA", pista: "Polvo para hacer pan" },
  { palabra: "IMAGEN", pista: "Representación visual" },
  { palabra: "JUEGOS", pista: "Actividades de diversión" },
  { palabra: "LETRAS", pista: "Símbolos del alfabeto" },
  { palabra: "MUSICA", pista: "Arte de los sonidos" },
  { palabra: "NOTICIA", pista: "Información reciente" },
  { palabra: "OCEANO", pista: "Gran masa de agua salada" },
  { palabra: "PAISAJE", pista: "Vista natural o urbana" },
  { palabra: "QUINTO", pista: "Número ordinal 5º" },
  { palabra: "REPORT", pista: "Informe o reporte" },
  { palabra: "SABADO", pista: "Sexto día de la semana" },
  { palabra: "TIGRES", pista: "Felinos rayados" },
  { palabra: "ULTIMO", pista: "El final de algo" },
  { palabra: "VIAJES", pista: "Desplazamientos largos" },
  { palabra: "BESOS", pista: "Muestras de afecto" },
  { palabra: "CARTAS", pista: "Mensajes escritos" },
  { palabra: "DEDOS", pista: "Extremidades de manos" },
  { palabra: "ESCUELA", pista: "Centro de educación" },
  { palabra: "FUEGOS", pista: "Llamas que arden" },
  { palabra: "GRANDE", pista: "De tamaño considerable" },
  { palabra: "HOGAR", pista: "Casa o domicilio" },
];

const mezclarLetras = (palabra: string): string => {
  const letras = palabra.split("");
  for (let i = letras.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letras[i], letras[j]] = [letras[j], letras[i]];
  }
  return letras.join("");
};

export default function Anagramas() {
  const [palabraActual, setPalabraActual] = useState(palabrasDB[0]);
  const [anagrama, setAnagrama] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [racha, setRacha] = useState(0);

  useEffect(() => {
    nuevaPalabra();
  }, []);

  const nuevaPalabra = () => {
    const palabraAleatoria =
      palabrasDB[Math.floor(Math.random() * palabrasDB.length)];
    setPalabraActual(palabraAleatoria);
    let anagramaMezclado = mezclarLetras(palabraAleatoria.palabra);

    // Asegurar que el anagrama sea diferente a la palabra original
    while (
      anagramaMezclado === palabraAleatoria.palabra &&
      palabraAleatoria.palabra.length > 2
    ) {
      anagramaMezclado = mezclarLetras(palabraAleatoria.palabra);
    }

    setAnagrama(anagramaMezclado);
    setRespuesta("");
    setMensaje("");
    setMostrarPista(false);
  };

  const verificarRespuesta = () => {
    const respuestaLimpia = respuesta.toUpperCase().trim();
    const palabraCorrecta = palabraActual.palabra;

    if (respuestaLimpia === palabraCorrecta) {
      setMensaje("¡Correcto! 🎉");
      const puntosGanados = mostrarPista ? 5 : 10;
      setPuntuacion(puntuacion + puntosGanados);
      setAciertos(aciertos + 1);
      setRacha(racha + 1);
      setIntentos(intentos + 1);

      setTimeout(() => {
        nuevaPalabra();
      }, 1500);
    } else {
      setMensaje("Incorrecto, intenta de nuevo ❌");
      setRacha(0);
      setIntentos(intentos + 1);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };

  const saltarPalabra = () => {
    setMensaje(`La palabra era: ${palabraActual.palabra}`);
    setRacha(0);
    setIntentos(intentos + 1);

    setTimeout(() => {
      nuevaPalabra();
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && respuesta.trim()) {
      verificarRespuesta();
    }
  };

  const mezclarDeNuevo = () => {
    let nuevoAnagrama = mezclarLetras(palabraActual.palabra);
    while (nuevoAnagrama === anagrama && palabraActual.palabra.length > 2) {
      nuevoAnagrama = mezclarLetras(palabraActual.palabra);
    }
    setAnagrama(nuevoAnagrama);
  };

  const precisión = intentos > 0 ? Math.round((aciertos / intentos) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F2F6F9] flex items-center justify-center p-5">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-6xl font-bold text-black mb-4 inline-block ">
            <Image
              src={"/anagramas.png"}
              alt={"Anagramas"}
              width={100}
              height={100}
              style={{
                display: "inline",
                marginRight: "2rem",
              }}
            />
            Anagramas
          </h1>
          <p className="text-black text-lg">
            Cómo jugar: Ordena las letras para formar una palabra válida. Usa
            las pistas si las necesitas (pero valen menos puntos). ¡Mantén tu
            racha!
          </p>
        </div>

        {/* Panel de estadísticas */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-blue-500 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{puntuacion}</div>
            <div className="text-white/80 text-sm">Puntos</div>
          </div>
          <div className="bg-blue-500 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{aciertos}</div>
            <div className="text-white/80 text-sm">Aciertos</div>
          </div>
          <div className="bg-blue-500 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{precisión}%</div>
            <div className="text-white/80 text-sm">Precisión</div>
          </div>
          <div className="bg-blue-500 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{racha}</div>
            <div className="text-white/80 text-sm">Racha</div>
          </div>
        </div>

        {/* Juego principal */}
        <div className="bg-[white] rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Ordena estas letras:
            </div>
            <div className="text-lg md:text-6xl font-bold text-white tracking-wider mb-4 flex justify-center gap-2">
              {anagrama.split("").map((letra, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#FE8111] px-4 py-3 rounded-lg shadow-md animate-bounce"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: "1s",
                    animationIterationCount: "1",
                  }}
                >
                  {letra}
                </span>
              ))}
            </div>

            <button
              onClick={mezclarDeNuevo}
              className="text-blue-500 hover:text-indigo-800 text-sm font-semibold  mb-4"
            >
              🔄 Mezclar letras
            </button>

            {mostrarPista && (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                <div className="text-yellow-800 font-semibold">💡 Pista:</div>
                <div className="text-yellow-700">{palabraActual.pista}</div>
              </div>
            )}

            {!mostrarPista && (
              <button
                onClick={() => setMostrarPista(true)}
                className="text-gray-600 hover:text-gray-800 text-sm font-semibold mb-4 block mx-auto"
              >
                💡 Ver pista (-5 puntos)
              </button>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full px-6 py-4 text-2xl text-center border-3 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-indigo-200 transition-all uppercase text-blue-500 font-bold placeholder:text-gray-400"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={verificarRespuesta}
              disabled={!respuesta.trim()}
              className="flex-1 bg-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-lg"
            >
              Verificar ✓
            </button>
            <button
              onClick={saltarPalabra}
              className="flex-1 bg-gray-400 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-500 active:scale-95 transition-all shadow-lg text-lg"
            >
              Saltar →
            </button>
          </div>

          {mensaje && (
            <div
              className={`mt-6 text-center text-2xl font-bold p-4 rounded-xl ${
                mensaje.includes("Correcto")
                  ? "bg-green-100 text-green-700"
                  : mensaje.includes("Incorrecto")
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              {mensaje}
            </div>
          )}
        </div>

        <footer className="mt-10 text-black text-center">
          <p>Creado a las 3 AM cuando el café ya no hacía efecto ☕💻</p>

          <Link href="https://chilehub.cl">
            <Image
              src="/chilehub.png"
              alt="Logo de Sopa de Letras"
              width={200}
              height={80}
              style={{
                width: "200px",
                height: "80px",
                objectFit: "contain",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Link>
        </footer>
      </div>
    </div>
  );
}
