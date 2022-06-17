import Cpf from '../../src/domain/entity/Cpf';

test('Should validate a cpf', () => {
  const cpf = new Cpf('125.324.138-40');
  expect(cpf).toBeDefined();
});

test('Should not validate a cpf', () => {
  expect(() => new Cpf('111.111.111-40')).toThrow(new Error('Invalid cpf'));
});
