import Order from '../../domain/entity/Order';
import PlaceOrderOutput from './PlaceOrderOutput';

export default class PlaceOrderOutputAssembler {
  // DTO poderia ser um type do Typescript
  static assembly(order: Order): PlaceOrderOutput {
    const total = order.getTotal();
    return new PlaceOrderOutput(order.code.value, total);
  }
}
