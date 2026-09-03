import { useState } from "react";

const casos = [
  {
    id: 1,
    icono: "🏛️",
    titulo: "ARQUITECTURA",
    pregunta: "¿Una hipérbola puede formar parte de un edificio?",
    explicacion:
      "Sí. Algunas estructuras y superficies arquitectónicas utilizan formas relacionadas con hipérbolas e hiperboloides porque permiten crear diseños resistentes, abiertos y visualmente impactantes.",
    dato: "La matemática también diseña espacios.",
  },
  {
    id: 2,
    icono: "☄️",
    titulo: "ASTRONOMÍA",
    pregunta: "¿Puede un objeto espacial seguir una trayectoria hiperbólica?",
    explicacion:
      "Sí. Algunos cometas y objetos que pasan cerca de un cuerpo celeste pueden seguir trayectorias hiperbólicas cuando poseen suficiente energía para no quedar atrapados en una órbita cerrada.",
    dato: "Una curva puede contar la historia de un viaje por el espacio.",
  },
  {
    id: 3,
    icono: "📡",
    titulo: "LOCALIZACIÓN",
    pregunta: "¿Se puede encontrar una posición usando diferencias de distancia?",
    explicacion:
      "La propiedad de la hipérbola puede utilizarse en sistemas que comparan diferencias de tiempo o distancia entre señales recibidas desde distintos puntos.",
    dato: "Dos focos pueden ayudarnos a saber dónde estamos.",
  },
  {
    id: 4,
    icono: "🔭",
    titulo: "ÓPTICA Y SEÑALES",
    pregunta: "¿Qué tienen que ver los focos con la tecnología?",
    explicacion:
      "Las propiedades geométricas de superficies relacionadas con hipérbolas aparecen en diseños ópticos y sistemas donde es necesario dirigir o reflejar ondas y señales.",
    dato: "Los focos no son solamente puntos dibujados en una hoja.",
  },
];

function VidaReal({ onVolver, onSiguiente }) {
  const [abiertas, setAbiertas] = useState([]);

  const alternarTarjeta = (id) => {
    setAbiertas((actuales) =>
      actuales.includes(id)
        ? actuales.filter((item) => item !== id)
        : [...actuales, id]
    );
  };

  return (
    <section className="vida-real escena-estacion">
      <div className="numero-estacion">
        ESTACIÓN 05 · FUERA DEL AULA
      </div>

      <div className="vida-encabezado">
        <span className="mini-etiqueta">LA CURVA ESTÁ MÁS CERCA DE LO QUE PENSÁS</span>

        <h3>¿DÓNDE APARECE EN LA VIDA REAL?</h3>

        <p>
          Tocá cada tarjeta.
          <strong> La matemática sale del pizarrón.</strong>
        </p>
      </div>

      <div className="tarjetas-vida">
        {casos.map((caso) => {
          const abierta = abiertas.includes(caso.id);

          return (
            <button
              key={caso.id}
              className={`tarjeta-vida ${abierta ? "girada" : ""}`}
              onClick={() => alternarTarjeta(caso.id)}
            >
              <div className="tarjeta-vida-interior">
                <div className="cara-vida frente-vida">
                  <span className="numero-caso">
                    {String(caso.id).padStart(2, "0")}
                  </span>

                  <div className="icono-vida">{caso.icono}</div>

                  <h4>{caso.titulo}</h4>

                  <p>{caso.pregunta}</p>

                  <span className="tocar-vida">
                    TOCÁ PARA DESCUBRIR ↻
                  </span>
                </div>

                <div className="cara-vida reverso-vida">
                  <span className="mini-etiqueta">
                    {caso.titulo}
                  </span>

                  <p>{caso.explicacion}</p>

                  <div className="dato-vida">
                    <span>✦</span>
                    {caso.dato}
                  </div>

                  <span className="tocar-vida">
                    ↻ VOLVER
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="vida-mensaje">
        <span>👀</span>

        <div>
          <strong>UNA MISMA IDEA. MUCHOS LUGARES.</strong>
          <p>
            La hipérbola no vive solamente dentro de una ecuación.
          </p>
        </div>
      </div>

      <button className="volver-inicio" onClick={onVolver}>
        ← VOLVER A LAS VOCES DEL EQUIPO
      </button>

      <button
        className="boton-siguiente-estacion"
        onClick={onSiguiente}
      >
        SIGUIENTE · DESAFÍO HIPÉRBOLA →
      </button>
    </section>
  );
}

export default VidaReal;