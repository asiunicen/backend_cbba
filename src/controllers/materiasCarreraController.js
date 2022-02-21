import db from '../db/db.js';

export const getMateriasCarreraAll = async (req, res) => {
    try {
        const [results, metadata] = await db.query(`SELECT * FROM unicen.v_materia_carrera`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar materia_carrera`})
        console.log(error);
    }
}

export const getMateriasCarreraByIdPlanMateria = async (req, res) => {
    try {
        const id =  req.params.id;
        const [results, metadata] = await db.query(`SELECT * FROM unicen.v_materia_carrera WHERE id_plan_estudio=${id}`); 
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar cod carrera`})
        console.log(error);
    }
}

export const modificarPracticaHospitalaria = async (req, res) => {
    try {
        const id_plan_materia =  req.params.id_plan_materia
        const practica_hospitalaria = req.params.practica_hospitalaria
        const [results, metadata] = await db.query(`UPDATE unicen.plan_materia
                                                    SET practica_hospitalaria=${practica_hospitalaria}
                                                    WHERE id_plan_materia = ${id_plan_materia};`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al modificar en la tabla PLAN_MATERIA cod carrera`})
        console.log(error);
    }
}