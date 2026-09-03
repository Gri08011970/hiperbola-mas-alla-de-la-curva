import { useState } from "react";
import "./App.css";
import HyperbolaBackground from "./components/HyperbolaBackground";
import LaboratorioHiperbola from "./components/LaboratorioHiperbola";
import EncuentraFocos from "./components/EncuentraFocos";
import AudiosEquipo from "./components/AudiosEquipo";
import VidaReal from "./components/VidaReal";
import DesafioHyperbola from "./components/DesafioHyperbola";
import DesafiarCurso from "./components/DesafiarCurso";
import FinalExperiencia from "./components/FinalExperiencia";
import videoPrueba from "./assets/videos/video_prueba_hiperbola.mp4";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [transicionFinal, setTransicionFinal] = useState(false);
  const irAlFinal = () => {
    setTransicionFinal(true);

    setTimeout(() => {
      setPantalla("final");

      setTimeout(() => {
        setTransicionFinal(false);
      }, 700);
    }, 1200);
  };

  return (
    <main className="app">
      <HyperbolaBackground />

      {pantalla === "inicio" && (
        <section className="inicio escena-entrada">
          <div className="etiqueta portada-meta">
            <span>EXPERIENCIA MATEMÁTICA</span>
            <span className="curso-portada">5°A · TURNO TARDE</span>
            <span className="profesor-portada">PROF. BORGNINO</span>
          </div>

          <h1>HIPÉRBOLA</h1>

          <h2>MÁS ALLÁ DE LA CURVA</h2>

          <p className="misterio">
            Dos ramas. Dos focos.
            <br />
            Una propiedad sorprendente.
          </p>

          <p className="pregunta">¿La descubrimos?</p>

          <button
            className="boton-comenzar"
            onClick={() => setPantalla("estacion1")}
          >
            COMENZAR EXPERIENCIA
            <span> → </span>
          </button>

          <p className="pista">↓ Algo está a punto de cambiar...</p>
        </section>
      )}

      {pantalla === "estacion1" && (
        <section className="estacion escena-estacion">
          <div className="numero-estacion">ESTACIÓN 01</div>

          <div className="contenido-estacion">
            <div className="lado-texto">
              <span className="mini-etiqueta">Comencemos</span>

              <h3>
                ¿Qué es una
                <br />
                <strong>hipérbola?</strong>
              </h3>

              <p className="intro-estacion">
                Antes de mostrarte fórmulas, queremos que la veas. Que la
                entiendas. Que descubras por qué esta curva es mucho más
                interesante de lo que parece.
              </p>

              <div className="dato-curioso">
                <span>💡</span>
                <p>
                  Pista: no es solamente “una curva abierta”. Hay algo especial
                  ocurriendo entre sus dos focos.
                </p>
              </div>
            </div>

            <div className="lado-video">
              <div className="marco-video">
                <video
                  className="video-equipo"
                  src={videoPrueba}
                  controls
                  playsInline
                  preload="metadata"
                >
                  Tu navegador no puede reproducir este video.
                </video>
              </div>

              <button
                className="boton-secundario"
                onClick={() => setPantalla("laboratorio")}
              >
                ASÍ  FUNCIONA →
              </button>
            </div>
          </div>

          <button
            className="volver-inicio"
            onClick={() => setPantalla("inicio")}
          >
            ← VOLVER
          </button>
        </section>
      )}

      {pantalla === "laboratorio" && (
        <LaboratorioHiperbola
          onVolver={() => setPantalla("estacion1")}
          onSiguiente={() => setPantalla("focos")}
        />
      )}

      {pantalla === "focos" && (
        <EncuentraFocos
          onVolver={() => setPantalla("laboratorio")}
          onSiguiente={() => setPantalla("audios")}
        />
      )}

      {pantalla === "audios" && (
        <AudiosEquipo
          onVolver={() => setPantalla("focos")}
          onSiguiente={() => setPantalla("vida-real")}
        />
      )}

      {pantalla === "vida-real" && (
        <VidaReal
          onVolver={() => setPantalla("audios")}
          onSiguiente={() => setPantalla("desafio")}
        />
      )}

      {pantalla === "desafio" && (
        <DesafioHyperbola
          onVolver={() => setPantalla("vida-real")}
          onSiguiente={() => setPantalla("desafiar-curso")}
        />
      )}

      {pantalla === "desafiar-curso" && (
        <DesafiarCurso
          onVolver={() => setPantalla("desafio")}
          onFinalizar={irAlFinal}
        />
      )}

      {pantalla === "final" && (
        <FinalExperiencia
          onReiniciar={() => setPantalla("inicio")}
          onVolver={() => setPantalla("desafiar-curso")}
        />
      )}
      <div className={`transicion-final ${transicionFinal ? "activa" : ""}`} />
    </main>
  );
}

export default App;
