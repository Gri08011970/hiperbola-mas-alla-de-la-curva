export const curso = {
  nombre: "5°A",
  turno: "TURNO TARDE",
  profesor: "BORGNINO",

  equipo: [
    "Sofi",
    "Facu",
    "Sara",
    "Marlene",
  ],

  companeros: [
    { nombre: "La Colo", activo: true },
    { nombre: "Sandino", activo: true },
    { nombre: "Facu", activo: true },
    { nombre: "Mili", activo: true },
    { nombre: "Tomi", activo: true },
    { nombre: "Cami", activo: true },
    { nombre: "Nacho", activo: true },
    { nombre: "Juli", activo: true },
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