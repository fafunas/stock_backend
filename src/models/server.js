const express = require("express");
const cors = require('cors');
const { dbConection } = require("../database/config");


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Paths
        this.userPath = '/api/users';
        this.authPath= '/api/auth';
        this.typePath ='/api/types';
        this.groupPath = '/api/groups';
        this.productPath = '/api/products';
        this.supplierPath = '/api/supplier';
        this.warehouseInPath ='/api/warehouse/in'
        this.warehouseOUTPath = '/api/warehouse/out'
        this.rolePath = '/api/rol';
        this.warehouseLeasePath= '/api/warehouse/lease';


        //Db Conection
        this.conectdb();

        //Middlewares
        this.middlewares();


        //Routes
        this.routes();


        
    }

    async conectdb(){
        await dbConection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use(this.userPath,require('../routes/users'))
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.typePath,require('../routes/type'))
        this.app.use(this.groupPath, require('../routes/group'))
        this.app.use(this.productPath, require('../routes/product'))
        this.app.use(this.supplierPath,require('../routes/supplier'))
        this.app.use(this.warehouseInPath, require('../routes/opIn'))
        this.app.use(this.warehouseOUTPath, require('../routes/opOut'))
        this.app.use(this.rolePath,require('../routes/role'))
        this.app.use(this.warehouseLeasePath, require('../routes/opLease'))
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor Corriendo en puerto", this.port);
        });
    }
}


module.exports= Server