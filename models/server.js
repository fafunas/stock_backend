const express = require("express");
const { dbConection } = require("../database/config");


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Db Conection
        this.conectdb();


        
    }

    async conectdb(){
        await dbConection();
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor Corriendo en puerto", this.port);
        });
    }
}


module.exports= Server