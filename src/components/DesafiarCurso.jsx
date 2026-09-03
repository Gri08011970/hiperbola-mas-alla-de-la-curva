import { useEffect, useState } from "react";
import {
  curso,
  frasesDesafio,
  frasesAcierto,
  frasesError,
} from "../data/curso";

const desafios = [
  {
    pregunta: "¿Cuántos focos tiene una hipérbola?",
    opciones: ["1", "2", "4"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuántas ramas tiene una hipérbola?",
    opciones: ["Una", "Dos", "Tres"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué parámetro mueve horizontalmente el centro?",
    opciones: ["h", "k", "b"],
    correcta: 0,
  },
  {
    pregunta: "Las asíntotas...",
    opciones: [
      "Son puntos",
      "Guían la dirección de las ramas",
      "Son los vértices",
    ],
    correcta: 1,
  },
];

const elegirFraseAleatoria = (lista, nombre) => {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice](nombre);
};

function DesafiarCurso({ onVolver, onFinalizar }) {
  const participantes = curso.companeros
    .filter((persona) => persona.activo)
    .map((persona) => persona.nombre);

  const [fase, setFase] = useState("inicio");
  const [nombreVisible, setNombreVisible] = useState("¿QUIÉN SERÁ?");
  const [elegido, setElegido] = useState(""); 
  const [cuenta, setCuenta] = useState(3);
  const [tiempo, setTiempo] = useState(20);
  const [desafio, setDesafio] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [fraseActual, setFraseActual] = useState("");

  const lanzarRuleta = () => {
    setRespuesta(null);
    setTiempo(20);
    setCuenta(3);
    setFraseActual("");
    setFase("ruleta");

    let vueltas = 0;

    const intervalo = setInterval(() => {
      const aleatorio =
        participantes[Math.floor(Math.random() * participantes.length)];

      setNombreVisible(aleatorio);

      vueltas += 1;

      if (vueltas >= 22) {
        clearInterval(intervalo);

        const seleccionado =
          participantes[Math.floor(Math.random() * participantes.length)];

        const desafioElegido =
          desafios[Math.floor(Math.random() * desafios.length)];

        setElegido(seleccionado);
        setNombreVisible(seleccionado);
        setDesafio(desafioElegido);

        setFraseActual(
          elegirFraseAleatoria(frasesDesafio, seleccionado)
        );

        setTimeout(() => {
          setCuenta(3);
          setFase("cuenta");
        }, 1100);
      }
    }, 90);
  };

  useEffect(() => {
    if (fase !== "cuenta") return;

    const timer = setInterval(() => {
      setCuenta((actual) => {
        if (actual <= 1) {
          clearInterval(timer);

          setTimeout(() => {
            setFase("pregunta");
          }, 300);

          return 0;
        }

        return actual - 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [fase]);

  useEffect(() => {
    if (fase !== "pregunta" || respuesta !== null) return;

    const timer = setTimeout(() => {
      setTiempo((actual) => {
        if (actual <= 1) {
          setRespuesta("tiempo");

          setFraseActual(
            `${elegido}, el reloj decidió intervenir. ⏱️`
          );

          return 0;
        }

        return actual - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [fase, respuesta, tiempo, elegido]);

  const responder = (indice) => {
    if (respuesta !== null) return;

    setRespuesta(indice);

    if (indice === desafio.correcta) {
      setFraseActual(
        elegirFraseAleatoria(frasesAcierto, elegido)
      );
    } else {
      setFraseActual(
        elegirFraseAleatoria(frasesError, elegido)
      );
    }
  };

  const correcta =
    respuesta !== null &&
    respuesta !== "tiempo" &&
    respuesta === desafio?.correcta;

  if (fase === "inicio") {
    return (
      <section className="curso-desafio escena-estacion">
        <div className="numero-estacion">
          PROTOCOLO ESPECIAL · {curso.nombre}
        </div>

        <div className="curso-intro">
          <span className="mini-etiqueta">
            ⚠ FUNCIÓN NO RECOMENDADA PARA PERSONAS NERVIOSAS
          </span>

          <h3>
            DESAFIAR
            <span> AL CURSO</span>
          </h3>

          <p>
            El sistema elegirá a alguien.
            <strong> Nadie puede esconderse.</strong>
          </p>

          <button
            className="boton-demonio"
            onClick={lanzarRuleta}
          >
            😈 ELEGIR VÍCTIMA
          </button>

          <span className="curso-advertencia">
            SELECCIÓN ALEATORIA · {curso.nombre}
          </span>
        </div>

        <button className="volver-inicio" onClick={onVolver}>
          ← VOLVER AL RESULTADO
        </button>
      </section>
    );
  }

  if (fase === "ruleta") {
    return (
      <section className="curso-desafio escena-estacion">
        <div className="ruleta-curso">
          <span className="mini-etiqueta">
            BUSCANDO PARTICIPANTE...
          </span>

          <div className="nombre-ruleta">
            {nombreVisible}
          </div>

          <div className="scanner-linea" />

          <p>El sistema está tomando una decisión...</p>
        </div>
      </section>
    );
  }

  if (fase === "cuenta") {
    return (
      <section className="curso-desafio escena-estacion">
        <div className="cuenta-curso">
          <span className="mini-etiqueta">
            OBJETIVO SELECCIONADO
          </span>

          <h3>{elegido}</h3>

          <p className="frase-personalizada">
            {fraseActual}
          </p>

          <span className="tiempo-aviso">
            TENÉS 20 SEGUNDOS PARA SALVAR AL EQUIPO.
          </span>

          <strong>{cuenta}</strong>
        </div>
      </section>
    );
  }

  return (
    <section className="curso-desafio escena-estacion">
      <div className="numero-estacion">
        DESAFÍO PERSONAL · {elegido}
      </div>

      <div className="reto-personal">
        <div className="reto-top">
          <div>
            <span>JUGADOR</span>
            <strong>{elegido}</strong>
          </div>

          <div
            className={
              tiempo <= 5
                ? "tiempo-personal urgente"
                : "tiempo-personal"
            }
          >
            <span>TIEMPO</span>
            <strong>{tiempo}</strong>
          </div>
        </div>

        <div className="barra-tiempo-personal">
          <div
            style={{
              width: `${(tiempo / 20) * 100}%`,
            }}
          />
        </div>

        <span className="mini-etiqueta">
          EL CURSO DEPENDE DE VOS
        </span>

        <h3>{desafio.pregunta}</h3>

        <div className="opciones-personales">
          {desafio.opciones.map((opcion, index) => {
            let clase = "";

            if (respuesta !== null) {
              if (index === desafio.correcta) {
                clase = "correcta";
              } else if (index === respuesta) {
                clase = "incorrecta";
              }
            }

            return (
              <button
                key={opcion}
                className={clase}
                disabled={respuesta !== null}
                onClick={() => responder(index)}
              >
                <span>
                  {String.fromCharCode(65 + index)}
                </span>

                {opcion}
              </button>
            );
          })}
        </div>

        {respuesta !== null && (
          <div
            className={`resultado-personal ${
              correcta ? "salvo-equipo" : "no-salvo"
            }`}
          >
            <strong>
              {respuesta === "tiempo"
                ? "⏱ DEMASIADO TARDE..."
                : correcta
                  ? "🔥 ¡SALVASTE AL EQUIPO!"
                  : "😈 EL SISTEMA NO PERDONA."}
            </strong>

            <p className="frase-resultado-personal">
              {fraseActual}
            </p>

            {respuesta !== "tiempo" && !correcta && (
              <p className="respuesta-correcta-personal">
                La respuesta correcta era:{" "}
                <strong>
                  {desafio.opciones[desafio.correcta]}
                </strong>
              </p>
            )}

            <div className="acciones-personales">
              <button onClick={lanzarRuleta}>
                😈 ELEGIR A OTRO
              </button>

              <button
                className="terminar-curso"
                onClick={onFinalizar}
              >
                CONTINUAR →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DesafiarCurso;