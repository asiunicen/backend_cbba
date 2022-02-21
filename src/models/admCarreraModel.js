import Sequelize from 'sequelize';
import db from '../db/db.js';

// Model carrera
export const Carrera = db.define('carrera', {    
    id_carrera: { type: Sequelize.INTEGER, primaryKey: true },
    id_tipo_carrera: { type: Sequelize.INTEGER, allowNull: false },    
    cod_carrera: { type: Sequelize.STRING, allowNull: false },
    num_carrera: { type: Sequelize.INTEGER, allowNull: false },
    nombre: { type: Sequelize.STRING, allowNull: false },
    activo: { type: Sequelize.STRING, allowNull: false },
    coordinador: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false }
},{
    timestamps: false
});