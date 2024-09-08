import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required:[true,"please provide a username"],
        unique: true
    },
    email:
    {
        type: String,
        required:[true,"please provide a email"],
        unique: true
    },
    password:
    {
        type: String,
        required:[true,"please provide a password"],
       
    },
    iscerifiy:
    {
        type: Boolean,
       default: false
    },
    forgotpasswordToken: String,
    forgotpasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})
const User = mongoose.models.users || mongoose.model("users",userSchema)
export default User