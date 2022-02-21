import Sequelize from 'sequelize';
import db from '../db/db.js';

export const Asignacion = db.define('asignacion', {
    id_asignacion: { type: Sequelize.INTEGER, primaryKey: true },
    id_grupo: { type: Sequelize.INTEGER, allowNull: false },
    id_aula: { type: Sequelize.INTEGER, allowNull: false },
    id_franja_horaria: { type: Sequelize.INTEGER, allowNull: false },
    id_dia: { type: Sequelize.INTEGER, allowNull: false },
    id_gestion: { type: Sequelize.INTEGER, allowNull: false },
}, 
{ timestamps: false }
);

export const EstudiantePlanEstudio = db.define('estudiante_plan_estudio', {
    id_estudiante_plan_estudio: { type: Sequelize.INTEGER, primaryKey: true},
    id_estudiante: { type: Sequelize.INTEGER, allowNull: false },
    id_plan_estudio: { type: Sequelize.INTEGER, allowNull: false },
    fecha: { type: Sequelize.DATE, allowNull: false },
    activo: { type: Sequelize.STRING, allowNull: false },
},
{ timestamps: false}
);