import Coupon from '../../src/domain/entity/Coupon';

test('Should create a new valid coupon', () => {
  const coupon = new Coupon('VLE20', 20, new Date(2021, 11, 2));
  const isExpired = coupon.isExpired(new Date(2021, 10, 29));
  expect(isExpired).toBeFalsy();
});

test('Should create a new invalid coupon', () => {
  const coupon = new Coupon('VLE20', 20, new Date(2021, 11, 2));
  const isExpired = coupon.isExpired(new Date(2021, 11, 3));
  expect(isExpired).toBeTruthy();
});

test('Should create a new valid coupon that never expire', () => {
  const coupon = new Coupon('VLE20', 20);
  const isExpired = coupon.isExpired(new Date(2021, 11, 3));
  expect(isExpired).toBeFalsy();
});
