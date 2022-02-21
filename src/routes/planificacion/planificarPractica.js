import express from 'express';
import { getGruposPractica, getGruposPracticaById, createGrupoPractica, deleteGrupoPractica, updateDocentePractica } from '../../controllers/planificacion/planificacionPracticaController.js';


let router = express.Router(); 

router.get('/', getGruposPractica);
router.get('/:id/:id_gestion', getGruposPracticaById);
router.post('/', createGrupoPractica);
router.delete('/:id', deleteGrupoPractica);
router.put('/:id', updateDocentePractica)

export default router; 


