import { useEffect, useState } from "react";

function FinalExperiencia({ onReiniciar, onVolver }) {
  const [momento, setMomento] = useState(0);

  useEffect(() => {
    const tiempos = [1400, 3200, 5000, 6500, 8000, 9600, 11200];

    const timers = tiempos.map((tiempo, index) =>
      setTimeout(() => {
        setMomento(index + 1);
      }, tiempo),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="final-experiencia">
      <div className="final-grid" />

      <div className="final-hyperbola">
        <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet">
          <line className="final-eje" x1="500" y1="40" x2="500" y2="660" />

          <line className="final-eje" x1="100" y1="350" x2="900" y2="350" />

          <line className="final-asintota" x1="180" y1="620" x2="820" y2="80" />

          <line className="final-asintota" x1="180" y1="80" x2="820" y2="620" />

          <path
            className={`final-rama rama-izquierda ${
              momento >= 1 ? "dibujar" : ""
            }`}
            d="M 390 80
               C 310 155, 275 255, 270 350
               C 275 445, 310 545, 390 620"
          />

          <path
            className={`final-rama rama-derecha ${
              momento >= 1 ? "dibujar" : ""
            }`}
            d="M 610 80
               C 690 155, 725 255, 730 350
               C 725 445, 690 545, 610 620"
          />

          <circle
            className={`final-foco ${momento >= 4 ? "visible" : ""}`}
            cx="390"
            cy="350"
            r="8"
          />

          <circle
            className={`final-foco ${momento >= 4 ? "visible" : ""}`}
            cx="610"
            cy="350"
            r="8"
          />
        </svg>
      </div>

      <div className="final-contenido">
        <div
          className={`final-frase inicial ${
            momento >= 2 && momento < 3 ? "visible" : ""
          }`}
        >
          AL PRINCIPIO ERA SOLO UNA CURVA.
        </div>

        <div
          className={`final-frase descubrimiento ${
            momento >= 3 && momento < 4 ? "visible" : ""
          }`}
        >
          AHORA SABEMOS QUÉ HAY DETRÁS.
        </div>

        <div
          className={`final-conceptos ${
            momento >= 4 && momento < 6 ? "visible" : ""
          }`}
        >
          <span className="concepto c1">DOS RAMAS.</span>
          <span className="concepto c2">DOS FOCOS.</span>
          <span className="concepto c3">UNA PROPIEDAD.</span>
          <span className="concepto c4">INFINITAS APLICACIONES.</span>
        </div>

        <div className={`final-titulo ${momento >= 6 ? "visible" : ""}`}>
          <span className="final-etiqueta">EXPERIENCIA MATEMÁTICA</span>

          <h1>HIPÉRBOLA</h1>

          <h2>MÁS ALLÁ DE LA CURVA</h2>

          <div className="final-linea" />

          <div className="final-equipo">
            <strong>
              SOFI <i>·</i> FACU <i>·</i> SARA <i>·</i> MARLENE
            </strong>

            <span>5°A · TURNO TARDE</span>

            <span>PROF. BORGNINO</span>
          </div>
        </div>

        <div className={`acciones-final ${momento >= 7 ? "visible" : ""}`}>
          <button className="volver-desafio-final" onClick={onVolver}>
            ← VOLVER AL DESAFÍO DEL CURSO
          </button>

          <button className="reiniciar-experiencia" onClick={onReiniciar}>
            ↻ VOLVER AL INICIO
          </button>
        </div>
      </div>
    </section>
  );
}

export default FinalExperiencia;
