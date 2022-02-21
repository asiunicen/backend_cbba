import db from '../db/db.js';
import { logins, loginEstudiante } from './../services/authService';  // call only function
//const authService = require('./../services/authService');  //Normal way

export const singIn = async (req, res) => {
    //res.send('starting...');
    try {
        //let data = await authService.logins(rep.body);  //Nomal way call class.function 
        let data = await logins(req.body);  //ES6 way call function only 
        res.send({
            success: true,
            data: { data }  
        });
        
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
        //console.log(error);
    }    
}
export const singEstudiante = async (req, res) => {
    //res.send('starting...');
    console.log(req.body)
    try {
        // let data = await authService.loginEstudiante(rep.body);  //Nomal way call class.function 
        let data = await loginEstudiante(req.body);  //ES6 way call function only 
        res.send({
            success: true,
            data: { data }  
        });
        
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
        //console.log(error);
    }
}
export const getTipoPersonal = async (req, res) => {
    try {        
        let id_datos_personal = req.params.id_datos_personal
        const [results, metadata] = await db.query(`SELECT tu.descripcion 
        FROM unicen.cuenta_personal cp, unicen.personal p, unicen.tipo_usuario tu 
        WHERE cp.id_personal = p.id_personal and p.id_tipo_usuario = tu.id_tipo_usuario and cp.id_datos_personal = ${id_datos_personal}`);
        res.json(results);
    } catch (error) {
        res.json({message: `Error al obtener el tipo de personal`})
        console.log(error);
    }
}