const moongose = require('mongoose')


//DB conection in mongo Atlas
const dbConection = async ()=>{
    try {
        await moongose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          
        });
        console.log('Conexion Satisfactoria')


    } catch (error) {
        console.log(error)
        throw new Error('No se pudo conectar a la DB')

    }


}
module.exports={
    dbConection
}