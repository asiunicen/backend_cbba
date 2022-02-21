import db from '../../db/db.js'

export const saveInscripcion = async (req, res) => {
    console.log(req.body);
    let id_inscripcion = req.body.id_inscripcion;
    let id_estudiante = req.body.id_estudiante;
    let fecha_transaccion = req.body.fecha_transaccion
    let id_gestion = req.body.id_gestion;
    let id_visible = req.body.id_visible;
    let id_personal = req.body.id_personal;
    let id_turno = req.body.id_turno;
    let estado = req.body.estado;
    let baja = req.body.baja;
    
    try {
        const [results, metadata] = await db.query(`insert into unicen.inscripcion values (
            ${id_inscripcion}, 
            ${id_estudiante},
            '${fecha_transaccion}', 
            '${id_gestion}',
            '${id_visible}', 
            '${id_personal}',
            ${id_turno},
            ${estado},
            ${baja})`);
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido guardar los datos de la tabla unicen.INSCRIPCION`})
        console.log(error);
    }
}

export const deleteTomaMaterias = async (req, res) => {
    let id_plan_materia_gestion_docente = req.params.id_plan_materia_gestion_docente    
    try {
        const[results, metadata] = await db.query(`DELETE FROM unicen.inscrip_pmgd
        WHERE id_plan_materia_gestion_docente = ${id_plan_materia_gestion_docente}`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido eliminar el registro de la tabla unicen.inscrip_pmgd`})
        console.log(error);
    }
}

export const getIdInscripcionTomaMaterias = async (req, res) => {
    let id_estudiante = req.params.id_estudiante
    let id_gestion = req.params.id_gestion
    try {
        const[results, metada] = await db.query(`select * from unicen.inscripcion where id_estudiante = ${id_estudiante} and id_gestion::int = ${id_gestion}`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido obtener el id_inscripcion_toma_materia`})
        console.log(error);
    }
}

export const getMateriasSolicitadas = async (req, res) => {
    let id_estudiante = req.params.id_estudiante
    let id_plan_estudio = req.params.id_plan_estudio
    let id_gestion = req.params.id_gestion
    console.log('las materias solicitadas... ya vienen en camino...!')
    try {
        const[results, metada] = await db.query(`select * from unicen.get_materias_adicion(${id_estudiante}, ${id_plan_estudio}, ${id_gestion});`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: 'Error no se ha podido obtener las materias solicitadas'})
        console.log(error)
    }
}