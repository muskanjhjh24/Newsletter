const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");




const app = express();


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html" );

});

app.post("/", function(req,res){

    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    var data ={
        members:[
            {email_address: email,
            status:"subscribed",
            merge_fields : {
                fname:firstname,
                lname:lastname


            }
        }
        ]
    };
    var jsondata = JSON.stringify(data);
 

    var Options ={
        url: 'https://us6.api.mailchimp.com/3.0/lists/8f8a7de354',
        method: "POST",
        headers:{
            "Authorization":"muskan 46ba67cf58d7afc8db52393c6763b38a-us6"
        },
        body: jsondata      
    };




request(Options, function(error,response,body){
    if(error){
        res.sendFile(__dirname + "/failure.html");
    }else{

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");

        }
    }

});

app.post("/failure" , function(req,res){
    res.redirect("/");

});

});
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running ");

});

/*46ba67cf58d7afc8db52393c6763b38a-us6*/
/*8f8a7de354*/
