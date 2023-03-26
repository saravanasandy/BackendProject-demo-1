const  express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");



const mongoClient = mongodb.MongoClient
const URL = "mongodb://localhost:27017";
const DB = "batch_41_wd_tamil";

const users = [];

// app.get("/home",function(req,res){
// res.json({message : "Welcome to Node Class "});
// });

    // app.get("/Login",function(req,res){
   
    // res.json({message : "This is Login Page "});
    // });

// Middleware
app.use(express.json());
app.use(cors({
    orgin: "http://localhost:3001"
}))

         // ********* Find/get  *********
        // app.get("/users",function(req,res){
        //     let qParams = req.query
        //     console.log(qParams);
        //     let resUser = [];
        //     for (let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) {
        //         if(users[index]){
        //             resUser.push(users[index]);
        //         }

        //     }
        //     res.json(resUser);
        // });
            app.get("/users",async function(req,res){
                    try {
                             // Step 1 : Create a Connection Between Nodejs And MongoDb
                                    const connection = await mongoClient.connect(URL);
                             // Step 2 : Select the DB
                                    const db = connection.db(DB);
                             // Step 3 : Select the Collection
                             // Step 4 : Do the Operation (Create,Update,Read,Delete)  
                              let resUser =  await db.collection("users").find().toArray();
                                  
                             // Step 5 : Close the Connection
                                    await connection.close();
                                    res.json(resUser);
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({message : "Something went wrong"});
                    }
               
            });

                        // ********* Get By Id  *********
                        // app.get("/user/:id",function(req,res){
                        //     let userId = (req.params.id);
                        //     let user = users.find((value)=>value.id == userId);
                        //     console.log(user);
                        //     if(user){
                        //         res.json(user)
                        //     }else{
                        //         res.json({Message : "User Not Found"});
                        //     }
                        // });
                    app.get("/user/:id",async function(req,res){
                        try {
                            // Step 1 : Create a Connection Between Nodejs And MongoDb
                                   const connection = await mongoClient.connect(URL);
                            // Step 2 : Select the DB
                                   const db = connection.db(DB);
                            // Step 3 : Select the Collection
                            // Step 4 : Do the Operation (Create,Update,Read,Delete)  
                       
                                 
                             let user =  await db.collection("users").findOne({ _id:new ObjectId(req.params.id) });
                                 
                            // Step 5 : Close the Connection
                                   await connection.close();
                                   res.json(user);
                   } catch (error) {
                       console.log(error);
                       res.status(500).json({message : "Something went wrong"});
                   }
                    });

                    // ********* create  *********
                    // app.post("/user",function(req,res){
                    //     console.log(req.body);
                    //     req.body.id = users.length + 1;
                    //     users.push(req.body);
                    //     res.json({message : "This is User Post successfully "});
                    //     });

                    // connection Between server and database 
                    // Step 1 : Create a Connection Between Nodejs And MongoDb
                    // Step 2 : Select the DB
                    // Step 3 : Select the Collection
                    // Step 4 : Do the Operation (Create,Update,Read,Delete)
                    // Step 5 : Close the Connection
                    //   if any Error throw error.

                 app.post("/user",async function(req,res){
             
                try {
                        // Step 1 : Create a Connection Between Nodejs And MongoDb
                            const connection = await mongoClient.connect(URL);
                        // Step 2 : Select the DB
                             const db = connection.db(DB);
                        // Step 3 : Select the Collection
                        // Step 4 : Do the Operation (Create,Update,Read,Delete)  
                            await db.collection("users").insertOne(req.body);
                        // Step 5 : Close the Connection
                            await connection.close();
                         res.json({message : "Data inserted"})
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message : "Something went wrong"})
                    }
                 });

// app.put("/user/:id",function(req,res){
//     let userId = (req.params.id);
//     let user = users.find((value)=>value.id == userId)
//         user.name = req.body.name;
//         user.age = req.body.age;
//         res.json({
//             message:"Done"
//         })
// });

                  // ********* Edit  *********
                //  app.put("/user/:id",function(req,res){
                //     let userId = (req.params.id);
                //     let userIndex = users.findIndex((value)=>value.id == userId);
    
                //     if(userIndex != -1){
                //         Object.keys(req.body).forEach((item)=>{
                //             users[userIndex][item]= req.body[item]
                //         })
                        
                //             res.json({
                //                 message:"Done"
                //             })
                //     }else{
                //         res.json({
                //             message:"User Not Found"
                //         })
                //     }
                // });
                    app.put("/user/:id",async function(req,res){
                        try {
                            // Step 1 : Create a Connection Between Nodejs And MongoDb
                                   const connection = await mongoClient.connect(URL);
                            // Step 2 : Select the DB
                                   const db = connection.db(DB);
                            // Step 3 : Select the Collection
                            // Step 4 : Do the Operation (Create,Update,Read,Delete)  
                       
                         
                             let user =  await db.collection("users").findOneAndUpdate({_id: new mongodb.ObjectId(req.params.id)},{$set:req.body});
                                 
                            // Step 5 : Close the Connection
                                   await connection.close();
                                   res.json(user);
                   } catch (error) {
                       console.log(error);
                       res.status(500).json({message : "Something went wrong"});
                   }
                    });

                      // ********* Delete  *********
                    // app.delete("/user/:id",function(req,res){
                    //     let userId = (req.params.id);
                    //     let userIndex = users.findIndex((item)=>item.id == userId);
    
                    // if(userIndex != -1){
                    //         users.splice(userIndex,1)
    
                    //     res.json({
                    //         message : "User Deleted"
                    //     });
                    //     }else{
                    //         res.json({
                    //             message:"User Not Found"
                    //         });
                    //     }
                    // });
                         app.delete("/user/:id",async function(req,res){
                        try {
                            // Step 1 : Create a Connection Between Nodejs And MongoDb
                                   const connection = await mongoClient.connect(URL);
                            // Step 2 : Select the DB
                                   const db = connection.db(DB);
                            // Step 3 : Select the Collection
                            // Step 4 : Do the Operation (Create,Update,Read,Delete)  
                       
                         
                             let user =  await db.collection("users").findOneAndDelete({_id: new mongodb.ObjectId(req.params.id)});
                            // Step 5 : Close the Connection
                                   await connection.close();
                                   res.json(user);
                   } catch (error) {
                       console.log(error);
                       res.status(500).json({message : "Something went wrong"});
                   }
                    });
                    

app.listen(process.env.PORT || 3000);

// URL Parameters
// Query Parameters

