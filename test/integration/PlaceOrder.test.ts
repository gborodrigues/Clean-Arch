import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import PlaceOrder from '../../src/aplication/usecase/PlaceOrder';
import PlaceOrderInput from '../../src/aplication/dto/PlaceOrderInput';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

let placeOrder: PlaceOrder;

beforeEach(() => {
  const databaseConnection = new DatabaseConnectionAdapter();
  placeOrder = new PlaceOrder(
    new DatabaseRepositoryFactory(databaseConnection),
  );
});

test('Should make a order', async () => {
  const input = new PlaceOrderInput(
    '388.935.408-43',
    [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 2,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
    new Date('2021-03-01'),
    1,
    'VALE20',
  );
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(8872);
});
