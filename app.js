var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request= require("request");

 var apiKey = "6c44cea2fda8d47ae70333c6ed4773c7";

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));




var weather;
app.get("/",function(req,res){
    res.render("index",{weather:null,error:null});
    
});

app.post("/",function(req,res){
   var city= req.body.city;
   console.log(city);
   var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",IN&units=metric&appid=" + apiKey;
   
   request(url, function(err, response, body){
       if(err){
          res.render("index", {weather:null, error: 'Please Try Again!!'});
       }else{
           var weather = JSON.parse(body);
           if(weather.main == undefined){
              res.render("index", {weather:null, error:'City Not Defined'});
           }else{
              
               var foundWeather =   [ 
                       weather["main"]["temp"],
                       weather["main"]["temp_min"],
                       weather["main"]["temp_max"],
                       weather["main"]["humidity"],
                       weather["wind"]["speed"],
                       weather["name"]
                       
                 ] ;
                 
                 
                                 
              res.render("index", {weather: foundWeather, error:null});
           }
       }
   })
    
    
    
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Running");
});