const connectToMongo=require('./db');
const  express=require('express');
const cors=require('cors');

connectToMongo();  
 // to connect to the database 
const app=express();
const port=5000;


app.use(cors());     //The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());     //The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

//available paths
app.use("/api/auth",require("./routes/auth"));         //we are specifying a foxed route on which we can add get,put etc.
app.use("/api/notes",require("./routes/notes"));

app.listen(port,()=>{
console.log(`myNotebook backend is listening at port ${port}`);

});