import Sequelize from 'sequelize';

//base de datos newSiaSalud es de prueba
// const sequelize = new Sequelize('siasaludcbba', 'postgres', 'unicen_root', {//newSiaSalud - prueba21 - siasaludcbba
//      host: '190.104.11.190',
//      dialect: 'postgres',
//      define: {
//          freezeTableName: true,
//          schema: "unicen",
//      }
//  });

const sequelize = new Sequelize('siatorresalud', 'postgres', 'unicen_root', {//newSiaSalud - prueba21 - siasaludcbba
     host: '190.104.11.190',
     dialect: 'postgres',
     define: {
         freezeTableName: true,
         schema: "unicen",
     }
 });


//LA PAZ
// const sequelize = new Sequelize('siiaa_lp', 'sistema', 'sistema', {
//     host: '200.105.156.214',
//     dialect: 'postgres',
//     define: {
//         freezeTableName: true,
//         schema: "unicen",
//     }
// });

//la paz
// const sequelize = new Sequelize('db_lp2', 'sistema', 'sistema', {
//     host: '200.105.156.214',
//     dialect: 'postgres',
//     define: {
//         freezeTableName: true,
//         schema: "unicen",
//     }
// });

export default sequelize;