import pgp from 'pg-promise';

import DatabaseConnection from './DatabaseConnection';

export default class DatabaseConnectionAdapter implements DatabaseConnection {
  pgp: any;

  constructor() {
    this.pgp = pgp()('postgresql://postgres:123456@localhost:5432/app');
  }

  query(statement: string, params: any) {
    return this.pgp.query(statement, params);
  }
}
