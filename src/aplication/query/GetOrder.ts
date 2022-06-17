import GetOrderOutput from '../dto/GetOrderOutput';
import OrderDao from './OrderDao';

export default class GetOrder {
  constructor(readonly orderDao: OrderDao) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const orderData = await this.orderDao.getOrder(code);
    const orderItemsData = await this.orderDao.getOrderItems(orderData.id);

    const getOrderOutput = new GetOrderOutput(
      orderData.code,
      orderData.cpf,
      orderItemsData,
      orderData.total,
      orderData.freight,
    );
    return getOrderOutput;
  }
}
