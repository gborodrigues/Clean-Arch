export default class PlaceOrderInput {
  constructor(
    readonly cpf: string,
    readonly orderItems: any[],
    readonly issueDate: Date,
    readonly sequenceNumber: number,
    readonly coupon?: string,
  ) {}
}
