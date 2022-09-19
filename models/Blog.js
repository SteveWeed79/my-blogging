const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model { }

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;