import { sequelize } from './database.config';
import { SEQUELIZE } from '../constants';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            try {
                await sequelize.authenticate();
                console.log("Database connection established successfully.");
            } catch (error) {
                console.error("Unable to connect to the database:", error);
            }
            await sequelize.sync();
            return sequelize;
        },
    },
];
