import { GrupoPractica, AsignacionPractica } from '../../models/planificacionPracticaModel.js'
import db from '../../db/db.js'

export const getGruposPractica = async (req ,res) => {  //All
    try {
        const [results, metadata] = await db.query(`
                SELECT gp.*, dp.paterno, dp.materno, dp.nombres 
                FROM unicen.grupo_practica gp, unicen.datos_personal dp, unicen.cuenta_personal cp
                WHERE gp.id_personal=cp.id_personal
                AND cp.id_datos_personal=dp.id_datos_personal
                    AND gp.id_gestion in ( SELECT CAST (id_gestion AS INTEGER) from unicen.gestion 
                            WHERE fecha_inicio<=current_date and fecha_fin>=current_date)`
        );

        res.json({data: results });
    } catch (error) {
        res.json({message: `Error loading grupos practica`});
        console.log(error);
    }
}


export const getGruposPracticaById = async (req ,res) => {  //grupos practica by id
    try {
        const id =  req.params.id;
        const id_gestion = req.params.id_gestion
        const [results, metadata] = await db.query(`
        SELECT gp.*, dp.paterno, dp.materno, dp.nombres
        FROM unicen.grupo_practica gp, unicen.datos_personal dp, unicen.cuenta_personal cp
        WHERE gp.id_personal=cp.id_personal
            AND cp.id_datos_personal=dp.id_datos_personal
            AND gp.id_gestion in (${id_gestion})
            AND gp.id_grupo=${id} ORDER BY gp.id_grupo_practica, gp.rotacion ASC`
        );

        res.json({data: results });
    } catch (error) {
        res.json({message: `Error loading grupos practica by id`});
        console.log(error);
    }
}


export const createGrupoPractica = async (req, res) => {
    const grupoPractica = req.body
    const [results, metadata] = await db.query(`SELECT * FROM unicen.gestion
            WHERE fecha_inicio<=current_date and fecha_fin>=current_date and descripcion not ilike 'V%'`)
    
    const fecha_inicio = results.map(e => e.fecha_inicio )
    const fecha_fin = results.map(e => e.fecha_fin )     
    
    try {
                
        let id_grupo = req.body.id_grupo
        let id_grupo_practica = req.body.id_grupo_practica
        let id_gestion = req.body.id_gestion
        let cantidad = req.body.cantidad
        let id_personal = req.body.id_personal
        let rotacion = req.body.rotacion
        let f_inicio_rotacion = req.body.f_inicio_rotacion
        let f_fin_rotacion = req.body.f_fin_rotacion 
        let id_tipo_modalidad = req.body.id_tipo_modalidad
        let grupo = req.body.grupo
        let id_turno = req.body.id_turno       
        let id_tipo_materia = req.body.id_tipo_materia
        let id_materia = req.body.id_materia
        let id_plan_estudio = req.body.id_plan_estudio

        const [results, metadata] = await db.query(`SELECT unicen.planificacion_insertar_practica(            
            ${id_grupo},
            ${id_plan_estudio},
            ${id_materia},
            ${id_gestion},
            ${id_tipo_modalidad},
            '${id_personal}',
            ${grupo},
            ${cantidad},            
            ${id_turno},
            ${id_tipo_materia}, 
            '${rotacion}',         
            '${f_inicio_rotacion}',         
            '${f_fin_rotacion}',
            '${fecha_inicio}',
            '${fecha_fin}'
        )`)
        res.json({data: results });
    } catch (error) {
        res.json({message: `Error al guardar el plan de grupo practica`})
        console.log(error);
    }
}

export const updateDocentePractica = async(req, res) => {
    try {
        const id_g_practica  = req.params.id
        let updatedAsignacionDocente = await GrupoPractica.update(req.body, {
            where: {
                id_g_practica
            }
        })

        res.status(200).json({
            message: `Docente practica was updated...`,
            data: updatedAsignacionDocente 
        })
    } catch (error) {
        console.log(error);
        res.json({ message:'Something is wrong...'})
    }
}


//Delete grupo_practica y aulas asociadas a este
export const deleteGrupoPractica = async ( req, res) => {
    const id_g_practica = req.params.id
    try {
        await GrupoPractica.destroy({
            where: { id_g_practica }  
        })
        await AsignacionPractica.destroy({
            where: { id_g_practica }
        })
        
        res.json({message: 'Grupo Practica deleted....'})    
    } catch (error) {
        console.log(error);
        res.json({ message: 'Something is wrong...'})
    }
}
