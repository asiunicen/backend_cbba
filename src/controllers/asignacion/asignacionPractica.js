import { AsignacionPractica } from '../../models/planificacionPracticaModel.js' 
import db from '../../db/db.js';

export const getAsignacionesGrupoPractica = async (req, res) => {
    try {
        //const id_gestion =  req.params.id_gestion;
        const id_aula =  req.params.id_aula;
        const id_gestion = req.params.id_gestion
        const id_materia = req.params.id_materia
        
        const [results, metadata] = await db.query(`select * from unicen.get_grupo_horario_practica(${id_gestion})
                    WHERE id_aula=${id_aula}`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al cargar horarios practica`})
        console.log(error);
    }
} 

export const getAsignacionVerificacionPractica = async (req, res) => {
    try {
        const id_gestion =  req.params.id_gestion;
        const id_personal =  req.params.id_personal;	    
        const id_franja = req.params.id_franja;
        const id_dia = req.params.id_dia
                
        const [results, metadata] = await db.query(`SELECT DISTINCT dp.paterno, dp.materno, dp.nombres, fh.hora_inicio, fh.hora_fin, d.descripcion as dia 
        FROM unicen.get_grupo_horario_practica(${id_gestion}) ghp, unicen.cuenta_personal cp, unicen.datos_personal dp, unicen.franja_horaria fh, unicen.dia d
        WHERE cp.id_datos_personal = dp.id_datos_personal and cp.id_personal = ghp.id_personal and ghp.id_personal='${id_personal}' and fh.id_franja_horaria = ghp.id_franja_horaria and d.id_dia = ghp.id_dia and fh.id_franja_horaria = ${id_franja} and d.id_dia = ${id_dia}`);

        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al cargar asignaciones`})
        console.log(error);
    }
}

export const createAsignacionPractica = async (req, res) => {
    //const maxAsignacion = await Asignacion.max('id_asignacion');
    const asignacionPrac = req.body
    console.log(req.body);
    try {
        let newAsignacion = await AsignacionPractica.create({ ...asignacionPrac });
        res.status(200).json({
            message: `Asignacion Practica was created`,
            data: newAsignacion
        });
    } catch (error) {
        res.status(500).json({message: `Error creating...`})
        console.log(error);
    }
}


//Delete asignacion_practica
export const deleteAsignacionPractica = async ( req, res) => {
    const id_asignacion_practica = req.params.id
    try {
        await AsignacionPractica.destroy({
            where: { id_asignacion_practica }  
        })
        res.json({message: 'Asignacion Practica deleted...'})    
    } catch (error) {
        console.log(error);
        res.json({ message: 'Something is wrong...'})
    }
}

export const getHorarioDocentePractica = async (req, res) => {
    try {
        const id_gestion =  req.params.id_gestion;
        const id_personal =  req.params.id_personal;
        
        const [results, metadata] = await db.query(`select * from unicen.get_grupo_horario_practica(${id_gestion}) WHERE id_personal = '${id_personal}'`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al cargar los horarios de practica`})
        console.log(error);
    }
} 


/* export const updateAsignacionPractica = async(req, res) => {
    try {
        const { id } = req.params
        let updatedAsignacion = await AsignacionPractica.update(req.body, {
            where: {
                id_asignacion_practica: id
            }
        })
        res.status(200).json({
            message: `Asignacion practica was updated...`,
            data: updatedAsignacion  //req.body
        })
    } catch (error) {
        console.log(error);
    }
} */

