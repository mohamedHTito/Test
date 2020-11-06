
const mysql = require('mysql');
const env = require('../../functions/env-var')

//code c901
exports.userlogin = (request, response, next) => {
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
                error: 'Database error c901'
            })
            connection.destroy()
        }
        else {
            const login = `select  user.email , user.password 
            from user

            where user.email = '${request.body.email}'  
            and   user.password = '${request.body.password}'
            `
            connection.query(login, (error, result) => {
                if (error) {
                    response.status(101).json({
                        error: 'Query error'
                    })
                    connection.destroy()
                }
                else if (result[0] == null) {
                    response.status(200).json({
                        message: 'email or password not valid,try again!!'
                    });
                    connection.destroy()

                }
                else {
                    response.status(200).json({
                        message: 'logged successfully'
                    });
                    connection.destroy()

                
                }

            })


        }



    });

}