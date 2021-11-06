const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
   extended: true
}));

//req - request - zapytanie = jeśli coś chcemy dostać (GET)
//res - response (result) - odpowiedź (rezultat) = kiedy chcemy pracować na danych otrzymanych, kiedy chcemy coś "wysłać"

app.get("/", function(req, res) {

   res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {

   console.log(req.body.city);
   console.log(req.body.units);

   const query = req.body.city;
   const units = req.body.units;
   let realUnits = "Celcius";
   if(units=="imperial") realUnits = "Fahrenheit";
   else if (units=="standard") realUnits = "Kelvin";

 /*metric(Celcius) imperial(Fahrenheit)  standard(Kelvin) */



   console.log("POST request catched");
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=7fd73ba9c00a53b6c683d0ecb12deda7&units=${units}`;

   https.get(url, function(ress) {
      console.log(ress.statusCode);
      ress.on("data", function(data) {
         const weatherData = JSON.parse(data);
         // console.log(weatherData);
         const temp = weatherData.main.temp;
         const description = weatherData.weather[0].description;
         const name = weatherData.name;
         const icon = weatherData.weather[0].icon;
         // console.log(temp);
         // console.log(description);
         res.write(`<p>The wheter is currently ${description}</p>`);
         res.write(`<h1>The temperature in ${name} is ${temp} degrees ${realUnits}.</h1>`);
         res.write(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`);
         res.send();
      })
   })
})


app.listen("2137");