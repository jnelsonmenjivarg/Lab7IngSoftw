/**
 * @module taskService
 * @description Servicio REST que consume JSONPlaceholder y cotizaciones aleatorias.
 */
const axios = require('axios');
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const QUOTE_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

async function obtenerTareas(limite = 5) {
  const resp = await axios.get(`${BASE_URL}?_limit=${limite}`);
  return resp.data;
}

async function crearTarea(tarea) {
  const payload = {
    title    : tarea.titulo,
    body     : tarea.materia,
    userId   : 1,
    completed: false
  };
  const resp = await axios.post(BASE_URL, payload);
  return resp.data;
}

// Reto Autónomo: Obtener frase motivacional random
async function obtenerFraseMotivacional() {
  try {
    const resp = await axios.get(QUOTE_URL);
    // Retorna la frase y el autor de la estructura de la API
    return {
      text: resp.data.data.content,
      author: resp.data.data.author
    };
  } catch (error) {
    return { text: "El éxito es la suma de pequeños esfuerzos repetidos.", author: "Anónimo" };
  }
}

module.exports = { obtenerTareas, crearTarea, obtenerFraseMotivacional };