import { Aula } from '../../models/admAulaModel.js' 
const { Op } = require("sequelize");
import db from '../../db/db.js'

//All aulas
export const getAulasAll = async (req, res) => {
    try {
        const aulas = await Aula.findAll({
            //filtrando todas las aulas validas                        
            where:{
                nombre: {
                    [Op.notLike]: '0%',
                    
                }
            },
            //  Attibutes: ['id_aula', 'id_tipo_aula', 'id_bloque', 'nombre', 'capacidad'],
            order: [
                ['id_aula', 'DESC']
            ],
            include: { all: true }
            /* order: [ ['id_aula', 'ASC']  ],
            include: [  { model: Bloque }, { model: TipoAula }  ] */
        });
        res.json({  
            data: aulas
        }) //res.json(aulas)
    } catch (error) {
        console.log(error);
    }
} 

//Aulas all hospitales
export const getAulasHospitales = async (req, res) => {
    try {
        const aulas = await Aula.findAll({
        where:{ 
            id_tipo_aula: {
                [Op.ne]: 1
            },
            capacidad: { 
                [Op.gt]: 0 
            },
	    },
            order: [
                ['nombre', 'ASC']
            ],
            include: { all: true }
        });
        res.json({
            data: aulas
        }) //res.json(aulas)
    } catch (error) {
        console.log(error);
    }
}

//Aulas distinto de hospitales
export const getAulasTeoricas = async (req, res) => {
    try {
        const aulas = await Aula.findAll({
            where: { 
                id_tipo_aula: {
                    [Op.ne]: 2
                },
                capacidad: { 
                    [Op.gt]: 0    //distinto a hospitales
                }
            },
            order: [
                ['nombre', 'ASC']
            ],
            include: { all: true }
        });
        res.json({  
            data: aulas
        }) //res.json(aulas)
    } catch (error) {
        console.log(error);
    }
} 

//Obteniendo todas las aulas teoricas que perteneces a un docente
export const getVistaAulasTeoricas = async (req, res) => {
    try {
        const id_gestion =  req.params.id_gestion;
        const cod_materia =  req.params.cod_materia;
        
        const [results, metadata] = await db.query(`SELECT distinct a.*, b.id_bloque, b.nombre as nombre_bloque, hm.grupos FROM unicen.v_horario_materia hm, unicen.aula a, unicen.bloque b
        WHERE hm.id_gestion=${id_gestion} and hm.id_aula = a.id_aula and hm.cod_materia = '${cod_materia}' and a.id_bloque = b.id_bloque`);

        res.json({data: results});
    } catch (error) {
        res.json({message: `Error al obtener las aulas de una materia`})
        console.log(error);
    }
}

export const createAula = async (req, res) => {
    const maxAula = await Aula.max('id_aula');
    const aula = req.body
    try {
        let newAula = await Aula.create({ ...aula, id_aula: maxAula + 1 });
        res.status(200).json({
            message: `Aula was created`,
            data: newAula
        });    
    } catch (error) {
        res.status(500).json({message: `Error creating...`})
        console.log(error);
    }   
}

export const updateAula = async(req, res) => {
    try {
        const { id } = req.params
        let updatedAula = await Aula.update(req.body, {
            where: {
                id_aula: id
            }
        })
        res.status(200).json({
            message: `Aula was updated...`,
            data: updatedAula  //req.body
        })
    } catch (error) {
        console.log(error);
    }
}

