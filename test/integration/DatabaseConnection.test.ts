import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';

test.skip('Should create a new connection with database', async () => {
  const databaseConnection = new DatabaseConnectionAdapter();
  const items = await databaseConnection.query('select * from item;', []);
  expect(items).toHaveLength(3);
});
