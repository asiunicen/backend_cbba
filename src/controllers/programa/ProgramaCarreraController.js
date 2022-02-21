import db from '../../db/db.js';

export const getProgramaCarreras = async (req, res) => {        
    try {        
        const [results, metadata] = await db.query(`select * from  unicen.programas`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar los programas de carrreras`})
        console.log(error);
    }
}

export const getCarrerasMedicina = async (req, res) => {
    try {        
        const [results, metadata] = await db.query(`select * from unicen.carrera c, unicen.plan_estudio pe where c.cod_carrera in ('FYK','MED') and pe.id_carrera = c.id_carrera and pe.id_plan_estudio in (83, 7, 103, 78) order by c.cod_carrera desc`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar los programas de carrreras`})
        console.log(error);
    }
}

export const getUltimoId = async (req, res) => {
    try {        
        const [results, metadata] = await db.query(`select id_plan_estudio from unicen.plan_estudio order by id_plan_estudio desc limit 1`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error en obtener el ultimo id_plan_estudio`});
        console.log(error);
    }
}

export const obtenerPlanesEstudios = async (req, res) => {
    try {        
        const [results, metadata] = await db.query(`select * from unicen.tipo_plan_estudio where id_tipo_plan_estudio > 0`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error en obtener los planes de estudio`});
        console.log(error);
    }
}

export const tiposPlanEstudio = async (req, res) => {
    try {        
        const id =  req.params.id_carrera;
        const [results, metadata] = await db.query(`SELECT * FROM unicen.tipo_plan_estudio where descripcion not ilike 'NINGUNO%' EXCEPT (SELECT tpe.id_tipo_plan_estudio, tpe.descripcion 
            FROM unicen.plan_estudio pe, unicen.tipo_plan_estudio tpe 
            WHERE pe.id_tipo_plan_estudio = tpe.id_tipo_plan_estudio and pe.id_carrera = ${id} and tpe.descripcion not ilike 'NINGUNO%')`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error en obtener los TIPOS DE PLANES`});
        console.log(error);
    }
}

export const modificarPlanEstudios = async ( req, res ) => {
    let id_plan_estudio = req.body.id_plan_estudio
    let id_tipo_plan_estudio = req.body.id_tipo_plan_estudio
    let id_carrera = req.body.id_carrera
    let resolucion = req.body.resolucion
    let fecha_creacion = req.body.fecha_creacion
    let semana_periodo = req.body.semana_periodo
    let total_horas_acad = req.body.total_horas_acad
    let activo = req.body.activo.toString();
    
    try {
        const [results, metadata] = await db.query(`SELECT unicen.plan_estudio_cambiar(
            '${id_plan_estudio}',         
            '${id_tipo_plan_estudio}',         
            '${id_carrera}',
            '${resolucion}',         
            '${fecha_creacion}',         
            '${semana_periodo}',
            '${total_horas_acad}',         
            '${activo}'
        )` ); 

    res.json( results ); 
    } catch (error) {
        console.log(error);
        res.json({ message: 'Something is wrong with update planificacion'})
    }
}

export const createPlanEstudio = async ( req, res) => {

    let id_plan_estudio = req.body.id_plan_estudio
    let id_tipo_plan_estudio = req.body.id_tipo_plan_estudio
    let id_carrera = req.body.id_carrera
    let resolucion = req.body.resolucion
    let fecha_creacion = req.body.fecha_creacion
    let semana_periodo = req.body.semana_periodo
    let total_horas_acad = req.body.total_horas_acad
    let activo = req.body.activo.toString();
    
    try {  
        const [results, metadata] = await db.query(`SELECT unicen.plan_estudio_adicionar(
                '${id_plan_estudio}',         
                '${id_tipo_plan_estudio}',         
                '${id_carrera}',
                '${resolucion}',         
                '${fecha_creacion}',         
                '${semana_periodo}',
                '${total_horas_acad}',         
                '${activo}'
            )` ); 

        res.json(results); 
    } catch (error) {
        res.json({message: `sorry exist somenthing problem with CREATE PLAN ESTUDIO`})
        console.log(error);
    }
}

