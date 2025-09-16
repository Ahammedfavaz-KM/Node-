import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

let mycoll;
async function connectdb(){
    try {
        await client.connect();
        console.log("XOXO Connected!")
        const mydb=client.db("users-list")
        mycoll=mydb.collection("users-details")
        return client


    } catch (error) {
        console.log("Database Not Connected")
    }
    
}
export {connectdb,mycoll}