import OrderRepository from '../../domain/repository/OrderRepository';

export default class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(code: string): Promise<any> {}
}
