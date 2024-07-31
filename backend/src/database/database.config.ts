
import { Sequelize } from 'sequelize-typescript';
import config from "src/config";
import { Movie } from 'src/models/movie.entity';
import { User } from 'src/models/user.entity';

export const sequelize = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.dbPassword,
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    models: [User, Movie]
});
