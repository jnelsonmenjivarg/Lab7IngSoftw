const { validarTarea } = require('../components/validator');

describe('validarTarea – pruebas unitarias', () => {

  test('debe retornar válido para una tarea correcta', () => {
    const tarea = {
      titulo: 'Práctica 8 de Ingeniería de Software',
      materia: 'Ingeniería de Software',
      fechaEntrega: '2026-06-20'
    };
    const resultado = validarTarea(tarea);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors).toHaveLength(0);
  });

  test('debe fallar si el título está vacío', () => {
    const tarea = { titulo: '', materia: 'IS', fechaEntrega: '2026-06-20' };
    const resultado = validarTarea(tarea);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('El título no puede estar vacío.');
  });

  test('debe fallar si el título supera 100 caracteres', () => {
    const tarea = { titulo: 'A'.repeat(101), materia: 'IS', fechaEntrega: '2026-06-20' };
    const resultado = validarTarea(tarea);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('El título no debe superar 100 caracteres.');
  });

  test('debe fallar si la materia está vacía', () => {
    const tarea = { titulo: 'Tarea válida', materia: 'Error', fechaEntrega: '2026-06-20' };
    const resultado = validarTarea(tarea);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('La materia es obligatoria.');
  });

  test('debe fallar si la fecha no tiene formato válido', () => {
    const tarea = { titulo: 'Tarea', materia: 'IS', fechaEntrega: 'no-es-fecha' };
    const resultado = validarTarea(tarea);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('La fecha de entrega no es válida (use YYYY-MM-DD).');
  });

  test('debe acumular múltiples errores', () => {
    const tarea = { titulo: '', materia: '', fechaEntrega: 'invalida' };
    const resultado = validarTarea(tarea);
    expect(resultado.errors.length).toBeGreaterThanOrEqual(3);
  });

});
