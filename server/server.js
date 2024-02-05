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
        console.log("Error in connection ",err);
        return;
    }
    console.log("connected ",connection.threadId);
});


//if we get request from signtup route then
app.post("/signup", async (req, res) => {
    console.log(req.body);

    try {
        // Checking if the user with this email id exists
        connection.query("SELECT * FROM user WHERE `email` = ?", [req.body.email], (err, data) => {
            if (err) {
                console.error(err);
                return res.json("Error: " + err.message);
            }

            if (data.length > 0) {
                return res.json("User Exists");
            }

            console.log("I am here");

            // Inserting data into the database
            const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES (?)";
            const values = [
                req.body.name,
                req.body.email,
                req.body.password
            ];

            connection.query(sql, [values], (err, insertData) => {
                if (err) {
                    console.error(err);
                    return res.json("Error: " + err.message);
                }

                console.log("Data inserted successfully");
                return res.json(insertData);
            });
        });
    } catch (error) {
        console.error("Error:", error);
        return res.json("Error: " + error.message);
    }
});



// const util = require('util');
// const queryAsync = util.promisify(connection.query).bind(connection);

// app.post("/signup", async (req, res) => {
//     console.log(req.body);

//     // Checking user with this email id exists or not
//     const sqlcheck = "SELECT * FROM user WHERE `email` = ?";
//     try {
//         const data = await queryAsync(sqlcheck, [req.body.email]);

//         if (data.length > 0) {
//             return res.json("User Exists");
//         }

//         console.log("I am here");

//         const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES (?)";
//         const values = [
//             req.body.name,
//             req.body.email,
//             req.body.password
//         ];

//         try {
//             const insertData = await queryAsync(sql, [values]);
//             console.log("Data inserted successfully");
//             return res.json(insertData);
//         } catch (error) {
//             console.log("Error while inserting data into the database");
//             return res.json("Error here: " + error.message);
//         }
//     } catch (error) {
//         console.log("Error while checking for user existence");
//         return res.json("Error here: " + error.message);
//     }
// });
// app.post("/signup",async (req,res)=>{
//     // console.log(req);
//     console.log(req.body);



//error
//     //checking user with this email id is exsist or not
//     const sqlcheck="select * from user where `email` = ?";
//     try {
//         await connection.query(sqlcheck,[req.body.email],(err,data)=>{
//             //record exists
//             if(data.length > 0) {
//                 return res.json("User Exists")
//             }
//             // else if(err){
//             //     console.log("Error in sqlcheck query",err);
//             //     return res.json("Error ;alskjdf;ioe ;alksdj;oiaejf; lkasdjf;alksdjfa; ",err);
//             // }
//         });
        
//     } catch (error) {
//         console.log("Error while checking for user existance");
//     }


//     console.log("i am here");
//     const sql="insert into user (`name`,`email`,`password`) values (?)";
//     const values=[
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ];
//     try {   
//         await connection.query(sql,[values],(err,data)=>{
//             if(err){
//                 console.log(err);
//                 return res.json("Error here a;lskdjf",err);
//             }
//             return res.json(data);
//         })
//     } catch (error) {
//         console.log("Error while inserting data into database");
//     }
//     console.log("after return statemet");
// })


//if we get request from login
app.post("/login",async (req,res)=>{
    // console.log(req);
    console.log("here",req.body);
    const sql="select * from user where `email` = ? and `password` = ?";
    try {  
        await connection.query(sql,[req.body.email,req.body.password],(err,data)=>{
            if(err){
                console.log(err);
            return res.json("Error ",err);
        }
        //record exists
        if(data.length > 0) return res.json("success")
        return res.json("fails");
    })
    } catch (error) {
        console.log("Error of login sql query",error);
    }
})


try {
    connection.query("select * from user",function(error,result,fields){
        if(error) throw error;
        result.forEach(element => {
            console.log(element);
        });
    })
} catch (error) {
    console.log("Error while print the table data")
}

// sample query for database "sakila"
// connection.query("select * from user",function(error,result,fields){
//     if(error) throw error;
//     result.forEach(element => {
//         console.log(element);
//     });
// })