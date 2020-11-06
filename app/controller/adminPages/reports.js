const mysql = require('mysql');
const moment = require('moment');
const env = require('../../functions/env-var')
const transform = require('../../functions/transform')
dte = new Date().toLocaleString();

exports.plan = async (request, response, next) => {
    let result = []
    let index = 0

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
        } else {


            const acreQuery = `
            SELECT distinct agriculture.acre.code , agriculture.acre.id
            FROM agriculture.acre , agriculture.plant_acre
            WHERE agriculture.plant_acre.acre_id = agriculture.acre.id
            AND agriculture.acre.is_deleted = '0'
            AND agriculture.acre.is_active = '1'
            AND agriculture.acre.id
            in
            (
            SELECT distinct agriculture.plant_acre.acre_id
                        FROM agriculture.plant , agriculture.plant_acre , agriculture.production
                        where agriculture.plant_acre.plant_id = agriculture.plant.id
                        AND agriculture.plant.id = agriculture.production.plant_id
                        AND agriculture.plant.is_deleted = '0'
                        AND agriculture.plant.is_active ='1'
            )
            `

            connection.query(acreQuery, (error, acreResult) => {
                if (error) {
                    console.log(`arce: error:  ${error}`)
                    connection.destroy()
                } else {

                    for (let i = 0; i < acreResult.length; i++) {
                        const planQuery = `
                        SELECT agriculture.plant.id as pId , agriculture.plant.start_date , agriculture.plant.end_date ,
                        agriculture.plant.name , agriculture.plant_acre.id , agriculture.production.amount , 
                        agriculture.production.selling_price
                        FROM agriculture.plant , agriculture.plant_acre , agriculture.production
                        where agriculture.plant_acre.plant_id = agriculture.plant.id
                        AND agriculture.plant.id = agriculture.production.plant_id
                        AND agriculture.plant.is_deleted = '0'
                        AND agriculture.plant.is_active ='1'
                        AND agriculture.plant_acre.acre_id ='${acreResult[i].id}'
                        `
                        // console.log(`arce: id: ${acreResult[i].id}`)
                        connection.query(planQuery, (error, planResult) => {
                            var planArray = []
                            var materialCost = 0;
                            var workersCost = 0

                            for (let j = 0; j < planResult.length; j++) {


                                if (error) {
                                    console.log(`planQuery: error:  ${error}`)
                                    connection.destroy()
                                } else {

                                    const materialQuery = `
                                SELECT agriculture.plant_agricultural_materials.plant_id as pId, agriculture.agricultural_materials.id as mId , 
                                agriculture.agricultural_materials.name , agriculture.plant_agricultural_materials.amount ,
                                agriculture.plant_agricultural_materials.cost
                                FROM agriculture.agricultural_materials , agriculture.plant_agricultural_materials
                                where agriculture.agricultural_materials.id = agriculture.plant_agricultural_materials.agricultural_materials_id
                                AND agriculture.plant_agricultural_materials.plant_id = '${planResult[j].pId}'
                                `

                                    connection.query(materialQuery, (error, materialResult) => {
                                        if (error) {
                                            console.log(`materialQuery: error:  ${error}`)
                                            connection.destroy()
                                        } else {
                                            console.log(`materialQuery: data:  ${materialResult.length} : plan id ${planResult[j].pId} : `)


                                            const workersQuery = `
                                        SELECT agriculture.plant_worker.worker_id , agriculture.plant_worker.plant_id , agriculture.worker.name , 
                                        agriculture.worker.salary_by_day , agriculture.position.title
                                        FROM agriculture.plant_worker , agriculture.position , agriculture.worker
                                        WHERE agriculture.plant_worker.worker_id = agriculture.worker.id
                                        AND agriculture.worker.position_id = agriculture.position.id
                                        AND agriculture.plant_worker.plant_id = '${planResult[j].pId}'
                                        `
                                            connection.query(workersQuery, (error, workersResult) => {
                                                if (error) {
                                                    console.log(`workersQuery: error:  ${error}`)
                                                    connection.destroy()
                                                } else {
                                                    // console.log(`workersQuery: data:  ${workersResult.length} : plan id ${planResult[j].pId}`)
                                                    var sDate = planResult[j].start_date.split("-")
                                                    var eDate = planResult[j].end_date.split("-")
                                                    var momentStartDate = moment(sDate)
                                                    var momentEndtDate = moment(eDate)

                                                    var diff = momentEndtDate.diff(momentStartDate, 'days')
                                                    console.log(`diff: sd ${sDate} :: ${planResult[j].start_date}`)
                                                    console.log(`diff: ed ${eDate} :: ${planResult[j].end_date}`)
                                                    for (let k = 0; k < materialResult.length; k++)
                                                        materialCost = materialCost + parseInt(materialResult[k].cost)
                                                    for (let k = 0; k < workersResult.length; k++)
                                                        workersCost = workersCost + parseInt(workersResult[k].salary_by_day) * parseInt(diff)


                                                    console.log(`diff: ${diff}`)

                                                    const planObj = {
                                                        planId: planResult[j].pId,
                                                        planName: planResult[j].name,
                                                        planStartDate: planResult[j].start_date,
                                                        planEndDate: planResult[j].end_date,
                                                        planAmount: planResult[j].amount,
                                                        planSellingPrice: planResult[j].selling_price,
                                                        materialCost,
                                                        workersCost,
                                                        workersArray: workersResult,
                                                        materialArray: materialResult
                                                    }
                                                    planArray.push(planObj)


                                                }
                                            })
                                        }

                                    })


                                }
                            }
                            // console.log(acreResult[i].code)
                            const arceObject = {
                                arceCode: acreResult[i].code,
                                arceId: acreResult[i].id,
                                plansArray: planArray

                            }
                            result.push(arceObject)

                        })

                        index++;
                    }

                    var stop = setInterval(() => {
                        if (index == acreResult.length) {

                            response.status(200).json(result)
                            clearInterval(stop);
                            connection.destroy()
                        }
                    }, 100)
                }
            })


        }


    });


}
