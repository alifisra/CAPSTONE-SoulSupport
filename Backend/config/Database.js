// Database.js

import { Sequelize } from 'sequelize';

const db = new Sequelize('env.db','ebv.username', 'env.password',{
    host : "env.ip
    dialect:"mysql"
});



// Export the authenticate function
export const authenticate = async () => {
    try {
        await db.authenticate();
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error;
    }
};

export default db;
