/**
 * @module stats
 * @description Componente propio para calcular métricas de tareas.
 * Contrato: Recibe un arreglo de tareas y retorna un objeto { completadas: int, pendientes: int }
 */
function calcularEstadisticas(tareas) {
  let completadas = 0;
  let pendientes = 0;

  tareas.forEach(tarea => {
    if (tarea.completed) {
      completadas++;
    } else {
      pendientes++;
    }
  });

  return { completadas, pendientes };
}

module.exports = { calcularEstadisticas };