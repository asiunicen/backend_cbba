import { Area } from '../../models/admAreaModel.js' 
import { Campo } from '../../models/admAreaModel.js' 
import db from '../../db/db.js';

export const getAreasTrabajo = async (req, res) => {    
    try {
        const areas = await Area.findAll({            
            //  Attibutes: ['id_aula', 'id_tipo_aula', 'id_bloque', 'nombre', 'capacidad'],
            order: [
                ['detalle', 'ASC']
            ],
            include: { all: true }
        });
        res.json({  
            data: areas
        }) //res.json(carreras)
    } catch (error) {
        console.log(error);
    }
    /*try {
		const [results, metadata] = await db.query("SELECT * FROM unicen.area_trabajo order by detalle");		
        res.json({data: results});
	} catch(err) {
	    res.json({mensaje:"Error al cargar las areas"});
	}*/
}

export const getCamposTrabajo = async (req, res) => {        
    try {
        const id_area_trabajo =  req.params.id_area_trabajo;
        console.log(req.params);
		const [results, metadata] = await db.query(`SELECT ct.id_campo_trabajo, ct.id_area_trabajo, ct.detalle 
        FROM unicen.area_trabajo art inner join unicen.campo_trabajo ct on art.id_area_trabajo = ct.id_area_trabajo
        where ct.id_area_trabajo = ${id_area_trabajo}`);		
        res.json({data: results});
	} catch(err) {
	    res.json({mensaje:"Error al cargar los campos"});
	}
}

export const getSubCamposTrabajo = async (req, res) => {        
    try {
        const id_campo_trabajo =  req.params.id_campo_trabajo;
        console.log(req.body);
		const [results, metadata] = await db.query(`SELECT * FROM unicen.sub_campo_trabajo where id_campo_trabajo = ${id_campo_trabajo}`);		
        res.json({data: results});
	} catch(err) {
	    res.json({mensaje:"Error al cargar los sub campos"});
	}
}

export const crearNuevaAreaTrabajo = async (req, res) => {
    const maxArea = await Area.max('id_area_trabajo') + 1;
    const area = req.body;
    try {
        let nuevaArea = await Area.create({ 
            id_area_trabajo: maxArea, 
            detalle: area.detalle,
            cod_aux: area.cod_aux});
        res.status(200).json({
            message: `Area was created`,
            data: nuevaArea
        });    
    } catch (error) {
        res.status(500).json({message: `Error creating...`})
        console.log(error);
    }
}