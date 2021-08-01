const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LoginPage",{// ei method ta amk akta promise return kor6e je future e amk data debe
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(() => {// jei data ta amra pbo 
    console.log(`Connection Successful`);
}).catch((e)=>{console.log(`Connection failed`);// jodi promise reject hoi
});