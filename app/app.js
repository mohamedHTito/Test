const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const comparession = require('compression');

app.use(comparession());

////////////////////// General //////////////////////
const loginRoutes = require('./routes/general/login');  
const changePasswordRoutes = require('./routes/general/changePassword');

////////////////////// Admin Page //////////////////////
const plantRoutes = require('./routes/adminPages/plant');
const plantWorkerRoutes = require('./routes/adminPages/plantWorker');
const workerRoutes = require('./routes/adminPages/worker');
const agricuturalMaterialsRoutes = require('./routes/adminPages/agricuturalMaterials');
const planetAgricuturalMaterialsRoutes = require('./routes/adminPages/planetAgCulMat');
const plantAcreRoutes = require('./routes/adminPages/plantAcre');
const acreRoutes = require('./routes/adminPages/acre');
const productionRoutes = require('./routes/adminPages/production');
const positionRoutes = require('./routes/adminPages/position');
const reportsRoutes = require('./routes/adminPages/reports');


app.use(morgan('dev')); // to developer middel ware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type,authorization,Accept-Language');
    
    if(req.method === 'OPTIONS')
    {
        res.header("Access-Control-Allow-Methods",'Put,Post,Patch,Delete,Get,put');
        return res.status(200).json({});    
    }
    next();
});

////////////////////// General ////////////////////// /// Successfull ///
app.use('/login',loginRoutes) 
app.use('/changePassword', changePasswordRoutes);


////////////////////// Admin //////////////////////
app.use('/plant', plantRoutes );
app.use('/plantWorker', plantWorkerRoutes );
app.use('/worker', workerRoutes );
app.use('/agriculturalMaterials', agricuturalMaterialsRoutes );
app.use('/planetAgricuturalMaterials', planetAgricuturalMaterialsRoutes );
app.use('/plantAcre', plantAcreRoutes );
app.use('/acre', acreRoutes );
app.use('/production', productionRoutes );
app.use('/position', positionRoutes );
app.use('/reports', reportsRoutes );


app.use((req , res , next)=>{

    const error = new Error('not found');
    error.status = 404;
    next(error);

})

module.exports = app ;
