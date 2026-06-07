const formatter = require('../utils/formatter');

describe('formatter – pruebas con spies', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('exito() debe llamar console.log una vez', () => {
    formatter.exito('Todo correcto');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('error() debe llamar console.log con el mensaje', () => {
    formatter.error('Ocurrió un fallo');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('info() debe llamar console.log una vez', () => {
    formatter.info('Información del sistema');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('titulo() debe llamar console.log una vez', () => {
    formatter.titulo('GestorUTL');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
