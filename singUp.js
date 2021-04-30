const express = require('express');
const app = express();
const https = require('https');


app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/index",(req,res)=>{
    
    res.sendFile(__dirname+"/index.html");

})

app.post("/",(req,res)=>{

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.emailInput;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const JSONdata = JSON.stringify(data);

    const url ="https://us1.api.mailchimp.com/3.0/lists/6f04a01b16";
    const options = {
        method: "POST",
        auth: "Oday:b881b3b1ce3e00783e2af5389931f1c3-us1"
    };

   const request = https.request(url,options,(response)=>{

    if(response.statusCode == 200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/fail.html");
    }
            response.on("data",(data)=>{
                console.log(JSON.parse(data));
            })
    })

    request.write(JSONdata);
    request.end();
})

app.post("/fail",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT|| 3000, ()=>{
    console.log("Server started on port "+3000);
})



// b881b3b1ce3e00783e2af5389931f1c3-us1

// List ID:
// 6f04a01b16