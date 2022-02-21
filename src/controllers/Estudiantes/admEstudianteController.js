import { Perfil_Trabajo } from '../../models/admPerfilModel'
import db from '../../db/db.js';

//All estudiantes egresados
export const getAllMateriasOfertadas = async (req, res) => {
    let id_estudiante = req.params.id_estudiante;
    let id_plan_estudio = req.params.id_plan_estudio;
    let id_gestion = req.params.id_gestion
    try {
        const [results, metadata] = await db.query(`SELECT * FROM unicen.get_materias(${id_estudiante}, ${id_plan_estudio}, ${id_gestion})`);
        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener de la funcion get_materias las materias ofertadas.`})
        console.log(error)
    }
}

export const getAllEstudiantesEgresados = async (req, res) => {
    try {
        const id_gestion =  req.params.id_gestion;
        const id_aula =  req.params.id_aula;
        
        const [results, metadata] = await db.query(`select
        e.id_estudiante,
        de.id_datos_estudiante,
        pe.id_plan_estudio,
        de.nombres,
        de.paterno,
        de.materno,
        c.nombre as carrera,
        e.matricula,
        pt.nombre as perfil,
        pt.id_perfil_trabajo
        from unicen.inscripcion i,
         unicen.inscrip_pmgd ipmgd,
         unicen.plan_materia_gestion_docente pmgd,
         unicen.plan_materia pm,
         unicen.materia m,
         unicen.datos_estudiante de,unicen.estudiante e,
         unicen.estudiante_plan_estudio epe,unicen.plan_estudio pe,
         unicen.carrera c,
         unicen.perfil_trabajo pt
         where de.paterno ilike '%%' and de.materno ilike '%%' and de.nombres ilike '%%'
          and   de.id_datos_estudiante=e.id_datos_estudiante and
              epe.id_estudiante=e.id_estudiante
              and epe.activo::int=1 and
              i.id_estudiante=e.id_estudiante and
              i.id_inscripcion = ipmgd.id_inscripcion
              and epe.id_plan_estudio=pe.id_plan_estudio
              and pe.id_carrera=c.id_carrera and
              ipmgd.id_plan_materia_gestion_docente =
              pmgd.id_plan_materia_gestion_docente and
              pmgd.id_plan_materia = pm.id_plan_materia and
              pm.id_materia = m.id_materia and
              pt.id_estudiante = e.id_estudiante
              group by de.nombres,
                                de.paterno,
                                de.materno,
                                e.id_estudiante,
                                de.id_datos_estudiante,
                                c.nombre,
                                pe.id_plan_estudio,
                                e.matricula,
                                pt.id_perfil_trabajo
								order by de.paterno, de.materno, de.nombres
        `);

        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al cargar asignaciones`})
        console.log(error);
    }
} 

export const getGestiones = async (req, res) => {
    let limit = req.params.limit
    try {
        const [results, metadata] = await db.query(`select id_gestion, replace(descripcion, '/', '-') as descripcion, fecha_inicio, fecha_fin from unicen.gestion where descripcion not ilike 'V%' order by id_gestion desc limit ${limit}`);
        res.json({data: results})
    } catch (error) {
        res.json({message: `Error al obtener las gestiones.`})
        console.log(error)
    }
}

export const crearPerfilEstudiante = async (req, res) => {
    const maxPerfilTrabajo = await Perfil_Trabajo.max('id_perfil_trabajo') + 1;    
    let id_perfil_trabajo = maxPerfilTrabajo;
    let id_estudiante = req.body.id_estudiante;
    let perfil = req.body.perfil;
    let fecha = req.body.fecha;
    let id_plan_estudio = req.body.id_plan_estudio;
    let detalle = "";
    let id_sub_campo_trabajo = req.body.id_sub_campo_trabajo;
    try {
        const [results, metadata] = await db.query(`SELECT unicen.perfil_trabajo_adicionar(
        '${id_perfil_trabajo}',
        '${id_estudiante}',
        '${perfil}',
        '${fecha}',
        '${id_plan_estudio}',
        '${detalle}',
        '${id_sub_campo_trabajo}'
        )` );
        res.json(results);
    } catch (error) {
        res.status(500).json({message: `Error to create perfil estudiante`})
        console.log(error);
    }    
}

export const getEstudidantes = async (req, res) => {
    try {
        let id_gestion = req.params.id_gestion
        const [results, metadata] = await db.query(`select * from unicen.estudiantesgestion(${id_gestion})`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener todos los estudiantes'})
        console.log(error)
    }
}

export const getFindEstudiantes = async (req, res) => {
    try {
        let filtro = req.params.filtro
        let id_gestion = req.params.id_gestion
        console.log(filtro)
        const [results, metadata] = await db.query(`SELECT * FROM unicen.estudiantes(${id_gestion}, '${filtro}')`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener todos los estudiantes'})
        console.log(error)
    }
}
/*export const getTodasCarreras = async (req, res) => {    
    try {
        const carreras = await Carrera.findAll({            
            //  Attibutes: ['id_aula', 'id_tipo_aula', 'id_bloque', 'nombre', 'capacidad'],
            order: [
                ['nombre', 'ASC']
            ],
            include: { all: true }
        });
        res.json({  
            data: carreras
        }) //res.json(carreras)
    } catch (error) {
        console.log(error);
    }
    try {
		const [results, metadata] = await db.query("select distinct * from unicen.carrera");		
        res.json({data: results});
	} catch(err) {
	    res.json({mensaje:"Error al cargar las carreras"});
	}
}*/

//All estudiantes
/*export const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({            
            //  Attibutes: ['id_aula', 'id_tipo_aula', 'id_bloque', 'nombre', 'capacidad'],
            order: [
                ['nombres', 'ASC']
            ],
            include: { all: true }
             order: [ ['id_aula', 'ASC']  ],
            include: [  { model: Bloque }, { model: TipoAula }  ] 
        });
        res.json({  
            data: estudiantes
        }) //res.json(estudiantes)
    } catch (error) {
        console.log(error);
    }
}*/