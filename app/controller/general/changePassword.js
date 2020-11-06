const mysql = require('mysql');
const env = require('../../functions/env-var')

// change user password
exports.changeUserPassword = (request, response, next) => {
    var conn = mysql.createPool({
        connectionLimit : 100,
host: env.dataBase.host,
        user:  env.dataBase.user,
        password: env.dataBase.password,
        database: env.dataBase.database
    })
    conn.getConnection((error,connection) => {
        if (error) {
            response.status(500).json({
                error: 'Database error'
            })
           // response.status(200).json({ error: 'Database error'})
connection.destroy()
        }
        else {
            const selectCustomerQuery = `
            
            select  customer_id , 
                    mail , 
                    first_name ,
                    last_name ,
                    phone
                                                                                                                
            from customer 
        
            where  mail = '${request.body.customerEmail}'

            and password = '${request.body.customerOldPassword}'

            and customer_id = '${request.body.customerId}'
            
            `

            connection.query(selectCustomerQuery, (error, selectCustomerResult) => {
                if (selectCustomerResult[0] != null) {

                    const updateQuery = `

                    update customer set 
                                
                    password = '${request.body.customerNewPassword}'
                                
                    where customer_id = '${selectCustomerResult[0].customer_id}'
                    and mail = '${request.body.customerEmail}'
                                
                    `

                    connection.query(updateQuery, (error, updateResult) => {
                        if (error) {
                           response.status(200).json({ error: 'Database error'})
connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'Data update'
                            });
connection.destroy()

                        }

                    })

                }
                else {
                    response.status(500).json({
                        message: 'Invalid ID'
                    });
connection.destroy()

                }

                //  Id must be transform
                // const queryLog = `insert into logs values (
                //     '${request.body.customerId}',
                //     '${request.body.personId}',
                //     'update customer',
                //     '${request.body.creationDate}',
                //     'customer table',
                //     '${request.body.ipAddress}')`

                // connection.query(queryLog, (error, result) => {
                //     if (error)response.status(200).json({ error: 'Database error'})

                // })

            });

        }

    });


}


exports.changeUserPasswordById = (request, response, next) => {
    var conn = mysql.createPool({
        connectionLimit : 100,
host: env.dataBase.host,
        user:  env.dataBase.user,
        password: env.dataBase.password,
        database: env.dataBase.database
    })
    conn.getConnection((error,connection) => {
        if (error) {
            response.status(500).json({
                error: 'Database error'
            })
           // response.status(200).json({ error: 'Database error'})
connection.destroy()
        }
        else {
            const selectCustomerQuery = `
            
            select  customer_id 
                                                                                                                
            from customer 
        
            where customer_id = '${request.body.customerId}'
            
            `

            connection.query(selectCustomerQuery, (error, selectCustomerResult) => {
                if (selectCustomerResult[0] != null) {

                    const updateQuery = `

                    update customer set 
                                
                    password = '${request.body.customerNewPassword}'
                                
                    where customer_id = '${selectCustomerResult[0].customer_id}'
                                
                    `

                    connection.query(updateQuery, (error, updateResult) => {
                        if (error) {
                           response.status(200).json({ error: 'Database error'})
connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'Data update'
                            });
connection.destroy()

                        }

                    })

                }
                else {
                    response.status(500).json({
                        message: 'Invalid ID'
                    });
connection.destroy()

                }

                //  Id must be transform
                // const queryLog = `insert into logs values (
                //     '${request.body.customerId}',
                //     '${request.body.personId}',
                //     'update customer',
                //     '${request.body.creationDate}',
                //     'customer table',
                //     '${request.body.ipAddress}')`

                // connection.query(queryLog, (error, result) => {
                //     if (error)response.status(200).json({ error: 'Database error'})

                // })

            });

        }

    });


}