import { TipoAula } from '../../models/admAulaModel.js'

export const getTipoAula = async(req, res) => {
    try {
        const tipo = await TipoAula.findAll()
        res.json({
            data: tipo
        })        
    } catch (error) {
        console.log(error);
    }
}








