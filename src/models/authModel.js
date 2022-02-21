import Sequelize from 'sequelize';
import db from '../db/db.js';

export const Personal = db.define('datos_personal',{
    id_datos_personal: { type: Sequelize.INTEGER, primaryKey: true },
    login: { type: Sequelize.STRING, allowNull: false},
    pass: { type: Sequelize.STRING, allowNull: false},
    paterno: { type: Sequelize.STRING, allowNull: false},
    materno: { type: Sequelize.STRING, allowNull:false},
    nombres: { type: Sequelize.STRING, allowNull:false}
},
{ timestamps:false }
);

export const Estudiante = db.define('datos_estudiante',{
    id_datos_estudiante: { type: Sequelize.INTEGER, primaryKey: true },
    login: { type: Sequelize.STRING, allowNull: false},
    pass: { type: Sequelize.STRING, allowNull: false},
    paterno: { type: Sequelize.STRING, allowNull: false},
    materno: { type: Sequelize.STRING, allowNull:false},
    nombres: { type: Sequelize.STRING, allowNull:false}
},
{ timestamps:false }
);


