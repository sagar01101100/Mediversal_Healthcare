const mongoose =require('mongoose')


async function Connect_DB() {
    try {
        await mongoose.connect("mongodb+srv://sagar01101100:TdLnbMVTgUAfltRU@cluster0.dbqor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            serverSelectionTimeoutMS: 30000 // 30 seconds
        });
        console.log("Mongo DB Connected... ")

    } catch (error) {
        console.log("Error in Connecting MongoDB...", error);
    }
}
module.exports= Connect_DB;