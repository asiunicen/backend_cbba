import Sequelize from 'sequelize';
import db from '../db/db.js';

// Model tipo_aula
export const TipoAula = db.define('tipo_aula', {
    id_tipo_aula: { type: Sequelize.INTEGER, primaryKey: true },
    descripcion: { type: Sequelize.STRING, allowNull: false }
},
{
    timestamps: false
})

// Model bloque
export const Bloque = db.define('bloque', {
    id_bloque: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: { type: Sequelize.TEXT, allowNull: false },
    ubicacion: { type: Sequelize.STRING, allowNull: false },
    descripcion: { type: Sequelize.STRING, allowNull: false }
},
{
    timestamps: false
})

// Model aula
export const Aula = db.define('aula', {
    id_aula: { type: Sequelize.INTEGER, primaryKey: true }, 
    id_tipo_aula: { type: Sequelize.INTEGER, allowNull: false },
    id_bloque: { type: Sequelize.INTEGER, allowNull: false },
    nombre: { type: Sequelize.STRING, allowNull: false },
    capacidad: { type: Sequelize.NUMBER, allowNull: false },
    //id_tipo_aula: { type: Sequelize.INTEGER, references: {model: TipoAula, key:'id_tipo_aula'} },
    //id_bloque: { type: Sequelize.INTEGER, references: {model: Bloque, key:'id_bloque'} },
   
},{
    timestamps: false
});


 //Relaciones
Aula.hasOne(TipoAula, { foreignKey: 'id_tipo_aula' })
Aula.belongsTo(TipoAula, { foreignKey: 'id_tipo_aula'})

Aula.hasOne(Bloque, { foreignKey: 'id_bloque' })
Aula.belongsTo(Bloque, { foreignKey: 'id_bloque' }) 

