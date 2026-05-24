const { validarTarea } = require('./components/validator');
const { calcularEstadisticas } = require('./components/stats');
const formatter = require('./utils/formatter');
const { obtenerTareas, crearTarea, obtenerFraseMotivacional } = require('./services/taskService');

const nuevaTarea = {
  titulo      : 'Entregar práctica 7 de Ingeniería de Software',
  materia     : 'Ingeniería de Software',
  fechaEntrega: '2026-06-13'
};

async function main() {
  // Reto Autónomo: Mostrar frase motivacional inicial
  try {
    const frase = await obtenerFraseMotivacional();
    formatter.titulo('FRASE MOTIVACIONAL DEL DÍA');
    formatter.info(`"${frase.text}" — ${frase.author}`);
  } catch (e) {
    // Failsafe silencioso si la API externa falla
  }

  // 1. Validar con componente propio
  formatter.titulo('GestorUTL – Validación de tarea');
  const resultado = validarTarea(nuevaTarea);

  if (!resultado.valid) {
    resultado.errors.forEach(e => formatter.error(e));
    return;
  }
  formatter.exito('Tarea válida. Enviando al servicio REST...');

  // 2. Crear tarea vía REST
  const creada = await crearTarea(nuevaTarea);
  formatter.exito(`Tarea creada con ID de servidor ficticio: ${creada.id}`);
  formatter.info(`Título registrado: ${creada.title}`);

  // 3. Listar tareas existentes del servidor
  formatter.titulo('Tareas existentes (JSONPlaceholder)');
  const tareas = await obtenerTareas(5);
  tareas.forEach(t => {
    const estado = t.completed ? '✔ Completada' : '○ Pendiente';
    formatter.info(`[${t.id}] ${t.title} — ${estado}`);
  });

  // Reto Autónomo: Calcular estadísticas del arreglo obtenido
  formatter.titulo('Métricas del Sistema (Componente stats.js)');
  const estadisticas = calcularEstadisticas(tareas);
  formatter.exito(`Tareas Completadas: ${estadisticas.completadas}`);
  formatter.error(`Tareas Pendientes: ${estadisticas.pendientes}`);
}

main().catch(err => formatter.error('Error general: ' + err.message));