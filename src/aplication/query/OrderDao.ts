import OrderDTO from './OrderDTO';
import OrderItemDTO from './OrderItemDTO';

export default interface OrderDao {
  getOrders(): Promise<OrderDTO[]>;
  getOrder(code: string): Promise<OrderDTO>;
  getOrderItems(orderId: number): Promise<OrderItemDTO[]>;
}
