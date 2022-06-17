import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderCode from './OrderCode';
import OrderItem from './OrderItem';

export default class Order {
  private cpf: Cpf;

  private coupon: Coupon | undefined;

  private orderItems: OrderItem[];

  private freight: number;

  code: OrderCode;

  constructor(
    cpf: string,
    readonly issueDate: Date = new Date(),
    readonly sequence: number = 1,
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.code = new OrderCode(issueDate, sequence);
  }

  addItem(item: Item, quantity: number): void {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon): void {
    if (coupon.isExpired(this.issueDate)) return;
    this.coupon = coupon;
  }

  getFreight(): number {
    return this.freight;
  }

  getCpf(): string {
    return this.cpf.value;
  }

  getCode(): string {
    return this.code.value;
  }

  getCoupon(): string | undefined {
    return this.coupon?.code;
  }

  getOrderItems(): OrderItem[] {
    return this.orderItems;
  }

  setFreight(freight: number): void {
    this.freight = freight;
  }

  getTotal(): number {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= total * (this.coupon.percentage / 100);
    }
    return total;
  }
}
