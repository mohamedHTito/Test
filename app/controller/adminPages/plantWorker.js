const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();

//code c801
exports.insertPlantWorker = (request, response, next) => {
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
            console.log("Worker");
            for (let i = 0; i < request.workerObj.workerObj.length; i++) {
                console.log(i);
                
            const insertPlant = `insert into plant_worker values(
                '${transform.transform()}',
                '${request.workerObj.workerObj[i].worker_id}',
                '${request.plantObj.id}',
                '0',
                '1'
                )`
            connection.query(insertPlant, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c801-2'
                    })
                }
                else {
                    // response.status(200).json({
                    //     message: 'the plant worker is created'
                    // });
                }

            })
        }
        }
    });
}