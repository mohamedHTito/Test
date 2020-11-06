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
            const query = `SELECT position.id , position.title 
            FROM position
            where 
            position.is_deleted ='0'
            and 
            position.is_active ='1'
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
                    console.log(result);
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
            const query = `SELECT position.id , position.title 
            FROM position
            where 
            position.is_deleted ='1'
            and 
            position.is_active ='0'
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
                    console.log(result);
                    connection.destroy()
                }

            });


        }



    });

}

exports.insertPosition = (request, response, next) => {
    const conn = mysql.createPool({
        connectionLimit : 100,
host: env.dataBase.host,
        user:  env.dataBase.user,
        password: env.dataBase.password,
        database: env.dataBase.database
    })
    conn.getConnection((error,connection) => {
        if (error) {
            response.status(500).json({
                error: 'Database error c125'
            })
connection.destroy()
        }
        else {        
            
          
            const selectPositionTitle = `
            SELECT position.id , 
            position.title
            FROM position
            where 
            position.title='${request.body.title}' `

            connection.query(selectPositionTitle, (error, result) => {
                if (error) 
{    
                    response.status(200).json({
                        error: 'Server error c125'
                    })
connection.destroy()
}
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the Position Title is exist, try again'
                    });
connection.destroy()
                }
                else {
                    console.log("3");
                    const insertPositionTitle = `insert into position values(
                        '${transform.transform()}',
                        '${request.body.title}',
                        '${request.body.creationdate}',
                        '${request.body.personid}',
                        '${request.body.ipaddress}',
                        '0',
                        '1',                                            
                        '',  
                        ''                     
                        )`
                    connection.query(insertPositionTitle, (error, result) => {
                        console.log("4");
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c125-2'
                            })
connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'the position title is created'
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
exports.updatePosition = (request, response, next) => {
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
                error: 'Database error c126'
            })
connection.destroy()
        }
        else {
            const selectPositionTitle = `SELECT position.id , position.title
            FROM position
            where 
            position.title='${request.body.updateTitle}' 

            `
         
            connection.query(selectPositionTitle, (error, result) => {
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the position title is exist, try again'
                        
                    });
connection.destroy()
                }
                else {
                 
                    ////////////////////////////////////////////////////////
                    const query = `SELECT position.title from position where position.id = '${request.body.id}' `
                    connection.query(query, (error, result) => {
                        if (error) 
{
                            response.status(200).json({
                                error: 'Server error c126'
                            }) 
connection.destroy()
}
                        else {
                          
                            if (result[0] != null) {
                               
                                const updateQuery = `update position set 
                                title='${request.body.updateTitle}',
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


//code c127
exports.deletePosition = (request, response, next) => {
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
                error: 'Database error c127'
            })
connection.destroy()
        }
        else {

            const query = `select title from position 
            where id = '${request.body.id}'`
            connection.query(query, (error, result) => {
                if (error) 
{
                response.status(200).json({
                    error: 'Server error c127'
                }) 
connection.destroy()
}
                else {
                    if (result[0] != null) {
                        const updatePosition = `update position set 
                         is_deleted = '1',
                         is_active = '0'
                         where id ='${request.body.id}'`

                        connection.query(updatePosition, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c127-2'
                                }) 
connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the position is deleted'
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
exports.restorePosition = (request, response, next) => {
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
                error: 'Database error c129'
            })
connection.destroy()        
}
        else {

            const query = `select title from position where id = '${request.body.id}'`

            connection.query(query, (error, result) => {
                if (error) 
{
                    response.status(200).json({
                        error: 'Server error c129'
                    })
connection.destroy()
}
                else {
                    if (result[0] != null) {

                        //-----------------Restore-----------------//

                        //restore goal
                        const updatePosition = `update position set 
                        is_deleted = '0', 
                        is_active = '1'
                        where id ='${request.body.id}'`


                        connection.query(updatePosition, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c129-2'
                                })
connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the position is restored'
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


