import Coupon from '../../../domain/entity/Coupon';
import Item from '../../../domain/entity/Item';
import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';
import DatabaseConnection from '../../database/DatabaseConnection';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.databaseConnection.query(
      `
      INSERT INTO 
      orderr (code, cpf, issue_date, freight, sequence, coupon, total) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) returning *
    `,
      [
        order.getCode(),
        order.getCpf(),
        order.issueDate,
        order.getFreight(),
        order.sequence,
        order.getCoupon(),
        order.getTotal(),
      ],
    );
    for (const orderItem of order.getOrderItems()) {
      await this.databaseConnection.query(
        `
        INSERT INTO
          order_item
        (id_order, id_item, price, quantity)
        VALUES ($1, $2, $3, $4)
      `,
        [orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity],
      );
    }
  }

  async count(): Promise<number> {
    const [data] = await this.databaseConnection.query(
      'select count(*)::int from orderr;',
      [],
    );
    return data.count;
  }
}
