const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')

//code c121
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
                error: 'Database error c121'
            })
            connection.destroy()
        }
        else {
            const query = `SELECT acre.id , acre.code
            FROM acre
            where 
            (acre.is_deleted ='0'
            and 
            acre.is_active ='1' )
            `
            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c121'
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


exports.selectAllDeleted = (request, response, next) => {
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
                error: 'Database error c121'
            })
            connection.destroy()
        }
        else {
            const query = `SELECT acre.id , acre.code 
            FROM acre
            where 
            acre.is_deleted ='1'
            and 
            acre.is_active ='0'
            `
            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c121'
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

exports.insertAcre = (request, response, next) => {
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


            const selectAcreCode = `
            SELECT acre.id , 
            acre.code
            FROM acre
            where 
            acre.code='${request.body.code}' `

            connection.query(selectAcreCode, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c125'
                    })
                    connection.destroy()
                }
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the Acre Code is exist, try again'
                    });
                    connection.destroy()
                }
                else {
                    console.log("3");
                    const insertAcreCode = `insert into acre values(
                        '${transform.transform()}',
                        '${request.body.code}',
                        '${request.body.creationdate}',
                        '${request.body.personid}',
                        '${request.body.ipaddress}',
                        '0',
                        '1',                                            
                        '',  
                        ''                     
                        )`
                    connection.query(insertAcreCode, (error, result) => {
                        console.log("4");
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c125-2'
                            })
                            connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'the acre code is created'
                            });
                            connection.destroy()
                        }

                    })


                }
            })

        }
    });
}




//code c126
exports.updateAcre = (request, response, next) => {
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
                error: 'Database error c126'
            })
            connection.destroy()
        }
        else {
            const selectAcreCode = `SELECT acre.id , acre.code
            FROM acre
            where 
            acre.code='${request.body.updateCode}' 
            `

            connection.query(selectAcreCode, (error, result) => {
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the acre code is exist, try again'

                    });
                    connection.destroy()
                }
                else {

                    ////////////////////////////////////////////////////////
                    const query = `SELECT acre.code from acre where acre.id = '${request.body.id}' `
                    connection.query(query, (error, result) => {
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c126'
                            })
                            connection.destroy()
                        }
                        else {

                            if (result[0] != null) {

                                const updateQuery = `update acre set 
                                code='${request.body.updateCode}',
                                last_updated_date ='${request.body.creationdate}',
                                last_person_updated ='${request.body.personid}',
                                ip_address='${request.body.ipaddress}'                    
                                where id='${request.body.id}' `

                                connection.query(updateQuery, (error, result) => {
                                    if (error) {
                                        response.status(200).json({
                                            error: 'Server error c126-2'
                                        })
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
                                    message: 'Invaliud ID'
                                });
                                connection.destroy()
                            }
                        }
                    })
                }
            });

        }


    });
}


//code  c127
exports.deleteAcre = (request, response, next) => {
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
                error: 'Database error c127'
            })
            connection.destroy()
        }
        else {

            const query = `select code from acre 
            where id = '${request.body.id}'`
            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c127'
                    })
                    connection.destroy()
                }
                else {
                    if (result[0] != null) {
                        const updateAcre = `update acre set 
                         is_deleted = '1',
                         is_active = '0'
                         where id ='${request.body.id}'`

                        connection.query(updateAcre, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c127-2'
                                })
                                connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the acre is deleted'
                                });

                                connection.destroy()
                            }

                        })



                    }
                    else {
                        response.status(500).json({
                            message: 'Invaliud ID'
                        });
                        connection.destroy()
                    }
                }
            })


        }


    });
}

//code c129
exports.restoreAcre = (request, response, next) => {
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
                error: 'Database error c129'
            })
            connection.destroy()
        }
        else {

            const query = `select code from acre where id = '${request.body.id}'`

            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c129'
                    })
                    connection.destroy()
                }
                else {
                    if (result[0] != null) {

                        //-----------------Restore-----------------//

                        //restore goal
                        const updateAcre = `update acre set 
                        is_deleted = '0', 
                        is_active = '1'
                        where id ='${request.body.id}'`


                        connection.query(updateAcre, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c129-2'
                                })
                                connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the acre is restored'
                                });

                                connection.destroy()
                            }

                        })

                    }
                    else {
                        response.status(500).json({
                            message: 'Invaliud ID'
                        });
                        connection.destroy()
                    }
                }
            })



        }


    });
}