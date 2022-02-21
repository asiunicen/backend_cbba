import db from '../../db/db.js';

export const getDocentes = async (req, res) => {
    try {
        const id_materia = req.params.id_materia;
        const [results, metadata] = await db.query(`select * from unicen.get_docentes_materia(${id_materia}, 0)`); //SELECT * FROM unicen.v_docente_carrera
        res.json(results)
    } catch (error) {
        res.json({message: `Error cargando docentes`})
    }
}

