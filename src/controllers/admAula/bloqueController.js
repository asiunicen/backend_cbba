import { Bloque } from '../../models/admAulaModel.js'

export const getBloque = async (req, res) => {
    try {
        const bloques = await Bloque.findAll({
            attributes: ['id_bloque', 'nombre', 'ubicacion', 'descripcion'],
            order: [
                ['id_bloque', 'ASC']
            ]
        })
        res.json({
            data: bloques
        })
    } catch (error) {
        console.log(error);
    }
}

export const createBloque = async (req, res) => {
    const maxBloque = await Bloque.max('id_bloque')
    const bloque = req.body
    try {
        let newBloque = await Bloque.create({ ...bloque, id_bloque: maxBloque +1 })
        res.status(200).json({
            message: `Bloque was created`,
            data: newBloque
        })
    } catch (error) {
        res.status(500).json({ message: `Error creating...` })
        console.log(error);        
    }
}

export const updateBloque = async (req, res) => {
    try {
        const { id } = req.params
        let updatedBloque = await Bloque.update( req.body, {
            where: {
                id_aula: id
            }
        })
        res.status(200).json({
            message: `Bloque was updated...`,
            data: updatedBloque //req.body
        })
    } catch (error) {
        console.log(error);
    }
}

