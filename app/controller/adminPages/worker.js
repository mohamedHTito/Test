const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();

//code c901
exports.selectWorkerPosition = (request, response, next) => {
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
            const query = `SELECT agriculture.worker.id as worker_id ,
            agriculture.worker.name , 
            agriculture.worker.salary,
            agriculture.worker.salary_by_day,
            agriculture.position.id as position_id,
            agriculture.position.title
            FROM agriculture.position , agriculture.worker
            where 
            agriculture.worker.position_id = agriculture.position.id
            and
            (agriculture.position.is_deleted ='0'
            and 
            agriculture.position.is_active ='1' )
            and
            (agriculture.worker.is_deleted ='0'
            and 
            agriculture.worker.is_active ='1' )
            `
            connection.query(query, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c901'
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
            const query = `SELECT agriculture.worker.id , agriculture.worker.name , agriculture.worker.salary , agriculture.position.title
            FROM agriculture.worker , agriculture.position
            where 
            agriculture.worker.position_id=agriculture.position.id
            and
            agriculture.worker.is_deleted ='1'
            and 
            agriculture.worker.is_active ='0'
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

exports.insertWorker = (request, response, next) => {
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


            const selectWorkerName = `
            SELECT worker.id , 
            worker.name
            FROM worker
            where 
            worker.name='${request.body.name}' `

            connection.query(selectWorkerName, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c125'
                    })
                    connection.destroy()
                }
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the Worker is exist, try again'
                    });
                    connection.destroy()
                }

                else {
                    var x = request.body.salary;
                    var salaryByDay = x / 30;
                    const insertWorkerName = `insert into worker values(
                        '${transform.transform()}',
                        '${request.body.positionId}',
                        '${request.body.name}',
                        '${request.body.salary}',
                        '${salaryByDay}',
                        '${request.body.creationdate}',
                        '${request.body.personid}',
                        '${request.body.ipaddress}',
                        '0',
                        '1',                                            
                        '',  
                        ''                     
                        )`
                    connection.query(insertWorkerName, (error, result) => {
                        console.log("4");
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c125-2'
                            })
                            connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'the worker is created'
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
exports.updateWorker = (request, response, next) => {
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
            const selectWorkerName = `SELECT worker.id , worker.name  , worker.salary
            FROM worker
            where 
            worker.name='${request.body.updateName}' 
			and
			worker.salary='${request.body.updateSalary}' 
            `

            connection.query(selectWorkerName, (error, result) => {
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the worker name is exist, try again'

                    });
                    connection.destroy()
                }
                else {

                    ////////////////////////////////////////////////////////
                    const query = `SELECT worker.name from worker where worker.id = '${request.body.id}' `
                    connection.query(query, (error, result) => {
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c126'
                            })
                            connection.destroy()
                        }
                        else {

                            if (result[0] != null) {
                                var x = request.body.updateSalary;
                                var salaryByDay = x / 30;

                                const updateQuery = `update worker set 
                                name='${request.body.updateName}',
                                salary='${request.body.updateSalary}',
                                salary_by_day='${salaryByDay}',
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
exports.deleteWorker = (request, response, next) => {
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

            const query = `select name from worker 
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
                        const updateWorker = `update worker set 
                         is_deleted = '1',
                         is_active = '0'
                         where id ='${request.body.id}'`

                        connection.query(updateWorker, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c127-2'
                                })
                                connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the worker is deleted'
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
exports.restoreWorker = (request, response, next) => {
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

            const query = `select name from worker where id = '${request.body.id}'`

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
                        const updateWorker = `update worker set 
                        is_deleted = '0', 
                        is_active = '1'
                        where id ='${request.body.id}'`


                        connection.query(updateWorker, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c129-2'
                                })
                                connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the worker is restored'
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