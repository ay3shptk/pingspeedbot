const express = require('express');
const app = express();
const dnslkp = require('dns').lookup
var tcpp = require('tcp-ping');
const http = require('http');



function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/pages/index.html');
});

app.get('/p', function (request, response) {
  var url = request.query.s;
  var port = request.query.p;
  if (url == undefined){
    response.sendFile(__dirname + '/pages/error.html');
  } else{
    dnslkp(url, function (err, ip) {
      tcpp.ping({
        address: ip,
        timeout: 2000
      }, function (err, data) {
        data.host = url;
        tcpp.probe(ip, port, function (err, r) {
          data.available = r;
          response.json(data);
        });
      });
    });
  }

});

app.get('/bulk', function (request, response) {
  var datax = []
  var query = request.query.q;
  var splitt = query.split(',')
  var i = 0
  while (i < splitt.length){
    var x = splitt[i].toString().split(":")
    splitt[i] = x
    i ++
  }
  //console.log(splitt)
  y = 0

  while(y < splitt.length){
    console.log(y)
    var url = splitt[y][0]
    var port = splitt[y][1]
   
    y++
    
    http.get('http://localhost:3000/p?s=' + url + '&p=' + port, (resp) => {
    
    let data = '';
    
    resp.on('data', (chunk) => {
      data += chunk;
    }); 

    resp.on('end', () => {
        datax.push(JSON.parse(data))   
             
    });
        

  }).on("error", (err) => {
    console.log("Error: " + err.message);

  });
  } 
  console.log("data" + datax)
  setTimeout(function() { response.json(datax) }, 1000);  
});



const listener = app.listen(3000, function () {
  console.log('Server running on ' + listener.address());
});