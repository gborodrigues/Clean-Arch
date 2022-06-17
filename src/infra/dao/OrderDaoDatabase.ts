import OrderDao from '../../aplication/query/OrderDao';
import OrderDTO from '../../aplication/query/OrderDTO';
import OrderItemDTO from '../../aplication/query/OrderItemDTO';
import DatabaseConnection from '../database/DatabaseConnection';

export default class OrderDaoDatabase implements OrderDao {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async getOrders(): Promise<OrderDTO[]> {
    const orderData = await this.databaseConnection.query(
      'select id, code, cpf, total::float, freight::float from orderr',
      [],
    );
    return orderData;
  }

  async getOrder(code: string): Promise<OrderDTO> {
    const [orderData] = await this.databaseConnection.query(
      'select id, code, cpf, total::float, freight::float from orderr where code = $1',
      code,
    );
    return orderData;
  }

  async getOrderItems(orderId: number): Promise<OrderItemDTO[]> {
    const orderItemsData = await this.databaseConnection.query(
      'select i.description, oi.quantity, oi.price::float from order_item oi join item i on (oi.id_item = i.id) where id_order = $1',
      [orderId],
    );
    return orderItemsData;
  }
}
