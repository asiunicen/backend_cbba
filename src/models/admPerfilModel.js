import Sequelize from 'sequelize';
import db from '../db/db.js';

// Model estudiante
export const Estudiante = db.define('estudiante_egresado', {    
    id_perfil_trabajo: { type: Sequelize.INTEGER, primaryKey: true },
    id_estudiante: { type: Sequelize.INTEGER, primaryKey: true },    
    matricula: { type: Sequelize.STRING, allowNull: false },
    nombres: { type: Sequelize.STRING, allowNull: false },
    carrera: { type: Sequelize.STRING, allowNull: false },
    perfil: { type: Sequelize.STRING, allowNull: false }    
},{
    timestamps: false
});

// Model perfil_trabajo
export const Perfil_Trabajo = db.define('perfil_trabajo', {
    id_perfil_trabajo: { type: Sequelize.STRING, primaryKey: true }, 
    id_estudiante: { type: Sequelize.INTEGER, allowNull: false },
    nombre: { type: Sequelize.STRING, allowNull: false },
    fecha: { type: Sequelize.DATE, allowNull: false },
    id_plan_estudio: { type: Sequelize.INTEGER, allowNull: false },
    detalle: { type: Sequelize.STRING, allowNull: false }
    //id_tipo_aula: { type: Sequelize.INTEGER, references: {model: TipoAula, key:'id_tipo_aula'} },
    //id_bloque: { type: Sequelize.INTEGER, references: {model: Bloque, key:'id_bloque'} },
   
},{
    timestamps: false
});