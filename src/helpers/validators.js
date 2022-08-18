const {User}= require('../models/users')

const userExist = async (id)=>{ 
    const user= await User.findById(id)

    if(!user){
        throw new Error(`El Id no existe ${id}`)
        
    }

}

module.exports ={
    userExist
}