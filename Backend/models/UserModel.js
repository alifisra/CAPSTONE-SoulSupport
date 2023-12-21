import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

export const Users = db.define('users',{
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
},{
    freezeTableName:true
});

export const articles = db.define('articles',{
    imageUrl:{
        type:DataTypes.STRING
    },
    titleArtikel:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.TEXT
    },
    createdAt:{
    type: DataTypes.DATE,
    // defaultValue: Sequelize.NOW, // Nilai default adalah waktu saat ini
    },
    userId:{
        type:DataTypes.INTEGER
    },
},{
    freezeTableName:true
});
articles.belongsTo(Users, { foreignKey: 'userId' })

export default Users;
