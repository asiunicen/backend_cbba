import Sequelize from 'sequelize'
import db from '../db/db.js'

// Model grupo_practica (grupo-practica)
export const GrupoPractica = db.define('grupo_practica', {
    id_g_practica: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    id_grupo: { type: Sequelize.INTEGER, allowNull: false },
    id_grupo_practica: { type: Sequelize.INTEGER, allowNull: false },
    id_gestion: { type: Sequelize.INTEGER, allowNull: false },
    cantidad: { type: Sequelize.INTEGER, allowNull: false },
    id_personal: { type: Sequelize.STRING, allowNull: false },
    rotacion: { type: Sequelize.STRING, allowNull: false },
    f_inicio_rotacion: { type: Sequelize.DATE, allowNull: false },
    f_fin_rotacion: { type: Sequelize.DATE, allowNull: false },
    fecha_inicio: { type: Sequelize.DATE, allowNull: false },
    fecha_fin: { type: Sequelize.DATE, allowNull: false }
},
{
    timestamps: false
}) 

// Model asignacion_practica
export const AsignacionPractica = db.define('asignacion_practica', {
    id_asignacion_practica: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    id_g_practica: { type: Sequelize.INTEGER, allowNull: false },
    id_aula: { type: Sequelize.INTEGER, allowNull: false },
    id_franja_horaria: { type: Sequelize.INTEGER, allowNull: false },
    id_dia: { type: Sequelize.INTEGER, allowNull: false },
    //id_gestion: { type: Sequelize.INTEGER, allowNull: true }
},
{
    timestamps: false
})

AsignacionPractica.hasOne(GrupoPractica, { foreignKey: 'id_g_practica' })
AsignacionPractica.belongsTo(GrupoPractica, { foreignKey: 'id_g_practica' })