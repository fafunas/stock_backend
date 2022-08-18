const jwt = require('jsonwebtoken')


//Generamos el nuevo uid
const genJWT = (uid='')=>{

return new Promise ((resolve, reject)=>{
    const payload = {uid};
    jwt.sign(payload,process.env.SECREYKEY,{
        expiresIn:'4h'
    },(err,token)=>{
        if(err){
            console.log(err);
            reject('No se pudo generar el Token')
        }else{
            resolve(token);
        }
    })


})


}


module.exports ={
    genJWT
}



