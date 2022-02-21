import express from 'express'
import { getUltimoId } from '../../controllers/programa/ProgramaCarreraController'
let router = express.Router();

router.get('/', getUltimoId);

export default router