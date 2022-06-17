import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import PlaceOrder from '../../src/aplication/usecase/PlaceOrder';
import PlaceOrderInput from '../../src/aplication/dto/PlaceOrderInput';
import GetOrders from '../../src/aplication/query/GetOrders';
import OrderDaoDatabase from '../../src/infra/dao/OrderDaoDatabase';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

let placeOrder: PlaceOrder;
let getOrders: GetOrders;

beforeEach(() => {
  const databaseConnection = new DatabaseConnectionAdapter();
  placeOrder = new PlaceOrder(
    new DatabaseRepositoryFactory(databaseConnection),
  );
  const orderDao = new OrderDaoDatabase(databaseConnection);
  getOrders = new GetOrders(orderDao);
});

test('Should get a orde by code', async () => {
  const input = new PlaceOrderInput(
    '388.935.408-43',
    [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 1,
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
  const getOrdersOutput = await getOrders.execute();
});
