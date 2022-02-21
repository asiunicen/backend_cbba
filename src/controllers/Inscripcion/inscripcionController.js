import db from '../../db/db.js'

export const gruposMateriaDocente = async (req, res) => {
    let id_materia = req.params.id_materia;
    let id_plan_estudio = req.params.id_plan_estudio;
    let id_gestion = req.params.id_gestion;
    try {
        const [results, metadata] = await db.query(`SELECT * FROM unicen.get_grupos(${id_materia}, ${id_plan_estudio}, ${id_gestion})`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener de la funcion get_grupos no pudo obtener los grupos.`})
        console.log(error)
    }
}

export const getAllGruposPracticas = async (req, res) => {
    let id_gestion = req.params.id_gestion
    let id_grupo = req.params.id_grupo
    let id_materia = req.params.id_materia
    try {
        const [results, metadata] = await db.query(`SELECT gp.id_g_practica, gp.id_personal, gp.id_grupo, gp.id_grupo_practica,
        dp.paterno, dp.materno, dp.nombres, gpmgdp.id_plan_materia_gestion_docente,
        (select count(*) from unicen.inscrip_pmgd ip where ip.id_plan_materia_gestion_docente = gpmgdp.id_plan_materia_gestion_docente)::int as inscritos,
		gp.cantidad as capacidad, 
        (select g.grupo||'.'||gp.id_grupo_practica||'.'||gp.rotacion from unicen.grupo g where g.id_grupo = gp.id_grupo) as grupo_practico
    FROM unicen.grupo_practica gp
    inner join unicen.cuenta_personal cp on cp.id_personal = gp.id_personal
    inner join unicen.datos_personal dp on dp.id_datos_personal = cp.id_datos_personal
	inner join unicen.grupo_pmgd_practica gpmgdp on gpmgdp.id_grupo = gp.id_g_practica	
	inner join unicen.plan_materia_gestion_docente pmgd on pmgd.id_plan_materia_gestion_docente = gpmgdp.id_plan_materia_gestion_docente
	inner join unicen.plan_materia pm on pm.id_plan_materia  = pmgd.id_plan_materia
    WHERE gp.id_gestion = ${id_gestion} and gp.id_grupo = ${id_grupo} and pm.id_materia = ${id_materia}`)
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener todos los grupos de practica.`})
        console.log(error)
    }
}

export const getHorariosGruposTeoricosPracticos = async (req, res) => {
    try {
        const [results, metadata] = await db.query(`select * from unicen.franja_horaria where id_tipo_usuario = 3 order by hora_inicio asc`)
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener los horarios.`})
        console.log(error)
    }   
}

export const getAsignacionGruposTeoricos = async (req, res) => {
    let id_grupo = req.params.id_grupo
    let id_gestion = req.params.id_gestion
    console.log('el id_grupo es: '+id_grupo +"    el id_gestion es: "+id_gestion)
    try {
        const [results, metadata] = await db.query(`select a.*, au.capacidad from unicen.asignacion a, unicen.aula au where a.id_aula = au.id_aula and a.id_grupo = ${id_grupo} and a.id_gestion = ${id_gestion}`)
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener la asignacion de grupos teoricos`})
        console.log(error)
    }
}

export const getHorarioTemporales = async (req, res) => {
    let id_estudiante = req.params.id_estudiante
    let id_plan_estudio = req.params.id_plan_estudio
    let id_gestion = req.params.id_gestion    
    try {
        const [results, metadata] = await db.query(`select t.*, a.nombre as bloque, a.capacidad, 
        (select g.grupo from unicen.grupo g where g.id_grupo = t.id_grupo), 
        (select g.grupo||'.'||gp.id_grupo_practica||'.'||gp.rotacion from unicen.grupo_practica gp, unicen.grupo g where gp.id_g_practica = t.id_grupo_practico and g.id_grupo = gp.id_grupo) as grupo_practico,
        (select nombre from unicen.aula where id_aula = t.id_aula) as aula
        
        from unicen.temporal t, unicen.aula a
        
        where t.id_estudiante = ${id_estudiante} and t.id_plan_estudios = ${id_plan_estudio} and t.id_gestion = ${id_gestion} and a.id_aula = t.id_aula`)
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener las inscripciones temporales`})
        console.log(error)
    }
}

export const getAsignacionGruposPracticos = async (req, res) => {
    let id_grupo = req.params.id_grupo
    try {
        console.log(id_grupo)
        const [results, metadata] = await db.query(`select ap.*, gp.cantidad from unicen.asignacion_practica ap, unicen.grupo_practica gp where gp.id_g_practica = ap.id_g_practica and ap.id_g_practica = ${id_grupo}`)
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener la asignacion de grupos teoricos`})
        console.log(error)
    }
}

export const saveInscripcionTemporal = async (req, res) => {    
    console.log('este es un mensaje antes de guardar.')
    console.log(req.body)
    let id_temporal = 0;
    let id_estudiante = req.body.id_estudiante;
    let id_materia = req.body.id_materia;
    let cod_materia = req.body.cod_materia;
    let id_plan_estudio = req.body.id_plan_estudio;
    let id_gestion = req.body.id_gestion;
    let id_grupo = req.body.id_grupo;
    let id_grupo_practico = req.body.id_grupo_practico;
    let id_franja_horaria = req.body.id_franja_horaria;
    let id_dia = req.body.id_dia;
    let id_aula = req.body.id_aula;
    let nombre = req.body.nombre;
    let color = req.body.color;
    
        try {
            const [results, metadata] = await db.query(`INSERT INTO unicen.temporal(
                id_estudiante, id_materia, cod_materia, id_plan_estudios, id_gestion, id_grupo, id_grupo_practico, id_franja_horaria, id_dia, id_aula, nombre, color)
                VALUES (${id_estudiante}, ${id_materia}, '${cod_materia}', ${id_plan_estudio}, ${id_gestion}, ${id_grupo}, ${id_grupo_practico}, ${id_franja_horaria}, ${id_dia}, ${id_aula}, '${nombre}', '${color}');`);
            res.json(results);
        } catch (error) {
            res.status(500).json({message: `Error no se ha podido guardar los datos de la tabla unicen.TEMPORAL`})
            console.log(error);
        }    
}

export const modifyGrupoPractico = async (req, res) => {
    let id_inscripcion = req.body.id_inscripcion
    let id_inscrip_pmgd = req.body.id_inscrip_pmgd
    let id_plan_materia_gestion_docente = req.body.id_plan_materia_gestion_docente
    let fecha_transaccion = req.body.fecha_transaccion
    let id_personal = req.body.id_personal
    let estado_final = req.body.estado_final
    let recursado = req.body.recursado
    let tipo_materia = req.body.tipo_materia
    
    try {
        const [results, metadata] = await db.query(`
        UPDATE unicen.inscrip_pmgd
        SET id_plan_materia_gestion_docente=${id_plan_materia_gestion_docente}, id_inscripcion=${id_inscripcion}, fecha_transaccion='${fecha_transaccion}', id_personal='${id_personal}', estado_final='${estado_final}', recursado='${recursado}', tipo_materia=${tipo_materia}
        WHERE id_inscrip_pmgd = ${id_inscrip_pmgd};
        `);
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error al modificar la tabla INSCRIP_PMGD`})
        console.log(error);
    }
}

export const deleteGrupoTeorico = async (req, res) => {
    let id_materia = req.params.id_materia
    let id_estudiante = req.params.id_estudiante
    let id_plan_estudio = req.params.id_plan_estudio
    let id_gestion = req.params.id_gestion
    console.log(id_materia, id_estudiante, id_plan_estudio, id_gestion)  
    try {
        const[results, metadata] = await db.query(`DELETE FROM unicen.temporal
        WHERE id_materia = ${id_materia} and id_grupo_practico = 0 and id_estudiante = ${id_estudiante} and id_plan_estudios = ${id_plan_estudio} and id_gestion = ${id_gestion};`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido eliminar los grupos de la tabla TEMPORAL`})
        console.log(error);
    }
}

export const deleteGrupoPractico = async (req, res) => {
    let id_materia = req.params.id_materia    
    let id_estudiante = req.params.id_estudiante
    let id_plan_estudio = req.params.id_plan_estudio
    let id_gestion = req.params.id_gestion

    try {
        const[results, metadata] = await db.query(`DELETE FROM unicen.temporal
        WHERE id_materia = ${id_materia} and id_grupo = 0 and id_estudiante = ${id_estudiante} and id_plan_estudios = ${id_plan_estudio} and id_gestion = ${id_gestion};`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido eliminar los grupos de la tabla TEMPORAL`})
        console.log(error);
    }
}

export const deleteHorarioEstudiante = async (req, res) => {
    let id_estudiante = req.params.id_estudiante
    let id_plan_estudio = req.params.id_plan_estudio
    let id_gestion = req.params.id_gestion
    console.log(id_estudiante, id_plan_estudio, id_gestion)    
    try {
        const [results, metadata] = await db.query(`DELETE FROM unicen.temporal`);
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido eliminar los datos de la tabla TEMPORAL`})
        console.log(error);
    } 
}

export const deleteGrupos = async (req, res) => {
    let id_materia = req.params.id_materia    
    
    try {
        const[results, metadata] = await db.query(`DELETE FROM unicen.temporal
        WHERE id_materia = ${id_materia}`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido eliminar los grupos de la tabla TEMPORAL`})
        console.log(error);
    }
}

export const getInscripciones = async (req, res) => {
    let id_estudiante = req.params.id_estudiante
    let id_gestion = req.params.id_gestion

    try {        
        const [results, metadata] = await db.query(`select i.*, ip.*, m.cod_materia from unicen.inscripcion i, unicen.inscrip_pmgd ip, unicen.plan_materia_gestion_docente pmgd, unicen.plan_materia pm, unicen.materia m  
        where i.id_inscripcion = ip.id_inscripcion and ip.id_plan_materia_gestion_docente = pmgd.id_plan_materia_gestion_docente and pmgd.id_plan_materia = pm.id_plan_materia and pm.id_materia = m.id_materia and i.id_estudiante = ${id_estudiante} and i.id_gestion::int = ${id_gestion}`)
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener la INSCRIPCION DEL ESTUDIANTE`})
        console.log(error)
    }
}
