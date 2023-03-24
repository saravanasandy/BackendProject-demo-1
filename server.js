const  express = require("express");

const cors = require("cors");

const app = express();

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

app.get("/users",function(req,res){
    let qParams = req.query
    console.log(qParams);
    let resUser = [];
    for (let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) {
        if(users[index]){
            resUser.push(users[index]);
        }

    }
    res.json(resUser);
});

app.get("/user/:id",function(req,res){
    let userId = (req.params.id);
    let user = users.find((value)=>value.id == userId);
    console.log(user);
    if(user){
        res.json(user)
    }else{
        res.json({Message : "User Not Found"});
    }
})

        // create
        app.post("/user",function(req,res){
            console.log(req.body);
            req.body.id = users.length + 1;
            users.push(req.body);
            res.json({message : "This is User Post successfully "});
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

        // Edit
app.put("/user/:id",function(req,res){
    let userId = (req.params.id);
    let userIndex = users.findIndex((value)=>value.id == userId);

    if(userIndex != -1){
        Object.keys(req.body).forEach((item)=>{
            users[userIndex][item]= req.body[item]
        })
           
            res.json({
                message:"Done"
            })
    }else{
        res.json({
            message:"User Not Found"
        })
    }
});

    // Delete
app.delete("/user/:id",function(req,res){
    let userId = (req.params.id);
    let userIndex = users.findIndex((item)=>item.id == userId);

   if(userIndex != -1){
        users.splice(userIndex,1)

    res.json({
        message : "User Deleted"
    });
    }else{
        res.json({
            message:"User Not Found"
        });
    }
});

app.listen(3000);

// URL Parameters
// Query Parameters

