import Sequelize from 'sequelize';
import db from '../db/db.js';

// Model area
export const Area = db.define('area_trabajo', {    
    id_area_trabajo: { type: Sequelize.INTEGER, primaryKey: true },        
    detalle: { type: Sequelize.STRING, allowNull: false },    
    cod_aux: { type: Sequelize.INTEGER, allowNull: true }
},{
    timestamps: false
});

// Model campo
export const Campo = db.define('campo_trabajo', {    
    id_campo_trabajo: { type: Sequelize.INTEGER, primaryKey: true },        
    id_area_trabajo: { type: Sequelize.INTEGER, allowNull: false },
    detalle: { type: Sequelize.STRING, allowNull: false }
},{
    timestamps: false
});

// Model sub_campo
export const SubCampo = db.define('sub_campo_trabajo', {    
    id_sub_campo_trabajo: { type: Sequelize.INTEGER, primaryKey: true },        
    id_campo_trabajo: { type: Sequelize.INTEGER, allowNull: false },
    detalle: { type: Sequelize.STRING, allowNull: false }
},{
    timestamps: false
});