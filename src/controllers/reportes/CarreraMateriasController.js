import db from '../../db/db.js';

export const getReporteCarreraMaterias = async (req, res) => {
	try {
        const id_gestion = req.params.id_gestion
        const id_plan_estudio = req.params.id_plan_estudio
		const [results, metadata] = await db.query(`SELECT distinct cod_carrera, cod_materia,id_nivel, grupo::int, id_grupo, id_gestion,  nombre, id_plan_estudio, aula,id_grupo_practica,docente_practica,aula_practica, docente_teoria
        FROM unicen.v_horario_docente_practica
        where id_plan_estudio =${id_plan_estudio} and id_gestion=${id_gestion}
    order by id_nivel asc`);
		res.json(results);
	} catch(err) {
	    res.json({mensaje:"Error al obtener el reporte carrera materias"});
	}
}