const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const userSchema   = new Schema({
    fullName: { 
        type     : String, 
        required : [ true, 'Please, enter a full name' ]
    },
    username: { 
        type     : String,
        required : [ true, 'Please, enter a username' ]
    },
    encryptedPassword: { 
        type     : String 
    },
    photoAddress: { 
        type     : String 
    },  
    introProfile: {
        type     : String
    }     
},
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" 
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;