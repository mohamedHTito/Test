const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();

//code c801
exports.insertPlantAgriculturalMaterials = (request, response, next) => {
    const conn = mysql.createPool({
        connectionLimit: 100,
        host: env.dataBase.host,
        user: env.dataBase.user,
        password: env.dataBase.password,
        database: env.dataBase.database
    })
    conn.getConnection((error, connection) => {
        if (error) {
            response.status(500).json({
                error: 'Database error c801'
            })
            connection.destroy()
        }
        else {
            console.log("PAM");
            for (let i = 0; i < request.agriculturalMaterialObj.amObj.length ; i++) {
                console.log(i);
                
            const insertPlant = `insert into plant_agricultural_materials values(
                '${transform.transform()}',
                '${request.agriculturalMaterialObj.amObj[i].id}',
                '${request.plantObj.id}',
                '${request.agriculturalMaterialObj.amObj[i].amount}',
                '${request.agriculturalMaterialObj.amObj[i].cost}',
                '0',
                '1'
                )`
            connection.query(insertPlant, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c801-2'
                    })
                    // connection.destroy()
                }
                else {
                    // response.status(200).json({
                    //     message: 'the plant agricultural materials is created'
                    // });
                    // connection.destroy()
                }

            })
        }
        }
    });
}