const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();
const plantWorker = require('./plantWorker')
const planetAgCulMatWorker = require('./planetAgCulMat')
const planetAcre = require('./plantAcre')

//code c601
exports.selectAll = (request, response, next) => {
    var conn = mysql.createPool({
        connectionLimit: 100,
        host: env.dataBase.host,
        user: env.dataBase.user,
        password: env.dataBase.password,
        database: env.dataBase.database
    })
    conn.getConnection((error, connection) => {
        if (error) {
            response.status(500).json({
                error: 'Database error c601'
            })
            connection.destroy()
        }
        else {
            const query = `SELECT plant.id , plant.name , plant.start_date,
            plant.end_date
            FROM plant
            where 
            (plant.is_deleted ='0'
            and 
            plant.is_active ='1' )
            `
            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c601'
                    })
                    connection.destroy()
                }
                else {
                    response.status(200).json(result);
                    connection.destroy()
                }

            });


        }



    });

}

//code 602
exports.selectAllEnd = (request, response, next) => {
    var conn = mysql.createPool({
        connectionLimit: 100,
        host: env.dataBase.host,
        user: env.dataBase.user,
        password: env.dataBase.password,
        database: env.dataBase.database
    })
    conn.getConnection((error, connection) => {
        if (error) {
            response.status(500).json({
                error: 'Database error c602'
            })
            connection.destroy()
        }
        else {
            const query = `SELECT plant.id , plant.name , plant.start_date,
            plant.end_date
            FROM plant
            where 
            (plant.is_deleted ='0'
            and 
            plant.is_active ='1' )
            and
            plant.status = 'end'
            `
            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c602'
                    })
                    connection.destroy()
                }
                else {
                    response.status(200).json(result);
                    connection.destroy()
                }

            });


        }



    });

}


//code c125
exports.insertPlant = (request, response, next) => {
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
                error: 'Database error c125'
            })
            connection.destroy()
        }
        else {
            request.body.plantObj.id = transform.transform()
            const insertPlant = `insert into plant values(
                '${request.body.plantObj.id}',
                '${request.body.plantObj.name}',
                '${request.body.plantObj.startDate}',
                '${request.body.plantObj.endDate}',
                'new',
                '${dte}',
                '',
                '0',
                '1',
                '',
                ''
                )`
            connection.query(insertPlant, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c125-2'
                    })
                    connection.destroy()
                }
                else {
                    connection.destroy()
                    planetAcre.insertPlantAcre(request.body);
                    connection.destroy()
                    planetAgCulMatWorker.insertPlantAgriculturalMaterials(request.body);
                    connection.destroy()
                    plantWorker.insertPlantWorker(request.body);
                    connection.destroy()
                    response.status(200).json({
                        message: 'the plant is created'
                    });
                }

            })

        }
    });
}
