import db from '../db/db.js';

export const getMateriaByIdPlanMateria = async (req, res) => {
    try {
        const id =  req.params.id;
        const [results, metadata] = await db.query(`SELECT * FROM unicen.v_materia_carrera WHERE id_plan_materia=${id}`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar materia_carrera by id_plan_materia`})
        console.log(error);
    }
}

