import db from '../../db/db.js';

export const tiposCarreras = async (req, res) => {  

    try {        
        const [results, metadata] = await db.query(`SELECT * FROM unicen.tipo_carrera WHERE descripcion ilike 'LICENCIATURA%'`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar los tipos de carrreras`})
        console.log(error);
    }
}