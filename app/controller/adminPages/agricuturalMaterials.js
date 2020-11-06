const mysql = require('mysql');

const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();

//code c901
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
                error: 'Database error c901'
            })
            connection.destroy()
        }
        else {
            const query = `SELECT agricultural_materials.id , agricultural_materials.name
            FROM agricultural_materials
            where 
            (agricultural_materials.is_deleted ='0'
            and 
            agricultural_materials.is_active ='1' )
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
            const query = `SELECT agricultural_materials.id , agricultural_materials.name 
            FROM agricultural_materials
            where 
            agricultural_materials.is_deleted ='1'
            and 
            agricultural_materials.is_active ='0'
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

exports.insertAgriculturalMaterials = (request, response, next) => {
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


            const selectAgriculturalMaterialsName = `
            SELECT agricultural_materials.id , 
            agricultural_materials.name
            FROM agricultural_materials
            where 
            agricultural_materials.name='${request.body.name}' `

            connection.query(selectAgriculturalMaterialsName, (error, result) => {
                if (error) {
                    response.status(200).json({
                        error: 'Server error c125'
                    })
                    connection.destroy()
                }
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the Agricultural Materials Name is exist, try again'
                    });
                    connection.destroy()
                }
                else {
                    console.log("3");
                    const insertAgriculturalMaterialsName = `insert into agricultural_materials values(
                        '${transform.transform()}',
                        '${request.body.name}',
                        '${request.body.creationdate}',
                        '${request.body.personid}',
                        '${request.body.ipaddress}',
                        '0',
                        '1',                                            
                        '',  
                        ''                     
                        )`
                    connection.query(insertAgriculturalMaterialsName, (error, result) => {
                        console.log("4");
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c125-2'
                            })
                            connection.destroy()
                        }
                        else {
                            response.status(200).json({
                                message: 'the agricultural materials name is created'
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
exports.updateAgriculturalMaterials = (request, response, next) => {
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
            const selectAgriculturalMaterialsName = `SELECT agricultural_materials.id , agricultural_materials.name
            FROM agricultural_materials
            where 
            agricultural_materials.name='${request.body.updateName}' 
            `

            connection.query(selectAgriculturalMaterialsName, (error, result) => {
                if (result[0] != null) {
                    response.status(200).json({
                        message: 'the agricultural materials name is exist, try again'

                    });
                    connection.destroy()
                }
                else {

                    ////////////////////////////////////////////////////////
                    const query = `SELECT agricultural_materials.name from agricultural_materials where agricultural_materials.id = '${request.body.id}' `
                    connection.query(query, (error, result) => {
                        if (error) {
                            response.status(200).json({
                                error: 'Server error c126'
                            })
                            connection.destroy()
                        }
                        else {

                            if (result[0] != null) {

                                const updateQuery = `update agricultural_materials set 
                                name='${request.body.updateName}',
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
exports.deleteAgriculturalMaterials = (request, response, next) => {
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

            const query = `select name from agricultural_materials 
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
                        const updateAgriculturalMaterials = `update agricultural_materials set 
                         is_deleted = '1',
                         is_active = '0'
                         where id ='${request.body.id}'`

                        connection.query(updateAgriculturalMaterials, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c127-2'
                                })
                                connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the agricultural materials is deleted'
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
exports.restoreAgriculturalMaterials = (request, response, next) => {
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

            const query = `select name from agricultural_materials where id = '${request.body.id}'`

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
                        const updateAgriculturalMaterials = `update agricultural_materials set 
                        is_deleted = '0', 
                        is_active = '1'
                        where id ='${request.body.id}'`


                        connection.query(updateAgriculturalMaterials, (error, result) => {
                            if (error) {
                                response.status(200).json({
                                    error: 'Server error c129-2'
                                })
                                connection.destroy()
                            }
                            else {
                                response.status(200).json({
                                    message: 'the agricultural materials is restored'
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