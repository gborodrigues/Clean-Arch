import OrderItem from '../../src/domain/entity/OrderItem';

test('Should create a order item', () => {
  const orderItem = new OrderItem(1, 1000, 2);
  expect(orderItem.getTotal()).toBe(2000);
});
