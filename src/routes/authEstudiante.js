import express from 'express';
import { singEstudiante }  from '../controllers/authController.js';

const router = express.Router();

/* router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Content-type: application/json; charset=utf-8");
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
  }); */


//router.get('/', singIn)
router.post('/', singEstudiante)
// router.get('/:id_datos_personal', getTipoPersonal)

export default router;