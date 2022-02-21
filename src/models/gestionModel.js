import Sequelize from 'sequelize';
import db from '../db/db.js';

export const Gestion = db.define('gestion', {
    id_gestion: { type: Sequelize.STRING, primaryKey: true },
    descripcion: { type: Sequelize.STRING, allowNull: false },
    fecha_inicio: { type: Sequelize.STRING, allowNull: false },
    fecha_fin: { type: Sequelize.STRING, allowNull: false }
}, 
{ timestamps: false }
);

