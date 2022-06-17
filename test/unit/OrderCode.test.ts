import OrderCode from '../../src/domain/entity/OrderCode';

test('Should create a request of a code', () => {
  const date = new Date('2021-03-01');
  const sequence = 1;
  const code = new OrderCode(date, sequence);
  expect(code.value).toBe('202100000001');
});
