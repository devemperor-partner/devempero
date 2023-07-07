const mongoose=require("mongoose")
// require("dotenv").config()
const db_url=process.env.db_url
// console.log(db_url)
const connect_db=(text_to_display)=>{
mongoose.connect(db_url).then(console.log(text_to_display))
.catch(err=>console.log(err.message))
}
// connect_db()
module.exports=connect_db