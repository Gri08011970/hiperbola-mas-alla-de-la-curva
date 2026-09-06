import { useEffect, useRef, useState } from "react";

import audioSofi from "../assets/audios/sofi-hiperbola.mp3";
import audioFacu from "../assets/audios/facu-focos.mp3";
import audioSara from "../assets/audios/sara-vertices-asintotas.mp3";
import audioMarlene from "../assets/audios/marlene-ecuacion.mp3";

const integrantes = [
  {
    id: 1,
    nombre: "Sofia Jimenez",
    apodo: "TOTI",
    tema: "¿Qué es una hipérbola?",
    descripcion:
      "Una explicación corta y clara para entender la idea general antes de entrar en fórmulas.",
    audio: audioSofi,
  },
  {
    id: 2,
    nombre: "Facundo Figueroa ",
    apodo: "Facu",
    tema: "Los focos",
    descripcion:
      "Qué son, dónde están y por qué tienen un papel tan importante en esta curva.",
    audio: audioFacu,
  },
  {
    id: 3,
    nombre: "Sarah Flores",
    apodo: "El gordo",
    tema: "Vértices y asíntotas",
    descripcion:
      "Dos elementos que ayudan a entender cómo se organiza y hacia dónde se dirige la hipérbola.",
    audio: audioSara,
  },
  {
    id: 4,
    nombre: "Marlene Noir",
    apodo: "Mar",
    tema: "La ecuación",
    descripcion:
      "Cómo leerla sin entrar en pánico y qué información nos cuenta sobre la gráfica.",
    audio: audioMarlene,
  },
];

function AudiosEquipo({ onVolver, onSiguiente }) {
  const [reproduciendo, setReproduciendo] = useState(null);
  const [pausado, setPausado] = useState(false);
  const [progreso, setProgreso] = useState({});

  const audioActualRef = useRef(null);

  const detenerAudioActual = () => {
    if (audioActualRef.current) {
      audioActualRef.current.pause();
      audioActualRef.current.currentTime = 0;
      audioActualRef.current = null;
    }

    setReproduciendo(null);
    setPausado(false);
  };

  const manejarAudio = (integrante) => {
    /*
      Si tocamos el botón del mismo integrante
      alternamos entre PAUSA y REPRODUCCIÓN.
    */
    if (
      reproduciendo === integrante.id &&
      audioActualRef.current
    ) {
      if (audioActualRef.current.paused) {
        audioActualRef.current.play();
        setPausado(false);
      } else {
        audioActualRef.current.pause();
        setPausado(true);
      }

      return;
    }

    /*
      Si había otra persona hablando,
      primero la detenemos.
    */
    detenerAudioActual();

    const nuevoAudio = new Audio(integrante.audio);

    audioActualRef.current = nuevoAudio;
    setReproduciendo(integrante.id);
    setPausado(false);

    nuevoAudio.addEventListener("timeupdate", () => {
      if (!nuevoAudio.duration) return;

      const porcentaje =
        (nuevoAudio.currentTime / nuevoAudio.duration) * 100;

      setProgreso((actual) => ({
        ...actual,
        [integrante.id]: porcentaje,
      }));
    });

    nuevoAudio.addEventListener("ended", () => {
      setProgreso((actual) => ({
        ...actual,
        [integrante.id]: 0,
      }));

      setReproduciendo(null);
      setPausado(false);
      audioActualRef.current = null;
    });

    nuevoAudio.play().catch((error) => {
      console.error("No se pudo reproducir el audio:", error);

      setReproduciendo(null);
      setPausado(false);
      audioActualRef.current = null;
    });
  };

  /*
    Si salimos de esta estación mientras hay un audio sonando,
    lo apagamos.
  */
  useEffect(() => {
    return () => {
      if (audioActualRef.current) {
        audioActualRef.current.pause();
        audioActualRef.current = null;
      }
    };
  }, []);

  const volver = () => {
    detenerAudioActual();
    onVolver();
  };

  const siguiente = () => {
    detenerAudioActual();
    onSiguiente();
  };

  return (
    <section className="audios-equipo escena-estacion">
      <div className="numero-estacion">
        ESTACIÓN 04 · VOCES DEL EQUIPO
      </div>

      <div className="audios-encabezado">
        <span className="mini-etiqueta">
          AHORA HABLAMOS NOSOTROS
        </span>

        <h3>TE LO CONTAMOS NOSOTROS</h3>

        <p>
          Cuatro voces. Cuatro ideas.
          <strong> Una misma curva.</strong>
        </p>
      </div>

      <div className="tarjetas-audio">
        {integrantes.map((integrante) => {
          const activo = reproduciendo === integrante.id;
          const porcentaje = progreso[integrante.id] || 0;

          return (
            <article
              key={integrante.id}
              className={`tarjeta-audio ${
                activo ? "reproduciendo" : ""
              }`}
            >
              <div className="avatar-audio">
                {String(integrante.id).padStart(2, "0")}
              </div>

              <div className="audio-datos">
                <span className="apodo-audio">
                  {integrante.apodo}
                </span>

                <h4>{integrante.nombre}</h4>

                <strong>{integrante.tema}</strong>

                <p>{integrante.descripcion}</p>
              </div>

              <div className="reproductor-equipo">
                <div className="barra-audio-equipo">
                  <div
                    className="progreso-audio-equipo"
                    style={{
                      width: `${porcentaje}%`,
                    }}
                  />
                </div>

                <button
                  className="boton-audio"
                  onClick={() => manejarAudio(integrante)}
                >
                  {activo && !pausado ? (
                    <>
                      <span className="ondas-audio">
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>

                      PAUSAR
                    </>
                  ) : activo && pausado ? (
                    <>
                      <span className="icono-play-audio">
                        ▶
                      </span>

                      CONTINUAR
                    </>
                  ) : (
                    <>
                      <span className="icono-play-audio">
                        ▶
                      </span>

                      ESCUCHAR
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="nota-audios">
        <span>🎙️</span>

        <div>
          <strong>
            VOCES DEL EQUIPO
          </strong>

          <p>
            Cada integrante nos cuenta una parte de esta
            experiencia.
          </p>
        </div>
      </div>

      <button
        className="volver-inicio"
        onClick={volver}
      >
        ← VOLVER AL DESAFÍO
      </button>

      <button
        className="boton-siguiente-estacion"
        onClick={siguiente}
      >
        SIGUIENTE · ¿DÓNDE APARECE EN LA VIDA REAL? →
      </button>
    </section>
  );
}

export default AudiosEquipo;