const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { obtenerTareas, crearTarea } = require('../services/taskService');

const mock = new MockAdapter(axios);
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

describe('taskService – pruebas de integración', () => {

  afterEach(() => { mock.reset(); });

  test('obtenerTareas() debe retornar un arreglo de tareas', async () => {
    const fakeData = [
      { id: 1, title: 'Tarea A', completed: false },
      { id: 2, title: 'Tarea B', completed: true  }
    ];
    mock.onGet(`${BASE_URL}?_limit=2`).reply(200, fakeData);
    const tareas = await obtenerTareas(2);
    expect(tareas).toHaveLength(2);
    expect(tareas[0].title).toBe('Tarea A');
  });

  test('crearTarea() debe retornar el objeto creado con id', async () => {
    const nuevaTarea = {
      titulo: 'Práctica 8', materia: 'IS', fechaEntrega: '2026-06-20'
    };
    mock.onPost(BASE_URL).reply(201, { id: 201, title: 'Práctica 8' });
    const creada = await crearTarea(nuevaTarea);
    expect(creada.id).toBe(201);
    expect(creada.title).toBe('Práctica 8');
  });

  test('obtenerTareas() debe lanzar error si el servidor falla', async () => {
    mock.onGet().reply(500);
    await expect(obtenerTareas(5)).rejects.toThrow();
  });

});
