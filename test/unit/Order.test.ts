import Coupon from '../../src/domain/entity/Coupon';
import Item from '../../src/domain/entity/Item';
import Order from '../../src/domain/entity/Order';

test('Should not create a order with invalid cpf', () => {
  expect(() => new Order('111.111.111.11')).toThrow(new Error('Invalid cpf'));
});

test('Should create a order', () => {
  const order = new Order('388.935.408-43');
  expect(order).toBeDefined();
});

test('Should create a order with 3 itens', () => {
  const order = new Order('388.935.408-43');
  order.addItem(new Item(1, 'Instrumentos musicais', 'Guitarra', 1000), 1);
  order.addItem(new Item(3, 'Instrumentos musicais', 'Amplificador', 1000), 1);
  order.addItem(new Item(4, 'Instrumentos musicais', 'Cabo', 1000), 3);
  const total = order.getTotal();
  expect(total).toBe(5000);
});

test('Should create a order with 3 itens with a coupon', () => {
  const order = new Order('388.935.408-43');
  order.addItem(new Item(1, 'Instrumentos musicais', 'Guitarra', 1000), 1);
  order.addItem(new Item(3, 'Instrumentos musicais', 'Amplificador', 1000), 1);
  order.addItem(new Item(4, 'Instrumentos musicais', 'Cabo', 1000), 3);
  order.addCoupon(new Coupon('VALE20', 20));
  const total = order.getTotal();
  expect(total).toBe(4000);
});

test('Should not create a order with a expired coupon', () => {
  const order = new Order('388.935.408-43', new Date(2021, 10, 10));
  order.addItem(new Item(1, 'Instrumentos musicais', 'Guitarra', 1000), 1);
  order.addItem(new Item(3, 'Instrumentos musicais', 'Amplificador', 1000), 1);
  order.addItem(new Item(4, 'Instrumentos musicais', 'Cabo', 1000), 3);
  order.addCoupon(new Coupon('VALE20', 20, new Date(2021, 10, 1)));
  const total = order.getTotal();
  expect(total).toBe(5000);
});

test('Should create a order with generated code', () => {
  const order = new Order('388.935.408-43', new Date('2021-03-01'));
  order.addItem(
    new Item(1, 'Instrumentos musicais', 'Guitarra', 1000, 100, 30, 10, 3),
    1,
  );
  order.addItem(
    new Item(3, 'Instrumentos musicais', 'Amplificador', 5000, 100, 50, 50, 20),
    1,
  );
  order.addItem(
    new Item(4, 'Instrumentos musicais', 'Cabo', 30, 10, 10, 10, 0.9),
    3,
  );
  const { code } = order;
  expect(code.value).toBe('202100000001');
});
