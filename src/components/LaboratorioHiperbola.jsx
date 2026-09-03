import { useMemo, useState } from "react";

function LaboratorioHiperbola({ onVolver, onSiguiente }) {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);

  const [mostrarFocos, setMostrarFocos] = useState(true);
  const [mostrarVertices, setMostrarVertices] = useState(true);
  const [mostrarAsintotas, setMostrarAsintotas] = useState(true);
  const [mostrarEcuacion, setMostrarEcuacion] = useState(false);

  const escala = 55;
  const cx = 450;
  const cy = 300;

  const c = Math.sqrt(a * a + b * b);

  const datos = useMemo(() => {
    const puntosDerechaSuperior = [];
    const puntosDerechaInferior = [];
    const puntosIzquierdaSuperior = [];
    const puntosIzquierdaInferior = [];

    for (let x = a; x <= 8; x += 0.08) {
      const y = b * Math.sqrt((x * x) / (a * a) - 1);

      puntosDerechaSuperior.push([
        cx + (h + x) * escala,
        cy - (k + y) * escala,
      ]);

      puntosDerechaInferior.push([
        cx + (h + x) * escala,
        cy - (k - y) * escala,
      ]);

      puntosIzquierdaSuperior.push([
        cx + (h - x) * escala,
        cy - (k + y) * escala,
      ]);

      puntosIzquierdaInferior.push([
        cx + (h - x) * escala,
        cy - (k - y) * escala,
      ]);
    }

    const convertir = (puntos) => puntos.map(([x, y]) => `${x},${y}`).join(" ");

    return {
      derechaSuperior: convertir(puntosDerechaSuperior),
      derechaInferior: convertir(puntosDerechaInferior),
      izquierdaSuperior: convertir(puntosIzquierdaSuperior),
      izquierdaInferior: convertir(puntosIzquierdaInferior),
    };
  }, [a, b, h, k]);

  const xCentro = cx + h * escala;
  const yCentro = cy - k * escala;

  const focoIzquierdoX = cx + (h - c) * escala;
  const focoDerechoX = cx + (h + c) * escala;

  const verticeIzquierdoX = cx + (h - a) * escala;
  const verticeDerechoX = cx + (h + a) * escala;

  const pendiente = b / a;

  const extremo = 9;

  const lineaAsintota1 = {
    x1: cx + (h - extremo) * escala,
    y1: cy - (k - pendiente * extremo) * escala,
    x2: cx + (h + extremo) * escala,
    y2: cy - (k + pendiente * extremo) * escala,
  };

  const lineaAsintota2 = {
    x1: cx + (h - extremo) * escala,
    y1: cy - (k + pendiente * extremo) * escala,
    x2: cx + (h + extremo) * escala,
    y2: cy - (k - pendiente * extremo) * escala,
  };

  return (
    <section className="laboratorio escena-estacion">
      <div className="numero-estacion">LABORATORIO INTERACTIVO</div>

      <div className="lab-encabezado">
        <span className="mini-etiqueta">ESTACIÓN 02</span>

        <h3>LABORATORIO DE HIPÉRBOLAS</h3>

        <p>
          No la estudies todavía.
          <strong> Tocala.</strong>
        </p>
      </div>

      <div className="lab-grid">
        <div className="lab-grafico">
          <svg viewBox="0 0 900 600" className="grafico-svg">
            <defs>
              <filter id="glowCyan">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glowViolet">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="rejilla">
              {Array.from({ length: 19 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
              ))}

              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 50} x2="900" y2={i * 50} />
              ))}
            </g>

            <line
              x1="0"
              y1={yCentro}
              x2="900"
              y2={yCentro}
              className="eje-principal"
            />

            <line
              x1={xCentro}
              y1="0"
              x2={xCentro}
              y2="600"
              className="eje-principal"
            />

            {mostrarAsintotas && (
              <>
                <line {...lineaAsintota1} className="lab-asintota" />

                <line {...lineaAsintota2} className="lab-asintota" />
              </>
            )}

            <polyline points={datos.derechaSuperior} className="curva-lab" />

            <polyline points={datos.derechaInferior} className="curva-lab" />

            <polyline points={datos.izquierdaSuperior} className="curva-lab" />

            <polyline points={datos.izquierdaInferior} className="curva-lab" />

            {mostrarVertices && (
              <>
                <circle
                  cx={verticeIzquierdoX}
                  cy={yCentro}
                  r="7"
                  className="vertice-lab"
                />

                <circle
                  cx={verticeDerechoX}
                  cy={yCentro}
                  r="7"
                  className="vertice-lab"
                />
              </>
            )}

            {mostrarFocos && (
              <>
                <circle
                  cx={focoIzquierdoX}
                  cy={yCentro}
                  r="9"
                  className="foco-lab"
                />

                <circle
                  cx={focoDerechoX}
                  cy={yCentro}
                  r="9"
                  className="foco-lab"
                />
              </>
            )}
          </svg>

          <div className="leyenda-lab">
            <span>
              <i className="punto-leyenda foco-color" />
              Focos
            </span>

            <span>
              <i className="punto-leyenda vertice-color" />
              Vértices
            </span>

            <span>
              <i className="linea-leyenda" />
              Asíntotas
            </span>
          </div>
        </div>

        <div className="panel-controles">
          <div className="control-lab">
            <div className="control-titulo">
              <span>APERTURA</span>
              <strong>a = {a}</strong>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
            />
          </div>

          <div className="control-lab">
            <div className="control-titulo">
              <span>FORMA</span>
              <strong>b = {b}</strong>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
            />
          </div>

          <div className="control-lab">
            <div className="control-titulo">
              <span>CENTRO X</span>
              <strong>h = {h}</strong>
            </div>

            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
            />
          </div>

          <div className="control-lab">
            <div className="control-titulo">
              <span>CENTRO Y</span>
              <strong>k = {k}</strong>
            </div>

            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
            />
          </div>

          <div className="interruptores-lab">
            <button
              className={mostrarFocos ? "activo" : ""}
              onClick={() => setMostrarFocos(!mostrarFocos)}
            >
              FOCOS
            </button>

            <button
              className={mostrarVertices ? "activo" : ""}
              onClick={() => setMostrarVertices(!mostrarVertices)}
            >
              VÉRTICES
            </button>

            <button
              className={mostrarAsintotas ? "activo" : ""}
              onClick={() => setMostrarAsintotas(!mostrarAsintotas)}
            >
              ASÍNTOTAS
            </button>

            <button
              className={mostrarEcuacion ? "activo" : ""}
              onClick={() => setMostrarEcuacion(!mostrarEcuacion)}
            >
              ECUACIÓN
            </button>
          </div>

          {mostrarEcuacion && (
            <div className="ecuacion-lab">
              <span>ECUACIÓN ACTUAL</span>

              <div>
                (x - {h})²
                <span className="fraccion">
                  <b>────</b>
                  {a.toFixed(1)}²
                </span>
                <strong> − </strong>
                (y - {k})²
                <span className="fraccion">
                  <b>────</b>
                  {b.toFixed(1)}²
                </span>
                = 1
              </div>
            </div>
          )}

          <div className="pregunta-lab">
            <span>👀</span>

            <div>
              <strong>¿QUÉ ACABÁS DE CAMBIAR?</strong>
              <p>
                Mové un solo control por vez y observá qué parte de la curva
                responde.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="boton-siguiente-estacion" onClick={onSiguiente}>
        YA LO ENTENDÍ · ENCONTRAR LOS FOCOS →
      </button>

      <button className="volver-inicio" onClick={onVolver}>
        ← VOLVER A LA EXPLICACIÓN
      </button>
    </section>
  );
}

export default LaboratorioHiperbola;
