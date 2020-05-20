const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/sign.html");
});
app.post("/", function(req, res){
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;
  const data={
    memebers:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us18.api.mailchimp.com/3.0/lists/2e8f98661c"
  const options={
    method:"POST",
    auth:"poojitha:03d286b8b170e8bf352db3656ccb0a1c-us18"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();
});



app.listen(3000, function(req, res){
  console.log("server is running on port 3000");
});
