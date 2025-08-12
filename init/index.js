const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listning.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connect to DB");
})
.catch(err =>{
    console.log(err)
});

async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:'680b997d8902b05ed9654895',
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialiized");
};

initDB();