import db from '../../db/db.js';

export const getIdPMGD = async (req, res) => {
    let id_materia = req.params.id_materia
    try {
        const [results, metadata] = await db.query(`select id_plan_materia_gestion_docente from unicen.plan_materia pm, unicen.plan_materia_gestion_docente pmgd where id_materia = ${id_materia} and pm.id_plan_materia = pmgd.id_plan_materia_gestion_docente`);
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener el id_plan_materia_gestion_docente.`})
        console.log(error)
    }
}

export const getIdInscripcionLast = async (req, res) => {    
    try {
        const [results, metadata] = await db.query(`select max(id_inscripcion)+1 as id_inscripcion from unicen.inscripcion`);
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener el ultimo id_inscripcion`})
        console.log(error)
    }
}

export const getIdInscripcion = async (req, res) => {    
    try {
        const id_estudiante = req.params.id_estudiante
        const id_gestion = req.params.id_gestion
        const [results, metadata] = await db.query(`select * from unicen.inscripcion where id_estudiante = ${id_estudiante} and id_gestion::int = ${id_gestion} order by fecha_transaccion desc limit 1`);
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener el ultimo id_inscripcion`})
        console.log(error)
    }
}

export const getIdPersonal = async (req, res) => {    
    let id_datos_personal = req.params.id_datos_personal
    try {
        const [results, metadata] = await db.query(`select cp.id_personal 
        from unicen.datos_personal dp, unicen.cuenta_personal cp
        where dp.id_datos_personal = cp.id_datos_personal and cp.id_datos_personal = ${id_datos_personal}
        order by cp.fecha_creacion desc limit 1`);
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener el id_personal`})
        console.log(error)
    }
}

export const getIdInscripPmgdLast = async (req, res) => {
    try {        
        const [results, metadata] = await db.query(`select max(id_inscrip_pmgd)+1 as id_inscrip from unicen.inscrip_pmgd`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al obtener el ultimo id + 1, de la tabla inscrip_pmgd`})
        console.log(error);
    }
}

export const saveInscripPMGD = async (req, res) => {
    
    let id_inscrip_pmgd = req.body.id_inscrip_pmgd
    let id_plan_materia_gestion_docente = req.body.id_plan_materia_gestion_docente
    let id_inscripcion = req.body.id_inscripcion
    let fecha_transaccion = req.body.fecha_transaccion
    let id_personal = req.body.id_personal
    let estado_final = req.body.estado_final
    let recursado = req.body.recursado
    let tipo_materia = req.body.tipo_materia
    
    try {
        const [results, metadata] = await db.query(`INSERT INTO unicen.inscrip_pmgd(
            id_inscrip_pmgd, id_plan_materia_gestion_docente, id_inscripcion, fecha_transaccion, id_personal, estado_final, recursado, tipo_materia)
            VALUES (${id_inscrip_pmgd}, ${id_plan_materia_gestion_docente}, ${id_inscripcion}, '${fecha_transaccion}', '${id_personal}', '${estado_final}', '${recursado}', ${tipo_materia});`);
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido guardar los datos de la tabla unicen.INSCRIPCION`})
        console.log(error);
    }
}
export const getMateriasRecuperadas = async (req, res) => {
    let id_estudiante = req.params.id_estudiante;
    let id_plan_estudio = req.params.id_plan_estudio;
    let id_gestion = req.params.id_gestion
    try {
        const [results, metadata] = await db.query(`SELECT * FROM unicen.get_materias_new(${id_estudiante}, ${id_plan_estudio}, ${id_gestion}) order by id_semestre, cod_materia asc`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener de la funcion get_materias las materias ofertadas.`})
        console.log(error)
    }
}