/**
 * @module validator
 * @description Componente propio de validación de tareas.
 * Contrato: recibe un objeto tarea y retorna { valid: bool, errors: [] }
 */

function validarTarea(tarea) {
  const errores = [];

  if (!tarea.titulo || tarea.titulo.trim().length === 0)
    errores.push('El título no puede estar vacío.');

  if (tarea.titulo && tarea.titulo.length > 100)
    errores.push('El título no debe superar 100 caracteres.');

  if (!tarea.materia || tarea.materia.trim().length === 0)
    errores.push('La materia es obligatoria.');

  const fechaValida = !isNaN(Date.parse(tarea.fechaEntrega));
  if (!fechaValida)
    errores.push('La fecha de entrega no es válida (use YYYY-MM-DD).');

  return { valid: errores.length === 0, errors: errores };
}

module.exports = { validarTarea };