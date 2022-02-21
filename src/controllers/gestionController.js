import { Gestion } from '../models/gestionModel.js';
const { Op } = require("sequelize");
import db from '../db/db.js';


/* export const getGestionActual = async (req, res) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    try {
        let gestiones = await Gestion.findOne({
            // order: [
            //    ['id_gestion', 'DESC']
            //],
            //limit:10 
            where: {
                [Op.and]: {
                    fecha_inicio: { [Op.lte]: todayDate },
                    fecha_fin: { [Op.gte]: todayDate } 
                }
                 
            }
        });  
        res.json({ data: gestiones });
    } catch (error) {
        res.json({message: `Something is wrong with table`})
        console.log(error);
    }
} */
//  export const getGestiones = async (req, res) => {
//     try {
//         let gestiones = await Gestion.findAll({
//             where: {
//                 [Op.and]: {
//                     fecha_inicio: { [Op.lte]: todayDate },
//                     fecha_fin: { [Op.gte]: todayDate }
//                 }
//             },
//             order: [
//                 ['id_gestion', 'DESC']
//             ],
//             limit:10
//         });

//         res.json({data: gestiones });
//     } catch (error) {
//         res.json({message: `Something is wrong with table`})
//         console.log(error);
//     }
// } 
export const getGestiones = async (req, res) => {
	try {
		const [results, metadata] = await db.query("select g.* from unicen.gestion g where g.descripcion not like 'V%' order by id_gestion desc limit 7");
		res.json(results);
	} catch(err) {
	    res.json({mensaje:"Error al cargar las gestiones"});
	}
}