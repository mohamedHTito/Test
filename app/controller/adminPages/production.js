const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();


//code c1101
exports.insertProduction = (request, response, next) => {
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
                error: 'Database error c1101'
            })
            connection.destroy()
        }
        else {
            const insertProduction = `insert into production values(
                '${transform.transform()}',
                '${request.body.plantId}',
                '${request.body.amount}',
                '${request.body.sellingPrice}',
                '${dte}',
                '',
                '0',
                '1',
                '',
                ''
                )`
            connection.query(insertProduction, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c1101-2'
                    })
                    connection.destroy()
                }
                else {

                    const updateQuery = `update plant set 
                    plant.status='produced'                 
                    where id='${request.body.plantId}' `

                    connection.query(updateQuery, (error, result) => {
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c126-2'
                            })
                            connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'the production is created'
                            });
                            connection.destroy()
                        }

                    })

                    
                }

            })

        }
    });
}
