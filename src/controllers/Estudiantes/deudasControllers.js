import db from '../../db/db.js';

//las deudas del estudiante por gestion
export const getDeudasEstudiantesGestion = async (req, res) => {
    let id_estudiante = req.params.id_estudiante;    
    let id_gestion = req.params.id_gestion
    try {
        const [results, metadata] = await db.query(`SELECT dc.id_gestion, g.descripcion, dc.monto_deuda, dc.id_item_seguimiento 
        FROM unicen.deudas_contable dc, unicen.gestion g, unicen.inscripcion i
        WHERE dc.id_estudiante=${id_estudiante}
        AND dc.id_gestion=g.id_gestion::int
        AND i.id_estudiante=dc.id_estudiante
        AND dc.id_gestion=i.id_gestion::int
        AND i.estado=1 and dc.monto_deuda > 0 and dc.id_gestion<${id_gestion}`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener las deudas del estudiantes.`})
        console.log(error)
    }
}
export const getDocumentosPendientesEstudiante = async (req, res) => {
    let id_estudiante = req.params.id_estudiante;        
    try {
        const [results, metadata] = await db.query(`select d.id_documento, d.descripcion, c.fecha_plazo
        from unicen.compromiso c, unicen.documento d
        where c.id_estudiante=${id_estudiante} and c.estado='P' and c.id_documento=d.id_documento and c.fecha_plazo<CURRENT_DATE`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener las deudas del estudiantes.`})
        console.log(error)
    }
}

export const getPlanEconomicoVencido = async (req, res) => {
    let id_estudiante = req.params.id_estudiante;        
    try {
        const [results, metadata] = await db.query(`select pe.id_plan_economico, pe.detalle, pe.monto_matricula
        from unicen.estudiante_plan_economico epe, unicen.plan_economico pe 
        where epe.id_estudiante=${id_estudiante} and epe.id_plan_economico=pe.id_plan_economico and epe.activo=1 order by epe.fecha desc limit 1`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener las deudas del estudiantes.`})
        console.log(error)
    }
}

export const getPlanVencidoEstudiante = async (req, res) => {
    let id_estudiante = req.params.id_estudiante
    let id_gestion = req.params.id_gestion
    try {
        const [results, metadata] = await db.query(`SELECT count(*)::int as cant
        FROM  unicen.plan_economico_vigencia
        WHERE id_estudiante=${id_estudiante} and id_gestion_inicio<=${id_gestion} and id_gestion_final>=${id_gestion}`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener las deudas del estudiantes.`})
        console.log(error)
    }
}
export const saveDeuda = async (req, res) => {
    console.log(req.body);    
    let id_estudiante = req.body.id_estudiante;    
    let id_gestion = req.body.id_gestion;
    console.log(id_estudiante, id_gestion)
    try {
        const [results, metadata] = await db.query(`select unicen.put_deuda_new(${id_estudiante}, ${id_gestion})`);
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido guardar la deuda generada para en la inscripcion del estudiante`})
        console.log(error);
    }
}
export const updateDeuda = async (req, res) => {
    console.log(req.body);    
    let id_estudiante = req.params.id_estudiante
    let id_gestion = req.params.id_gestion
    let cantidad = req.params.cantidad
    console.log(id_estudiante, id_gestion)
    try {
        const [results, metadata] = await db.query(`select unicen.reverse_deuda_new(${id_estudiante}, ${id_gestion}, ${cantidad})`);
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error no se ha podido actualizar la deuda del estudiante`})
        console.log(error);
    }
}
