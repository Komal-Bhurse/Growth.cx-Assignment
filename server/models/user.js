const mongoose = require("mongoose");
const {createHmac, randomBytes} = require("crypto")

const userSchema = new mongoose.Schema({
    UserName:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type:String
    },
    Password:{
        type: String,
        required: true,
    },
    domain:[
        {
          name:{
            type: String
          },
          wordCount:{
            type: Number
          },
          favourite:{
            type: String,
            default: "false"
          }
        },
    ]
},{timestamps:true});

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("Password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.Password).digest("hex");

    this.salt = salt;
    this.Password = hashedPassword;

    next();
})

userSchema.static("matchPassword", async function(Email,Password){
    const user = await this.findOne({Email})
    
    if(!user) return null;

    const salt = user.salt;
    const hashedPassword = user.Password;
    
    const userProvidedHash = createHmac("sha256", salt).update(Password).digest("hex");

    if(hashedPassword !== userProvidedHash)
     return null;
    return user;
})

const User = mongoose.model("user",userSchema);

module.exports = User;