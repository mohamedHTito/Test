const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')

//code 1001
exports.insertPlantAcre = (request, response, next) => {
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
                error: 'Database error c1001'
            })
            connection.destroy()
        }
        else {
            console.log("PlantAcre");                
            const insertPlantAcre = `insert into plant_acre values(
                '${transform.transform()}',
                '${request.plantObj.acreId}',
                '${request.plantObj.id}',
                '0',
                '1'
                )`
            connection.query(insertPlantAcre, (error, result) => {
                if (error) {
                    // response.status(200).json({
                    //     error: 'Server error c1001-2'
                    // })
                }
                else {
                    // response.status(200).json({
                    //     message: 'the plant worker is created'
                    // });
                }

            })
        }
    });
}