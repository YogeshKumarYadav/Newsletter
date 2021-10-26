const express = require("express");
const https = require("https");
 
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/home.html");
});
 
app.post("/", function(req, res){
 
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    
    const data = {
    members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
            }
        }
    ]
    }
    
    console.log(data)
    const jsonData = JSON.stringify(data);
    
    const url = "https://us5.api.mailchimp.com/3.0/lists/e1abe7da02";

    const options = {
        method: "POST",
        auth: "Yogesh_Kumar_Yadav:2f4d487a0ffd619c5c4136c947748c7f-us5"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200) {
            //res.send("done")
            res.sendFile(__dirname + "/success.html")
        }
        else {
            //res.send("fail")
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
 
});

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.")
});

// // 2f4d487a0ffd619c5c4136c947748c7f-us5
// // e1abe7da02
