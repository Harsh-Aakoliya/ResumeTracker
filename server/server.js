const express=require("express")
const mysql=require("mysql")
const cors=require("cors")//


// //initializing express
const app=express();


// //
app.use(cors());


//
app.use(express.json());

let connection=mysql.createConnection({
    host:"localhost",
    database:"resumetracker",
    user:"root",
    password:"Sql123@@#"
});

//for our acknowledgement
app.listen(5000,()=>{
    console.log("Server is running on port ",5000);
})
connection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("connected ",connection.threadId);
});


//if we get request from signtup route then
app.post("/signup",(req,res)=>{
    // console.log(req);
    console.log(req.body);
    const sql="insert into user (`name`,`email`,`password`) values (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ];
    connection.query(sql,[values],(err,data)=>{
        if(err){
            console.log(err);
            return res.json("Error ",err);
        }
        return res.json(data);
    })
})


connection.query("select * from user",function(error,result,fields){
    if(error) throw error;
    result.forEach(element => {
        console.log(element);
    });
})

// sample query for database "sakila"
// connection.query("select * from user",function(error,result,fields){
//     if(error) throw error;
//     result.forEach(element => {
//         console.log(element);
//     });
// })