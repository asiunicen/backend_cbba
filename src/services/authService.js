//import Personal from './../models/authModel.js';
import md5 from 'md5'; //var md5 = require('md5');
import jwt from 'jsonwebtoken';
const { Personal, Estudiante } = require('./../models/authModel');
const config = require('./../config/config');

//datos de users pass en json
export const logins = async (datos) => {
    const userFound = await Personal.findOne({
        where: { 
            login: datos.login
        }, 
        raw: true
    })

    if(userFound != null){
        if (!userFound) {
            throw new Error('Usuario no encontrado');
        }
        //convertimos, obtenemos y comparamos la pass
        const dataFromLogin = md5(datos.pass); //console.log(dataFromLogin);
        const userPass = userFound.pass; //console.log(userPass);
        if(dataFromLogin != userPass){
            throw new Error('Password Incorrecto');   
        }
        console.log(userFound);
        // generation of token
        const user = {
            login: userFound.login,
            id: userFound.id_datos_personal,
            name: userFound.paterno+' '+userFound.materno+' '+userFound.nombres,
            time: new Date(),
            time_expiration: config.expirationTime
        }
        var token = jwt.sign({user}, config.secretCode, {expiresIn: config.expirationTime });
        
        //return userFound ;
        return { token, user };
    }else{
        const userEstudiante = await Estudiante.findOne({
            where: { 
                login: datos.login
            }, 
            raw: true
        })
    
        if (!userEstudiante) {
            throw new Error('Usuario no encontrado');
        }
        //convertimos, obtenemos y comparamos la pass
        const dataFromLogin = md5(datos.pass); //console.log(dataFromLogin);
        const userPass = userEstudiante.pass; //console.log(userPass);
        if(dataFromLogin != userPass){
            throw new Error('Password Incorrecto');   
        }
        console.log(userEstudiante);
        // generation of token
        const user = {
            login: userEstudiante.login,
            id: userEstudiante.id_datos_estudiante,
            name: userEstudiante.paterno+' '+userEstudiante.materno+' '+userEstudiante.nombres,
            time: new Date(),
            time_expiration: config.expirationTime
        }
        var token = jwt.sign({user}, config.secretCode, {expiresIn: config.expirationTime });
        
        //return userFound ;
        return { token, user };    
    }
    
}

//datos de users pass en json
export const loginEstudiante = async (datos) => {
    
    const userFound = await Estudiante.findOne({
        where: { 
            login: datos.login
        }, 
        raw: true
    })

    if (!userFound) {
        throw new Error('Usuario no encontrado');
    }
    //convertimos, obtenemos y comparamos la pass
    const dataFromLogin = md5(datos.pass); //console.log(dataFromLogin);
    const userPass = userFound.pass; //console.log(userPass);
    if(dataFromLogin != userPass){
        throw new Error('Password Incorrecto');   
    }
    console.log(userFound);
    // generation of token
    const user = {
        login: userFound.login,
        id: userFound.id_datos_estudiante,
        name: userFound.paterno+' '+userFound.materno+' '+userFound.nombres,
        time: new Date(),
        time_expiration: config.expirationTime
    }
    var token = jwt.sign({user}, config.secretCode, {expiresIn: config.expirationTime });
    
    //return userFound ;
    return { token, user };
}

/* module.exports = {
    logins
} */