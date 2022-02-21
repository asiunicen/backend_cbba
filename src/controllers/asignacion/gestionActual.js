import { Gestion } from '../../models/gestionModel.js';
const { Op } = require("sequelize");


export const getGestionActual = async (req, res) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    try {
        let gestiones = await Gestion.findOne({
            where: {
                [Op.and]: {
                    fecha_inicio: { [Op.lte]: todayDate },
                    fecha_fin: { [Op.gte]: todayDate },
		    descripcion: { [Op.notLike]: 'V%' }
                }
            }
        });
        res.json({ data: gestiones });
    } catch (error) {
        res.json({message: `Something is wrong with table`})
        console.log(error);
    }
}
