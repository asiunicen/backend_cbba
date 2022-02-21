import db from '../db/db.js';

export const getCarrerasSalud = async (req, res) => {
	try {
		const [results, metadata] = await db.query("SELECT * FROM unicen.v_carrera");
		res.json(results);
	} catch(err) {
	    res.json({mensaje:"Error al cargar las carreras"});
	}
}
