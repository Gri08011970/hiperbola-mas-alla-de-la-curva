import { useMemo, useState } from "react";

function EncuentraFocos({ onVolver, onSiguiente }) {
  const a = 3;
  const b = 2;

  const escala = 55;
  const cx = 450;
  const cy = 300;

  const c = Math.sqrt(a * a + b * b);

  const focoIzquierdo = {
    x: cx - c * escala,
    y: cy,
  };

  const focoDerecho = {
    x: cx + c * escala,
    y: cy,
  };

  const [encontradoIzq, setEncontradoIzq] = useState(false);
  const [encontradoDer, setEncontradoDer] = useState(false);
  const [mensaje, setMensaje] = useState(
    "Hay dos focos escondidos. Tocá el gráfico para encontrarlos.",
  );

  const [intentos, setIntentos] = useState(0);

  const puntosCurva = useMemo(() => {
    const ramas = [];

    for (let lado of [-1, 1]) {
      const superior = [];
      const inferior = [];

      for (let x = a; x <= 8; x += 0.08) {
        const y = b * Math.sqrt((x * x) / (a * a) - 1);

        superior.push([cx + lado * x * escala, cy - y * escala]);

        inferior.push([cx + lado * x * escala, cy + y * escala]);
      }

      ramas.push({
        superior: superior.map(([x, y]) => `${x},${y}`).join(" "),
        inferior: inferior.map(([x, y]) => `${x},${y}`).join(" "),
      });
    }

    return ramas;
  }, []);

  const distancia = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  const manejarClick = (e) => {
    if (encontradoIzq && encontradoDer) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 900;
    const y = ((e.clientY - rect.top) / rect.height) * 600;

    const distIzq = encontradoIzq
      ? Infinity
      : distancia(x, y, focoIzquierdo.x, focoIzquierdo.y);

    const distDer = encontradoDer
      ? Infinity
      : distancia(x, y, focoDerecho.x, focoDerecho.y);

    const menorDistancia = Math.min(distIzq, distDer);

    setIntentos((prev) => prev + 1);

    if (menorDistancia < 35) {
      if (distIzq < distDer) {
        setEncontradoIzq(true);

        if (encontradoDer) {
          setMensaje("🎯 ¡DOBLE FOCO DETECTADO! MISIÓN CUMPLIDA.");
        } else {
          setMensaje("🔥 ¡ENCONTRASTE UNO! Falta el otro...");
        }
      } else {
        setEncontradoDer(true);

        if (encontradoIzq) {
          setMensaje("🎯 ¡DOBLE FOCO DETECTADO! MISIÓN CUMPLIDA.");
        } else {
          setMensaje("🔥 ¡ENCONTRASTE UNO! Falta el otro...");
        }
      }

      return;
    }

    if (menorDistancia < 90) {
      setMensaje("🔥 Muy cerca... casi lo tocás.");
    } else if (menorDistancia < 160) {
      setMensaje("🌡️ Te estás acercando...");
    } else {
      setMensaje("❄️ Lejos... probá otra zona.");
    }
  };

  const reiniciar = () => {
    setEncontradoIzq(false);
    setEncontradoDer(false);
    setIntentos(0);
    setMensaje("Hay dos focos escondidos. Tocá el gráfico para encontrarlos.");
  };

  const completado = encontradoIzq && encontradoDer;

  return (
    <section className="focos-juego escena-estacion">
      <div className="numero-estacion">ESTACIÓN 03 · MISIÓN INTERACTIVA</div>

      <div className="focos-encabezado">
        <span className="mini-etiqueta">DESAFÍO DE PRECISIÓN</span>

        <h3>ENCONTRÁ LOS FOCOS</h3>

        <p>
          Sabemos que están ahí.
          <strong> Pero no te los vamos a mostrar.</strong>
        </p>
      </div>

      <div className="focos-layout">
        <div className="zona-juego">
          <svg
            viewBox="0 0 900 600"
            className={`focos-svg ${completado ? "completado" : ""}`}
            onClick={manejarClick}
          >
            <g className="rejilla">
              {Array.from({ length: 19 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
              ))}

              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 50} x2="900" y2={i * 50} />
              ))}
            </g>

            <line x1="0" y1={cy} x2="900" y2={cy} className="eje-principal" />

            <line x1={cx} y1="0" x2={cx} y2="600" className="eje-principal" />

            {puntosCurva.map((rama, index) => (
              <g key={index}>
                <polyline points={rama.superior} className="curva-lab" />

                <polyline points={rama.inferior} className="curva-lab" />
              </g>
            ))}

            {encontradoIzq && (
              <g className="foco-encontrado">
                <circle cx={focoIzquierdo.x} cy={focoIzquierdo.y} r="14" />

                <circle
                  cx={focoIzquierdo.x}
                  cy={focoIzquierdo.y}
                  r="30"
                  className="onda-foco"
                />

                <text
                  x={focoIzquierdo.x}
                  y={focoIzquierdo.y - 28}
                  textAnchor="middle"
                >
                  FOCO 1
                </text>
              </g>
            )}

            {encontradoDer && (
              <g className="foco-encontrado">
                <circle cx={focoDerecho.x} cy={focoDerecho.y} r="14" />

                <circle
                  cx={focoDerecho.x}
                  cy={focoDerecho.y}
                  r="30"
                  className="onda-foco"
                />

                <text
                  x={focoDerecho.x}
                  y={focoDerecho.y - 28}
                  textAnchor="middle"
                >
                  FOCO 2
                </text>
              </g>
            )}
          </svg>

          {!completado && (
            <div className="cursor-pista">HACÉ CLIC EN EL PLANO</div>
          )}
        </div>

        <aside className="panel-mision">
          <div>
            <span className="mini-etiqueta">ESTADO DE LA MISIÓN</span>

            <div className="estado-focos">
              <div className={encontradoIzq ? "ok" : ""}>
                <span>{encontradoIzq ? "✓" : "?"}</span>
                FOCO 1
              </div>

              <div className={encontradoDer ? "ok" : ""}>
                <span>{encontradoDer ? "✓" : "?"}</span>
                FOCO 2
              </div>
            </div>
          </div>

          <div className={`mensaje-radar ${completado ? "exito" : ""}`}>
            {mensaje}
          </div>

          <div className="intentos-focos">
            <span>INTENTOS</span>
            <strong>{intentos}</strong>
          </div>

          {completado && (
            <div className="mision-completa">
              <div>🏆</div>

              <strong>MISIÓN CUMPLIDA</strong>

              <p>Encontraste ambos focos en {intentos} intentos.</p>
            </div>
          )}

          <button className="boton-reiniciar" onClick={reiniciar}>
            ↻ REINICIAR DESAFÍO
          </button>
          {completado && (
            <button className="boton-continuar-mision" onClick={onSiguiente}>
              CONTINUAR EXPERIENCIA →
            </button>
          )}
        </aside>
      </div>

      <button className="volver-inicio" onClick={onVolver}>
        ← VOLVER AL LABORATORIO
      </button>
    </section>
  );
}

export default EncuentraFocos;
