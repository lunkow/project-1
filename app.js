const express = require("express");
const fs = require("fs");
 
const app = express();

app.use(function(request, response, next){
    // middleware
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});

app.use(express.static(__dirname + "/public"));

 
app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});

app.get("/contact", function(request, response){
     
    response.send("<h1>Контакты</h1>");
});

app.get("/params", function(request, response){
    console.log(request.query);

    

    let params = request.query;
    let responseParamsList = "<ul>";

    for (key in params) {
        console.log(``);
        responseParamsList += "<li>" + `${key}: ${params[key]}` + "</li>";
    }
    responseParamsList += "</ul>";

    response.send("<h1>Get-параметры</h1>" + responseParamsList);
});

app.use("/*",function (request, response) {
    console.log('url not exist - redirected')
    // response.redirect("/")
    response.send("<h1>404</h1>");

  });

app.listen(3000);