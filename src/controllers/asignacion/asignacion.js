import { Asignacion } from '../../models/asignacionModel.js' 
import db from '../../db/db.js';

export const getAsignacionesGrupo = async (req, res) => {
    try {
        const id_gestion =  req.params.id_gestion;
        const id_aula =  req.params.id_aula;
	const id_plan_estudio = req.params.id_plan_estudio;
                
        const [results, metadata] = await db.query(`SELECT id_asignacion, id_franja_horaria, id_dia, grupos, nombre, grupo, cod_carrera, aula FROM unicen.v_horario_materia
            WHERE id_gestion=${id_gestion} and id_aula=${id_aula} and id_plan_estudio = ${id_plan_estudio} `);

        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al cargar asignaciones`})
        console.log(error);
    }
}

export const getAsignacionVerificacion = async (req, res) => {
    try {
        const id_gestion =  req.params.id_gestion;
        const id_personal =  req.params.id_personal;
	    const id_plan_estudio = req.params.id_plan_estudio;
        const id_franja = req.params.id_franja;
        const id_dia = req.params.id_dia
                
        const [results, metadata] = await db.query(`SELECT dp.paterno, dp.materno, dp.nombres, fh.hora_inicio, fh.hora_fin, d.descripcion as dia
        FROM unicen.v_horario_materia vhm, unicen.cuenta_personal cp, unicen.datos_personal dp, unicen.franja_horaria fh, unicen.dia d
        WHERE cp.id_datos_personal = dp.id_datos_personal and cp.id_personal = vhm.id_personal and fh.id_franja_horaria = ${id_franja} and d.id_dia = ${id_dia} and vhm.id_personal = '${id_personal}' and vhm.id_gestion = ${id_gestion} and vhm.id_plan_estudio = ${id_plan_estudio} and vhm.id_franja_horaria = ${id_franja} and vhm.id_dia = ${id_dia}`);

        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al cargar asignaciones`})
        console.log(error);
    }
}

export const createAsignacion = async (req, res) => {
    const maxAsignacion = await Asignacion.max('id_asignacion');
    console.log(maxAsignacion)
    const asignacion = req.body
    try {
        let newAsignacion = await Asignacion.create({ ...asignacion, id_asignacion: maxAsignacion + 1 });
        res.status(200).json({
            message: `Asignacion was created`,
            data: newAsignacion
        });    
    } catch (error) {
        res.status(500).json({message: `Error creating...`})
        console.log(error);
    }   
}

export const deleteAsignacion = async ( req, res) => {
    const id_asignacion = req.params.id
    try {
        await Asignacion.destroy({
            where: { id_asignacion }  
        })
        res.json({message: 'Asignacion deleted...'})    
    } catch (error) {
        console.log(error);
        res.json({ message: 'Something is wrong...'})
    }
}

/* export const updateAsignacion = async(req, res) => {
    try {
        const { id } = req.params
        let updatedAsignacion = await Asignacion.update(req.body, {
            where: {
                id_asignacion: id
            }
        })
        res.status(200).json({
            message: `Asignacion was updated...`,
            data: updatedAsignacion  //req.body
        })
    } catch (error) {
        console.log(error);
    }
} */

