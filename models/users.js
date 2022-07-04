const { Schema, model} = require ('mongoose');


const UserSchema= Schema({
    name:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    surname:{
        type: String,
        required: [true, 'El Apellido es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El mail es obligatorio'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password:{
        type: String,
        required: true
    },
    dni:{
        type: Number,
        unique: true
    },
    rol:{
        type: String,
        required: [true,'El Rol es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
        
    },
    
},{timestamps: true})


UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model('User', UserSchema);


