import db from '../../db/db.js';

export const getDetallePlanificacion = async (req, res) => {
    try {
        const id_gestion = req.params.id_gestion
        const [results, metadata] = await db.query(`unicen.get_grupo_materia_gestion(${id_gestion})`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar grupo_materia_gestion`})
        console.log(error);
    }
}

export const getDetallePlanificacionById = async (req, res) => {
    try {
        const id_materia =  req.params.id;
        const id_gestion = req.params.id_gestion;
        const [results, metadata] = await db.query(`select * from unicen.get_grupo_materia_gestion(${id_materia}, ${id_gestion})`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar grupo_materia_gestion by id`})
        console.log(error);
    }
}

export const createPlanificacion = async (req, res) => {
    let id_plan_estudio = req.body.id_plan_estudio         
    let id_materia = req.body.id_materia              
    let id_gestion = req.body.id_gestion              
    let id_tipo_modalidad = req.body.id_tipo_modalidad      
    let id_personal = req.body.id_personal
    let grupo = req.body.grupo
    let num_estudiantes = req.body.num_estudiantes              
    let id_confirmante = req.body.id_confirmante
    let id_turno = req.body.id_turno                
    let id_tipo_materia = req.body.id_tipo_materia
    
    try {  
        const [results, metadata] = await db.query(`SELECT unicen.planificacion_insertar(
                '${id_plan_estudio}',         
                '${id_materia}',         
                '${id_gestion}',         
                '${id_tipo_modalidad}',         
                '${id_personal}',         
                '${grupo}',         
                '${num_estudiantes}',         
                '${id_confirmante}',         
                '${id_turno}',         
                '${id_tipo_materia}'         
            )` ); 

        res.json(results); 
    } catch (error) {
        res.json({message: `Something is wrong with planificacion`})
        console.log(error);
    }
} 

export const updatePlanificacion = async (req, res) => {
    let id_plan_estudio = req.body.id_plan_estudio
    let id_grupo = req.body.id_grupo
    let id_personal = req.body.id_personal
    let id_gestion = req.body.id_gestion
    let fecha_inicio = req.body.fecha_inicio
    let fecha_fin = req.body.fecha_fin
    let id_turno = req.body.id_turno
    console.log(req.body.id_plan_estudio);
    try {
        const [results, metadata] = await db.query(`SELECT unicen.planificacion_modificar(
            '${id_plan_estudio}',         
            '${id_grupo}',   
            '${id_personal}',                  
            '${id_gestion}',
            '${fecha_inicio}',
            '${fecha_fin}',
            '${id_turno}'
        )` ); 

    res.json( results ); 
    } catch (error) {
        console.log(error);
        res.json({ message: 'Something is wrong with update planificacion'})
    }
}

/* Prueba 
    export const createTipo = async (req, res) => {
    var id_tipo_aula = req.body.id_tipo_aula;
    var descripcion = req.body.descripcion;
    try {
        const [results, metadata] = await db.query(`INSERT INTO unicen.tipo_aula (id_tipo_aula, descripcion) VALUES('${id_tipo_aula}', '${descripcion}')`);
        res.json(results);
        console.log(results);
    } catch (error) {
        res.json({message: `Error al crear`});
        console.log(error);
    }
} */
