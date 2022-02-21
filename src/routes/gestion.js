import express from 'express';
import { getGestiones } from '../controllers/gestionController.js';

const router = express.Router();

  
router.get('/', getGestiones);


export default router;
 