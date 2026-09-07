export const curso = {
  nombre: "5°A",
  turno: "TURNO TARDE",
  profesor: "BORGNINO",

  equipo: [
    "Sofi",
    "Facu",
    "Sarah",
    "Marlene",
  ],

  companeros: [
    { nombre: "Elias", activo: true },
    { nombre: "Sandino", activo: true },
    { nombre: "Liz", activo: true },
    { nombre: "Mía", activo: true },
    { nombre: "Diego", activo: true },
    { nombre: "Abril", activo: true },
    { nombre: "Noah", activo: true },
    { nombre: "Kiara", activo: true },
    { nombre: "Cesar", activo: true },
    { nombre: "Blanca", activo: true },
    { nombre: "Alma", activo: true },
    { nombre: "Nicoll", activo: true },
    { nombre: "Bianca", activo: true },
    { nombre: "Natasha", activo: true },
  ],
};
export const frasesDesafio = [
  (nombre) =>
    `${nombre}, llegó tu momento. Tenés 15 segundos. 😈`,

  (nombre) =>
    `Dicen que ${nombre} puede resolverlo... ¿será verdad? 👀`,

  (nombre) =>
    `${nombre}, el curso confía en vos. Más o menos. 😂`,

  (nombre) =>
    `Atención: ${nombre} acaba de entrar en zona de riesgo. ⚠️`,

  (nombre) =>
    `${nombre}, sin presión... pero todos están mirando. 👀`,

  (nombre) =>
    `Tenemos voluntario involuntario: ${nombre}. 😏`,

  (nombre) =>
    `${nombre}, 15 segundos para salvar el honor de 5°A.`,

  (nombre) =>
    `El sistema eligió a ${nombre}. Nosotros no tuvimos nada que ver. 🤷`,
];
export const frasesAcierto = [
  (nombre) => `🔥 ${nombre} vino a jugar en serio.`,
  (nombre) => `Correcto. ${nombre} acaba de salvar al equipo.`,
  (nombre) => `🏆 Punto para ${nombre}. Que alguien lo anote.`,
  (nombre) => `${nombre}: 1 · Hipérbola: 0 😎`,
  (nombre) => `El sistema confirma que ${nombre} sabe demasiado.`,
];

export const frasesError = [
  (nombre) => `Casi, ${nombre}. La hipérbola sigue ganando. 😈`,
  (nombre) => `${nombre} estuvo cerca... pero cerca no suma puntos. 😂`,
  (nombre) => `❌ El sistema no perdona, ${nombre}.`,
  (nombre) => `${nombre}, todavía hay dignidad. Intentemos otra vez. 😏`,
];