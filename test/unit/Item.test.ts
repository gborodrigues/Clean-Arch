import Item from '../../src/domain/entity/Item';

test('Should create a item', () => {
  const item = new Item(1, 'Instrumentos musicais', 'Guitarra', 1000);
  expect(item.idItem).toBe(1);
});

test('Should calculate the volume', () => {
  const item = new Item(
    1,
    'Instrumentos musicais',
    'Guitarra',
    1000,
    100,
    30,
    10,
  );
  const volume = item.getVolume();
  expect(volume).toBe(0.03);
});

test('Should calculate the density', () => {
  const item = new Item(
    1,
    'Instrumentos musicais',
    'Guitarra',
    1000,
    100,
    30,
    10,
    3,
  );
  const volume = item.getDensity();
  expect(volume).toBe(100);
});

test('Should calculate the freight', () => {
  const item = new Item(
    1,
    'Instrumentos musicais',
    'Guitarra',
    1000,
    100,
    30,
    10,
    3,
  );
  const volume = item.getFreight();
  expect(volume).toBe(30);
});

test('Should calculate the minimum freight', () => {
  const item = new Item(
    2,
    'Instrumentos musicais',
    'Cabo',
    30,
    10,
    10,
    10,
    0.9,
  );
  const volume = item.getFreight();
  expect(volume).toBe(10);
});
