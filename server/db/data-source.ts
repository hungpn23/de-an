import { DataSource, DataSourceOptions } from 'typeorm';

export const Mysql: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hung1235',
  database: 'de_an',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(Mysql);

export default dataSource;
