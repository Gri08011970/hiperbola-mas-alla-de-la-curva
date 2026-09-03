import { useEffect, useState } from "react";

const preguntas = [
  {
    id: 1,
    tipo: "CONCEPTO",
    pregunta: "¿Cuántas ramas tiene una hipérbola?",
    opciones: ["Una", "Dos", "Cuatro"],
    correcta: 1,
    explicacion: "Una hipérbola está formada por dos ramas separadas.",
  },
  {
    id: 2,
    tipo: "FOCOS",
    pregunta: "En una hipérbola, los focos...",
    opciones: [
      "Son dos puntos fijos",
      "Siempre están sobre la curva",
      "Son los extremos de las asíntotas",
    ],
    correcta: 0,
    explicacion:
      "Los focos son dos puntos fijos relacionados con la propiedad geométrica que define a la hipérbola.",
  },
  {
    id: 3,
    tipo: "ASÍNTOTAS",
    pregunta: "¿Qué sucede entre la hipérbola y sus asíntotas?",
    opciones: [
      "La curva se acerca a ellas",
      "La curva siempre las corta",
      "Las asíntotas son los focos",
    ],
    correcta: 0,
    explicacion:
      "Las ramas se aproximan cada vez más a las asíntotas a medida que se alejan del centro.",
  },
  {
    id: 4,
    tipo: "LABORATORIO",
    pregunta:
      "Si modificamos h en la ecuación, ¿qué observamos en nuestro laboratorio?",
    opciones: [
      "La hipérbola se desplaza horizontalmente",
      "Desaparece una rama",
      "Los focos se convierten en vértices",
    ],
    correcta: 0,
    explicacion:
      "El parámetro h determina el desplazamiento horizontal del centro.",
  },
  {
    id: 5,
    tipo: "VIDA REAL",
    pregunta: "¿Dónde puede aparecer una idea relacionada con hipérbolas?",
    opciones: [
      "Solamente en ejercicios de matemática",
      "En astronomía, localización, óptica y estructuras",
      "Únicamente en geometría antigua",
    ],
    correcta: 1,
    explicacion:
      "Las propiedades de la hipérbola aparecen en distintos contextos científicos y tecnológicos.",
  },
];

function DesafioHyperbola({ onVolver, onSiguiente }) {
  const TIEMPO = 15;

  const [iniciado, setIniciado] = useState(false);
  const [indice, setIndice] = useState(0);
  const [tiempo, setTiempo] = useState(TIEMPO);
  const [puntaje, setPuntaje] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [terminado, setTerminado] = useState(false);

  const preguntaActual = preguntas[indice];

  useEffect(() => {
  if (!iniciado || respuesta !== null || terminado) return;

  const timer = setTimeout(() => {
    setTiempo((actual) => {
      if (actual <= 1) {
        setRespuesta("tiempo");
        return 0;
      }

      return actual - 1;
    });
  }, 1000);

  return () => clearTimeout(timer);
}, [iniciado, respuesta, terminado]);

  const responder = (opcion) => {
    if (respuesta !== null) return;

    setRespuesta(opcion);

    if (opcion === preguntaActual.correcta) {
      setPuntaje((actual) => actual + 100 + tiempo * 10);
    }
  };

  const siguientePregunta = () => {
    if (indice === preguntas.length - 1) {
      setTerminado(true);
      return;
    }

    setIndice((actual) => actual + 1);
    setTiempo(TIEMPO);
    setRespuesta(null);
  };

  const reiniciar = () => {
    setIndice(0);
    setTiempo(TIEMPO);
    setPuntaje(0);
    setRespuesta(null);
    setTerminado(false);
    setIniciado(false);
  };

  const esCorrecta = respuesta === preguntaActual?.correcta;
  const porcentajeTiempo = (tiempo / TIEMPO) * 100;

  if (!iniciado) {
    return (
      <section className="desafio-hyperbola escena-estacion">
        <div className="numero-estacion">
          ESTACIÓN 06 · ZONA DE DESAFÍO
        </div>

        <div className="desafio-intro">
          <span className="mini-etiqueta">⚠ SISTEMA DE JUEGO ACTIVADO</span>

          <h3>
            DESAFÍO
            <span> HIPÉRBOLA</span>
          </h3>

          <p className="desafio-frase">
            Ya miraron. Ya exploraron. Ya escucharon.
          </p>

          <strong className="ahora-demuestren">
            AHORA DEMUESTREN QUE ENTENDIERON.
          </strong>

          <div className="reglas-desafio">
            <div>
              <strong>05</strong>
              <span>RONDAS</span>
            </div>

            <div>
              <strong>15</strong>
              <span>SEGUNDOS</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>GLORIA</span>
            </div>
          </div>

          <button
            className="activar-desafio"
            onClick={() => setIniciado(true)}
          >
            <span>😈</span>
            ACTIVAR DESAFÍO
          </button>

          <div className="advertencia-desafio">
            UNA VEZ ACTIVADO, NO HAY VUELTA ATRÁS.
          </div>
        </div>

        <button className="volver-inicio" onClick={onVolver}>
          ← VOLVER A VIDA REAL
        </button>
      </section>
    );
  }

  if (terminado) {
    const maximo = preguntas.length * 250;
    const porcentaje = Math.round((puntaje / maximo) * 100);

    let nivel = "SOBREVIVIENTE DE CÓNICAS";

    if (porcentaje >= 80) {
      nivel = "DOMINADOR DE HIPÉRBOLAS";
    } else if (porcentaje >= 50) {
      nivel = "EXPLORADOR DE CÓNICAS";
    }

    return (
      <section className="desafio-hyperbola escena-estacion">
        <div className="numero-estacion">
          ESTACIÓN 06 · RESULTADO FINAL
        </div>

        <div className="resultado-desafio">
          <span className="mini-etiqueta">
            MISIÓN FINALIZADA
          </span>

          <div className="trofeo-desafio">🏆</div>

          <h3>{nivel}</h3>

          <p>El curso consiguió</p>

          <strong className="puntaje-final">
            {puntaje}
          </strong>

          <span className="pts-final">PUNTOS</span>

          <div className="resultado-linea" />

          <p className="resultado-mensaje">
            La hipérbola ya no es solamente una curva rara
            en el pizarrón.
          </p>

          <div className="acciones-resultado">
            <button onClick={reiniciar}>
              ↻ JUGAR DE NUEVO
            </button>

            <button
              className="continuar-final"
              onClick={onSiguiente}
            >
              CONTINUAR EXPERIENCIA →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="desafio-hyperbola escena-estacion">
      <div className="numero-estacion">
        ESTACIÓN 06 · DESAFÍO EN CURSO
      </div>

      <div className="hud-desafio">
        <div>
          RONDA
          <strong>
            {String(indice + 1).padStart(2, "0")} / 05
          </strong>
        </div>

        <div className="puntaje-hud">
          PUNTAJE
          <strong>{puntaje}</strong>
        </div>

        <div className={`reloj ${tiempo <= 5 ? "urgente" : ""}`}>
          TIEMPO
          <strong>{tiempo}</strong>
        </div>
      </div>

      <div className="barra-tiempo">
        <div
          style={{ width: `${porcentajeTiempo}%` }}
          className={tiempo <= 5 ? "urgente" : ""}
        />
      </div>

      <main className="pregunta-desafio">
        <span className="tipo-pregunta">
          {preguntaActual.tipo}
        </span>

        <h3>{preguntaActual.pregunta}</h3>

        <div className="opciones-desafio">
          {preguntaActual.opciones.map((opcion, i) => {
            let clase = "";

            if (respuesta !== null) {
              if (i === preguntaActual.correcta) {
                clase = "correcta";
              } else if (i === respuesta) {
                clase = "incorrecta";
              }
            }

            return (
              <button
                key={opcion}
                className={clase}
                onClick={() => responder(i)}
                disabled={respuesta !== null}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {opcion}
              </button>
            );
          })}
        </div>

        {respuesta !== null && (
          <div
            className={`feedback-desafio ${
              esCorrecta ? "feedback-correcto" : "feedback-error"
            }`}
          >
            <strong>
              {respuesta === "tiempo"
                ? "⏱ TIEMPO AGOTADO"
                : esCorrecta
                  ? "✓ RESPUESTA CORRECTA"
                  : "✕ RESPUESTA INCORRECTA"}
            </strong>

            <p>{preguntaActual.explicacion}</p>

            <button onClick={siguientePregunta}>
              {indice === preguntas.length - 1
                ? "VER RESULTADO →"
                : "SIGUIENTE RONDA →"}
            </button>
          </div>
        )}
      </main>
    </section>
  );
}

export default DesafioHyperbola;