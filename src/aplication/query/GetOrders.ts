import GetOrderOutput from '../dto/GetOrderOutput';
import OrderDao from './OrderDao';

export default class GetOrders {
  constructor(readonly orderDao: OrderDao) {}

  async execute(): Promise<GetOrderOutput[]> {
    const ordersData = await this.orderDao.getOrders();
    const getOrdersOutput: GetOrderOutput[] = [];
    for (const orderData of ordersData) {
      const orderItemsData = await this.orderDao.getOrderItems(orderData.id);
      const getOrderOutput = new GetOrderOutput(
        orderData.code,
        orderData.cpf,
        orderItemsData,
        orderData.total,
        orderData.freight,
      );
      getOrdersOutput.push(getOrderOutput);
    }

    return getOrdersOutput;
  }
}
